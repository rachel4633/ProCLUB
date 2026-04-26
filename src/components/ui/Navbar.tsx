import { MobileMenu } from "./mobile-menu"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="grid grid-cols-2 md:grid-cols-3 items-center p-4 bg-background border-b text-foreground shadow-sm transition-colors">
      
      {/* 1. Logo (Left) */}
      <div className="font-bold text-xl">Personal Hub</div>

      {/* 2. Links (Center) - visible on desktop only */}
      <div className="hidden md:flex justify-center gap-6">
        <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
      </div>

      {/* 3. Actions (Right) */}
      <div className="flex justify-end items-center gap-2 md:gap-4">
        
        {/* Dark Mode Toggle - visible on all screens */}
        <ModeToggle />

        {/* Desktop Auth Buttons - hidden on mobile */}
        <div className="hidden sm:flex gap-4 items-center">
          <Link to="/signin" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">Login</Link>
          <Link to ="/signup"className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
            SignUp
          </Link>
        </div>

        {/* Hamburger - visible on ALL screen sizes now */}
        <MobileMenu />

      </div>
    </nav>
  )
}