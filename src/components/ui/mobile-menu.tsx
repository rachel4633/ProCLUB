import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Navigation links
const navLinks = [
  { name: "Today's Schedule", href: "/" },
  { name: "Weekly Review", href: "/weekly-review" },
  { name: "Profile", href: "/profile" },
  { name: "About", href: "/about" },       
  { name: "Login", href: "/signin" },         
  { name: "Sign Up", href: "/signup" }, 

]

// Animation (container)
const containerVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

// Animation (links)
const linkVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: {
    opacity: 0,
    y: 20,
  },
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      
      {/* Hamburger button */}
      <SheetTrigger asChild>
        <button className="p-2 rounded-md hover:bg-muted transition">
          <Menu className="h-6 w-6 text-foreground" />
        </button>
      </SheetTrigger>

      {/* Sheet content */}
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-background text-foreground"
      >
        <SheetHeader>
          <SheetTitle className="text-left text-foreground">
            Pro Club 
          </SheetTitle>
        </SheetHeader>

        <motion.div
          variants={containerVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="flex flex-col gap-6 mt-10"
        >
          {navLinks.map((link: { name: string; href: string }) => (
            <motion.div
              key={link.name}
              variants={linkVariants}
              whileHover={{ x: 10 }}
              >
              <Link 
              to = {link.href} 
              className="text-2xl font-semibold text-foreground transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}