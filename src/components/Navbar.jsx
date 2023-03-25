import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useState } from "react";
import { elements } from "./data/Elements"
import '../styles/nav.css'

export default function Navbar( { selectedOption, setSelectedOption } ) {

  const handleOptionChange = (event) => {
    // console.log(event.target.value)
    setSelectedOption(event.target.value);
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Isotope Discovery Activity
      </Link>
      <ul>
        {/* <li className="dropDown">
        <select value={selectedOption} onChange={handleOptionChange}>
          {elements.map((option, index) => (
            <option key={option.id} value={index}>
              {option.name}
            </option>
          ))}
        </select>
        </li> */}
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
