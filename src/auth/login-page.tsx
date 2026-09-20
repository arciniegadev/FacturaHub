import { useState, type FormEvent } from "react"
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FiraMark } from "@/components/fira-logo"
import { useAuth } from "@/auth/auth-context"

type Mode = "signin" | "signup"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export function LoginPage() {
  const { configured, signIn, signUp, signInWithGoogle } = useAuth()

  const [mode, setMode] = useState<Mode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState<"email" | "google" | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setPending("email")
    try {
      if (mode === "signin") {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.")
    } finally {
      setPending(null)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    setPending("google")
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.")
    } finally {
      setPending(null)
    }
  }

  return (
    <div className="relative grid min-h-svh place-items-center overflow-hidden bg-background p-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-emerald-500/15 blur-3xl"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <FiraMark variant="transparent" className="size-10 text-foreground" />
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "signin" ? "Inicia sesión en Fira" : "Crea tu cuenta en Fira"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "signin"
              ? "Accede a tu sistema de facturación."
              : "Regístrate para empezar a facturar."}
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            {!configured && (
              <Alert variant="destructive" className="mb-2">
                <AlertCircle />
                <AlertTitle>Firebase sin configurar</AlertTitle>
                <AlertDescription>
                  Define las variables{" "}
                  <code className="font-mono text-xs">VITE_FIREBASE_*</code> en
                  tu archivo <code className="font-mono text-xs">.env</code>.
                </AlertDescription>
              </Alert>
            )}
            <CardTitle className="sr-only">Acceso</CardTitle>
            <CardDescription className="sr-only">
              Formulario de acceso
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={handleGoogle}
              disabled={pending !== null || !configured}
            >
              {pending === "google" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Continuar con Google
            </Button>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">o</span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="login-email">Correo electrónico</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={pending !== null}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="login-password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      mode === "signin" ? "current-password" : "new-password"
                    }
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={pending !== null}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="mt-1 w-full" disabled={pending !== null}>
                {pending === "email" && <Loader2 className="animate-spin" />}
                {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              {mode === "signin" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
              <button
                type="button"
                className="font-medium text-primary underline-offset-4 hover:underline"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin")
                  setError(null)
                }}
              >
                {mode === "signin" ? "Regístrate" : "Inicia sesión"}
              </button>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Fira · Sistema de facturación
        </p>
      </div>
    </div>
  )
}
