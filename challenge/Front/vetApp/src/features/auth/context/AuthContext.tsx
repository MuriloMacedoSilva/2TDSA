import { createContext, ReactNode, useContext, useState } from "react";
import { User } from '../types'

type AuthContextData = {
    user: User | null
    userOut: boolean
    signIn: (user: User) => void
    signOut: () => void
}

type AuthProviderProps = {
    children: ReactNode   
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [userOut, setUserOut] = useState(true)

    const [user, setUser] = useState<User | null>(null)
    
    function signIn(user: User) {
        setUserOut(false)
        setUser(user)
    }

    function signOut() {
        setUserOut(true)
    }

    return (
        <AuthContext.Provider value={{ userOut, signIn, signOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}