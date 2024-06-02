import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MAIL_SUBJECT, MAIL_BODY } from '@/config/mail';
import randomString from 'randomstring';

function generateOTP() {
  return randomString.generate({
    length: 6,
    charset: 'numeric'
  });
}

@Service()
export class AuthService {
  public users = new PrismaClient().user;
  public otp = new PrismaClient().oTP;

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });

    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Password is not matching");
    console.log(findUser)
    const tokenData = this.createToken(findUser);
    console.log(tokenData)
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 24* 60 * 60 * 1000;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }


  public async sendOTP(email: string) {
    try {
      const OTP = generateOTP()
      const createOtp = await this.otp.create({ data: { email, code: OTP } })
      await this.sendMail(email, OTP)
      return createOtp
    } catch (error) {
      return new HttpException(500, 'Unable to send OTP')
    }
  }

  public async sendMail(email: string, otp: string): Promise<void> {
    try {
      const options: SMTPTransport.Options = {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_APP_PASS,
        },
      }
      const transporter = await nodemailer.createTransport(options)

      const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: email,
        subject: MAIL_SUBJECT,
        html: MAIL_BODY(otp),
      };

      const res = await transporter.sendMail(mailOptions)
      
    } catch (error) {
      console.log(error)
      throw new HttpException(500, 'Unable to send email')
    }

  }

  public async verifyOTP(email: string, otp: string): Promise<boolean> {
    const findOtp = await this.otp.findFirst({ where: { email, code: otp } })
    if (!findOtp) {
      throw new HttpException(403, 'Invalid OTP')
    }
    const deleteOtp = await this.otp.delete({ where: { id: findOtp.id } })
    return true
  }

  public async verifyEmail(email: string): Promise<boolean> {
    try {
      const findUser = await this.users.findUnique({ where: { email } })
      const updateUser = await this.users.update({ where: { id: findUser.id }, data: { emailVerified: true } })
      if (!findUser) {
        throw new HttpException(404, 'User not found')
      }
      if (!updateUser) {
        throw new HttpException(500, 'Unable to change user email status')
      }
      return true
    } catch (error) {
      console.error(error)
      throw new HttpException(500, 'Unable to verify email')
    }

  }
}
