import { AuthForm } from "@/components/AuthForm"
import { useUserContext } from "@/context/UserContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import OverlayLoader from "@/components/OverlayLoader"
import { type CredentialResponse } from "@react-oauth/google"
import { googleSignin, login, register } from "@/api"

const AuthPage = () => {
  const { setUser } = useUserContext()
  const [mode, setMode] = useState<"login" | "signup">('login')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleFormSubmit = async (formData: {
    name: string
    email: string
    password: string
  }) => {
    setIsLoading(true)
    try {
      let response;

      if (mode === 'login') {
        response = await login(formData);
      } else {
        response = await register(formData);
      }

      const { token, user }: { token: string, user: User } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      toast.success(`${mode === 'login' ? 'Login' : 'Registration'} successful!`);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      setIsLoading(true)
      try {
        const response = await googleSignin(credentialResponse.credential);

        const { token, user }: { token: string, user: User } = response.data;

        localStorage.setItem('token', token);
        setUser(user);
        toast.success("Google sign in successful!");
        navigate('/');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.error('No credential found.')
    }
  }

  const handleGoogleError = () => {
    toast.error('Google signin error.')
  }


  return (
    <div>
      <OverlayLoader show={isLoading} />
      <AuthForm
        mode={mode}
        hanldeModeChange={setMode}
        handleFormSubmit={handleFormSubmit}
        onGoogleSuccess={(handleGoogleSuccess)}
        onGoogleError={handleGoogleError}
        className="sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 m-auto font-sans" />
    </div>
  )
}

export default AuthPage
