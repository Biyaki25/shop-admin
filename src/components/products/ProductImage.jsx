import { useState } from 'react'
import Icon from '../ui/Icon.jsx'
import './ProductImage.css'

/**
 * Product photo with a graceful fallback.
 * If there is no URL, or the image fails to load, a grey placeholder with an
 * image icon is shown instead of a broken-image box. Out-of-stock products
 * can be shown faded and desaturated, as in the mock-up.
 */
export default function ProductImage({ src, alt, className = '', faded = false, loading = 'lazy' }) {
  // Remember which URL failed; a new URL automatically gets a fresh attempt.
  const [failedSrc, setFailedSrc] = useState(null)
  const showPlaceholder = !src || failedSrc === src

  if (showPlaceholder) {
    return (
      <div className={`product-image product-image--placeholder ${className}`.trim()} role="img" aria-label={`${alt} (no image)`}>
        <Icon name="image" size={28} strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={`product-image ${faded ? 'product-image--faded' : ''} ${className}`.trim()}
      onError={() => setFailedSrc(src)}
    />
  )
}
