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
