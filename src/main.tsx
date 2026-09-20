import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { AuthProvider } from "@/auth/auth-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </AuthProvider>
  </StrictMode>,
)
