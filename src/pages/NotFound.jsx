import { Link } from 'react-router-dom'
import StatusCard from '../components/ui/StatusCard.jsx'

/** 404 page for any URL that doesn't match a route. */
export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <StatusCard
          badge="404"
          title="Page not found"
          headingLevel={1}
          action={
            <Link to="/" className="btn btn--primary btn--sm">
              Go home
            </Link>
          }
        >
          The page you’re looking for doesn’t exist or has moved.
        </StatusCard>
      </div>
    </div>
  )
}
