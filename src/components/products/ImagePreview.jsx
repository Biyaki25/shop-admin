import { useState } from 'react'
import { isValidImageUrl } from '../../utils/validation.js'
import Icon from '../ui/Icon.jsx'

/**
 * Live preview under the Image URL field. Three states from states.pdf:
 *  - no URL yet          -> "No image yet"
 *  - bad URL / 404 image -> red "Image unavailable"
 *  - working URL         -> thumbnail + "Image preview"
 */
export default function ImagePreview({ url, caption, plain = false }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const trimmed = url.trim()
  const valid = trimmed !== '' && isValidImageUrl(trimmed)
  const broken = (trimmed !== '' && !valid) || failedSrc === trimmed

  let thumb
  let title
  let text
  if (!trimmed) {
    thumb = <Icon name="image" size={18} strokeWidth={1.75} />
    title = 'No image yet'
    text = 'Add an image URL to see a preview.'
  } else if (broken) {
    thumb = <Icon name="image" size={18} strokeWidth={1.75} />
    title = 'Image unavailable'
    text = 'Check the URL and try a publicly accessible image.'
  } else {
    thumb = <img src={trimmed} alt="" onError={() => setFailedSrc(trimmed)} />
    title = 'Image preview'
    text = caption || 'Preview from your image URL.'
  }

  return (
    <div
      className={`image-preview ${plain ? 'image-preview--plain' : ''} ${broken ? 'is-broken' : ''}`.trim()}
      aria-live="polite"
    >
      <div className="image-preview__thumb">{thumb}</div>
      <div>
        <p className="image-preview__title">{title}</p>
        <p className="image-preview__text">{text}</p>
      </div>
    </div>
  )
}
