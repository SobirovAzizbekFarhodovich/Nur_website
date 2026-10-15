type P = { className?: string }

/** The eight-point star (two interlaced squares), the brand's only ornament. */
export function Star({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.00,0.00 L15.51,3.51 L20.49,3.51 L20.49,8.49 L24.00,12.00 L20.49,15.51 L20.49,20.49 L15.51,20.49 L12.00,24.00 L8.49,20.49 L3.51,20.49 L3.51,15.51 L0.00,12.00 L3.51,8.49 L3.51,3.51 L8.49,3.51Z" />
    </svg>
  )
}

export function TelegramIcon({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.2 3.6 2.9 10.7c-1.2.5-1.2 1.2 0 1.6l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.5-1.5ZM9.3 14l8.9-5.6c.4-.3.8-.1.5.2l-7.4 6.7-.3 3.1L9.3 14Z"
      />
    </svg>
  )
}

export function ArrowDown({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v15m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowLeft({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 12H5m0 0 6-6m-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Feature icons, drawn to match the app's outlined tab icons (1.8 stroke, round joins). */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** Lock screen: a framed picture with a horizon. */
export function IconWallpaper({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="2.5" width="14" height="19" rx="3" {...S} />
      <path d="M5.5 16.5 9.5 12l3 3 2-2 4 4" {...S} />
      <circle cx="14.5" cy="8" r="1.4" {...S} />
    </svg>
  )
}

/** The assistant: the app's sparkle. */
export function IconSparkles({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 3.5 11.6 8a3 3 0 0 0 1.9 1.9L18 11.5 13.5 13a3 3 0 0 0-1.9 1.9L10 19.5 8.4 15a3 3 0 0 0-1.9-1.9L2 11.5 6.5 10A3 3 0 0 0 8.4 8L10 3.5Z" {...S} />
      <path d="M18.5 2.5v4M16.5 4.5h4M18.5 16.5v4M16.5 18.5h4" {...S} />
    </svg>
  )
}

/** Recitation: a microphone. */
export function IconMic({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="2.5" width="6" height="12" rx="3" {...S} />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v4" {...S} />
    </svg>
  )
}

/** The Quran: an open book. */
export function IconBook({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 6.5C10.3 5 7.8 4.5 3 4.5v14c4.8 0 7.3.5 9 2 1.7-1.5 4.2-2 9-2v-14c-4.8 0-7.3.5-9 2Zm0 0v14" {...S} />
    </svg>
  )
}

/** Another ayah: a turning arrow, as on the app's button. */
export function IconRefresh({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4v4.5H15" {...S} />
    </svg>
  )
}
