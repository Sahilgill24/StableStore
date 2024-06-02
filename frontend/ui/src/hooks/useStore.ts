import { create } from 'zustand'



interface User {
    id: number,
    email: string,
    providerId: string | null,
}

interface UserState {
    user: User | null,
    setUser: (user: User | null) => void

}

export const useUserStore = create<UserState>((set) => ({
    user: null as User | null,
    setUser: (user: User | null) => set({ user }),
}))

interface ClientSecretState {
    clientSecret: string,
    setClientSecret: (clientSecret: string) => void
}
export const useClientSecretStore = create<ClientSecretState>((set) => ({
    clientSecret: '',
    setClientSecret: (clientSecret: string) => set({ clientSecret }),
}))


interface WithdrawAmountState {
    withdrawAmount: number,
    setWithdrawAmount: (withdrawAmount: number) => void
}

export const useWithdrawAmountStore = create<WithdrawAmountState>((set) => ({
    withdrawAmount: 0,
    setWithdrawAmount: (withdrawAmount: number) => set({ withdrawAmount }),
}))