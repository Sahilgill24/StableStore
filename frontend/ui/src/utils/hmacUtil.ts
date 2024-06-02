import crypto from 'crypto';


export class HmacUtil {
  static hmac256(key:string, msg:string) {
    const mac = crypto.createHmac('sha256', key);
    const data = mac.update(msg).digest('hex').toLowerCase();
    return data;
  }

  static getStringToSign(body: Record<string, any> ,nonce:string,timestamp:string , reqMethod:string, requestURI:string) {

    const treeMap = new Map(Object.entries(body).sort());
    let s2s = '';

    for (const [k, v] of treeMap) {
      if (!k || typeof v === 'object') {
        continue;
      }
      if (v !== null && v !== undefined && String(v)) {
        s2s += `${k}=${v}&`;
      }
    }

    const bodyString =  s2s.slice(0, -1);
    const CotentMd5 = crypto.createHash('md5').update(bodyString).digest('hex');
    const stringToSign = reqMethod + '\n' + CotentMd5 + '\n'  + requestURI + '\n' + timestamp + '\n' + nonce ;
    return stringToSign
  }
}