import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <main>
      <h1>404 — Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <nav aria-label="Recovery links">
        <ul>
          <li>
            <Link to="/">Return Home</Link>
          </li>
          <li>
            <Link to="/#experience">View Experience</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
