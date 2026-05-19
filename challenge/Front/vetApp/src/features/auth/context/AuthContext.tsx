import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from '../types';

type AuthContextData = {
    user: User | null;
    userOut: boolean;
    loading: boolean; // <-- Adicionado para sabermos quando o AsyncStorage terminou de ler
    signIn: (user: User) => Promise<void>; // <-- Mudou para Promise porque salvar no disco é assíncrono
    signOut: () => Promise<void>; // <-- Mudou para Promise porque remover do disco é assíncrono
}

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const USER_STORAGE_KEY = "@vetapp:user";

export function AuthProvider({ children }: AuthProviderProps) {
    const [userOut, setUserOut] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // App começa buscando os dados locais

    // 1. QUANDO O APP ABRE: Verifica se o usuário já fez login anteriormente
    useEffect(() => {
        async function loadStorageData() {
            try {
                const storageUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
                
                if (storageUser) {
                    // Se achou o usuário no celular, restaura a sessão automaticamente
                    setUser(JSON.parse(storageUser));
                    setUserOut(false);
                }
            } catch (error) {
                console.error("Erro ao ler dados do AsyncStorage", error);
            } finally {
                // Finaliza o carregamento, independente se achou o usuário ou não
                setLoading(false);
            }
        }

        loadStorageData();
    }, []);
    
    // 2. LOGANDO PELA PRIMEIRA VEZ: Guarda os dados que sua LoginScreen capturou
    async function signIn(userLogged: User) {
        try {
            setUserOut(false);
            setUser(userLogged);
            // Salva o objeto do usuário convertido em String dentro do celular
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userLogged));
        } catch (error) {
            console.error("Erro ao salvar usuário no AsyncStorage", error);
        }
    }

    // 3. LOGOUT: Limpa a memória do celular para exigir login na próxima vez
    async function signOut() {
        try {
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
            setUser(null);
            setUserOut(true);
        } catch (error) {
            console.error("Erro ao remover usuário do AsyncStorage", error);
        }
    }

    return (
        <AuthContext.Provider value={{ userOut, signIn, signOut, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}