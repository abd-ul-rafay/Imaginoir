import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./components/Layout"
import ProfilePage from "./pages/ProfilePage"
import AuthPage from "./pages/AuthPage"
import GeneratePage from "./pages/GeneratePage"
import PurchasePage from "./pages/PurchasePage"
import NotFoundPage from "./pages/NotFoundPage"
import Header from "./components/Header"
import { ThemeProvider } from "./components/ThemeProvider"
import CommunityPage from "./pages/CommunityPage"
import { Toaster } from "sonner"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='community' element={<CommunityPage />} />
          <Route path='purchase' element={<PurchasePage />} />
          <Route path='auth'
            element={
              <ProtectedRoute isAuthRoute>
                <AuthPage />
              </ProtectedRoute>
            }
          />
          <Route path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="generate"
            element={
              <ProtectedRoute>
                <GeneratePage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster position="top-center" toastOptions={{ className: 'sonner-overrides' }} />
    </ThemeProvider>
  )
}

export default App
