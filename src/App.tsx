import Navbar from "./components/ui/Navbar"
import { Routes, Route } from 'react-router-dom';
import Signup from './components/ui/Signup'
import Signin from "./components/ui/Signin";
import Schedule from './components/ui/Schedule';
import About from "./components/ui/About";
import Profile from "./components/ui/Profile";
import WeeklyReview from "./components/ui/Weekly-review";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { ThemeProvider } from "./components/ui/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col bg-background text-foreground transition-colors duration-300">
        
        <Navbar />

        <main className="flex flex-1 items-center justify-center">
          <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Schedule />} />
              <Route path="/weekly-review" element={<WeeklyReview />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
                } />
               <Route path="/profile" element={
                 <ProtectedRoute>
                  <Profile />
                 </ProtectedRoute>
                } />
            {/* Add more routes here as you create more pages */}
          </Routes>
        </main>

      </div>
    </ThemeProvider>
  )
}

export default App