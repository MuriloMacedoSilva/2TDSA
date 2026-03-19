import { Routes } from './navigation'
import { AuthProvider } from '@/features/auth/context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}