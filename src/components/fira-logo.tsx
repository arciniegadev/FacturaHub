type FiraMarkProps = {
  className?: string
  variant?: "tile" | "transparent"
}

export function FiraMark({ className, variant = "tile" }: FiraMarkProps) {
  if (variant === "transparent") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Fira">
        <path
          d="M20 6h24v42l-4-3.2-4 3.2-4-3.2-4 3.2-4-3.2-4 3.2z"
          fill="currentColor"
        />
        <rect x="25" y="13" width="14" height="3" rx="1.5" fill="currentColor" opacity="0.45" />
        <rect x="25" y="19" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.45" />
        <rect x="25" y="25" width="12" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
        <circle cx="42" cy="44" r="10" fill="#10B981" />
        <path
          d="M37.5 44l3 3 6-6.5"
          stroke="#ffffff"
          strokeWidth="2.75"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Fira">
      <defs>
        <linearGradient id="fira-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#fira-gradient)" />
      <path
        d="M20 12h24v36l-4-3.2-4 3.2-4-3.2-4 3.2-4-3.2-4 3.2z"
        fill="#ffffff"
      />
      <rect x="25" y="19" width="14" height="3" rx="1.5" fill="#C7D2FE" />
      <rect x="25" y="25" width="10" height="3" rx="1.5" fill="#C7D2FE" />
      <rect x="25" y="31" width="12" height="3" rx="1.5" fill="#E0E7FF" />
      <circle cx="42" cy="44" r="10" fill="#10B981" />
      <path
        d="M37.5 44l3 3 6-6.5"
        stroke="#ffffff"
        strokeWidth="2.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type FiraLogoProps = {
  markClassName?: string
  variant?: "tile" | "transparent"
}

export function FiraLogo({ markClassName, variant = "tile" }: FiraLogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <FiraMark className={markClassName ?? "size-8"} variant={variant} />
      <div className="grid leading-tight">
        <span className="text-base font-bold tracking-tight">Fira</span>
        <span className="text-xs text-muted-foreground">
          Sistema de facturación
        </span>
      </div>
    </div>
  )
}
