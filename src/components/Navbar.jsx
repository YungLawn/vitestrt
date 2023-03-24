import { Link, useMatch, useResolvedPath } from "react-router-dom"
import '../styles/nav.css'

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Isotope Discovery Activity
      </Link>
      <ul>
        {/* <CustomLink to="/testing">Testing</CustomLink>
        <CustomLink to="/table">Sandbox</CustomLink> */}
        <CustomLink to='/activity1'>Activity 1</CustomLink>
        <CustomLink to='/activity2'>Activity 2</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
