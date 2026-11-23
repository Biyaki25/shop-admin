/**
 * Small inline SVG icon set (stroke icons, 24×24 grid) so we don't need an
 * icon library. Icons are decorative: they are hidden from screen readers and
 * the surrounding text or aria-label carries the meaning.
 */
const PATHS = {
  logo: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" fill="currentColor" stroke="none" />
    </>
  ),
  search: (
    <>
      <circle cx="14" cy="10" r="6" />
      <path d="M9.6 14.4 4 20" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  'arrow-left': <path d="M19 12H5m6-6-6 6 6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.75" />
      <path d="m20.5 16-5-5-8.5 8.5" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
    </>
  ),
  spinner: <path d="M21 12a9 9 0 1 1-6.2-8.56" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  'square-plus': (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  form: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M7.5 9h9M7.5 12.5h9M7.5 16h5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
}

export default function Icon({ name, size = 16, strokeWidth = 2, className = '', ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`icon ${name === 'spinner' ? 'spin' : ''} ${className}`.trim()}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}
