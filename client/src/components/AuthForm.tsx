import { useState } from 'react'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type AuthMode = 'login' | 'signup'

interface AuthFormProps extends React.ComponentProps<'div'> {
  mode: AuthMode;
  hanldeModeChange: (mode: AuthMode) => void;
  handleFormSubmit: (data: { name: string; email: string; password: string }) => void;
  onGoogleSuccess: (credentialResponse: CredentialResponse) => void;
  onGoogleError: () => void;
}

export function AuthForm({
  className,
  mode,
  hanldeModeChange,
  handleFormSubmit,
  onGoogleSuccess,
  onGoogleError,
  ...props
}: AuthFormProps) {
  const isSignup = mode === 'signup'

  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<{ name?: string, email?: string, password?: string }>({})

  const onModeChange = (mode: AuthMode) => {
    setErrors({})
    setFormData({ name: '', email: '', password: '' })
    hanldeModeChange(mode)
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (mode === 'signup' && (!formData.name || formData.name.trim().length < 3)) {
      newErrors.name = "Name must be at least 3 characters"
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    handleFormSubmit(formData)
  }

  return (
    <div className={className} {...props}>
      <Card className="overflow-hidden">
        <CardContent>
          <form noValidate onSubmit={onFormSubmit} className="px-6 md:px-8 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {isSignup ? 'Create an account' : 'Welcome back'}
                </h1>
                <p className="text-balance text-muted-foreground">
                  {isSignup ? 'Sign up to get started' : 'Login to your account'}
                </p>
              </div>

              {isSignup && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full">
                {isSignup ? 'Sign Up' : 'Login'}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background dark:bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="w-full flex items-center justify-center bg-white rounded-md overflow-hidden">
                <GoogleLogin
                  onSuccess={onGoogleSuccess}
                  onError={onGoogleError}
                />
              </div>
              <div className="text-center text-sm">
                {isSignup ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="underline underline-offset-4 cursor-pointer"
                      onClick={() => onModeChange('login')}
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      className="underline underline-offset-4 cursor-pointer"
                      onClick={() => onModeChange('signup')}
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
