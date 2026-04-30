import { MobileMenu } from "./mobile-menu"
import { ModeToggle } from "./mode-toggle"
import { Link, useNavigate } from "react-router-dom";
// combined the two imports into one line — they both come from the same place

export default function Navbar() {
  const navigate = useNavigate();
  // useNavigate is like a remote control — it lets us redirect the user to another page from code

  const user = localStorage.getItem('user');
  // check localStorage for the user — if its there the person is logged in, if not they arent

  const logout = () => {
    localStorage.removeItem('user');
    // removeItem deletes the user from localStorage — like clearing the sticky note
    navigate('/signin');
    // after clearing send them back to signin page
  };

  return (
    <nav className="grid grid-cols-2 md:grid-cols-3 items-center p-4 bg-background border-b text-foreground shadow-sm transition-colors">
      
      {/* 1. Logo (Left) */}
      <div className="font-bold text-xl">Pro Club</div>

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
          {user ? (
            // if user exists in localStorage — they are logged in — show logout button
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          ) : (
            // if no user in localStorage — they are not logged in — show login and signup
            <>
              <Link to="/signin" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                SignUp
              </Link>
            </>
          )}
        </div>

        {/* Hamburger - visible on ALL screen sizes */}
        <MobileMenu />

      </div>
    </nav>
  )
}