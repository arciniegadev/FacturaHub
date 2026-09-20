import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth"

import {
  googleProvider,
  isFirebaseConfigured,
  requireAuth,
} from "@/auth/firebase"

export type AuthErrorCode =
  | "auth/invalid-credential"
  | "auth/wrong-password"
  | "auth/user-not-found"
  | "auth/email-already-in-use"
  | "auth/weak-password"
  | "auth/invalid-email"
  | "auth/too-many-requests"
  | "auth/network-request-failed"
  | "auth/popup-closed-by-user"
  | "auth/unauthorized-domain"

const errorMessages: Record<AuthErrorCode, string> = {
  "auth/invalid-credential": "Correo o contraseña incorrectos.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/user-not-found": "No existe una cuenta con este correo.",
  "auth/email-already-in-use": "Ya existe una cuenta con este correo.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/invalid-email": "El correo electrónico no es válido.",
  "auth/too-many-requests":
    "Demasiados intentos. Espera un momento y vuelve a intentarlo.",
  "auth/network-request-failed":
    "Error de conexión. Revisa tu red e inténtalo de nuevo.",
  "auth/popup-closed-by-user": "Cerraste la ventana de Google.",
  "auth/unauthorized-domain":
    "Este dominio no está autorizado en Firebase Authentication.",
}

function toFriendlyError(err: unknown): Error {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? (err as { code: string }).code
      : undefined

  if (code && code in errorMessages) {
    return new Error(errorMessages[code as AuthErrorCode])
  }
  if (err instanceof Error && !code) {
    return new Error(err.message)
  }
  return new Error("Ocurrió un error inesperado. Inténtalo de nuevo.")
}

type AuthContextValue = {
  user: User | null
  loading: boolean
  configured: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(requireAuth(), (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(requireAuth(), email, password)
    } catch (err) {
      throw toFriendlyError(err)
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(requireAuth(), email, password)
    } catch (err) {
      throw toFriendlyError(err)
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(requireAuth(), googleProvider)
    } catch (err) {
      throw toFriendlyError(err)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(requireAuth())
    } catch (err) {
      throw toFriendlyError(err)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured: isFirebaseConfigured,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
    }),
    [user, loading, signIn, signUp, signInWithGoogle, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>.")
  }
  return ctx
}
