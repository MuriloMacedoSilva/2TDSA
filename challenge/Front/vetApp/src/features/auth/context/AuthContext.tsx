import { createContext, ReactNode, useContext, useState } from "react";
import { User } from '../types'

type AuthContextData = {
    user: User | null
    signIn: (user: User) => void
    signOut: () => void 
}

type AuthProviderProps = {
    children: ReactNode   
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    
    function signIn(userData: User) {
        setUser(userData) 
    }

    function signOut() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}