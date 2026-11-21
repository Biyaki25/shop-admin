import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/** "← Back to products" link shown above the title on detail and form pages. */
export default function BackLink({ to = '/products', children = 'Back to products' }) {
  return (
    <Link to={to} className="link-button back-link">
      <Icon name="arrow-left" size={16} />
      {children}
    </Link>
  )
}
