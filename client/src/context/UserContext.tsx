import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getUser } from "@/api";
import { toast } from "sonner";

interface UserContextType {
  user: User | null,
  setUser: (user: User | null) => void,
  updateCredits: (credits: number) => void,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateCredits = (credits: number) => {
    if (user) {
      setUser({ ...user, credits });
    }
  }

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getUser() 
        setUser(response.data)
      } catch (err: any) { 
        const message = err?.response?.data?.message || "Failed to load user."
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, []);

  return <UserContext.Provider value={{ user, setUser, updateCredits, isLoading, setIsLoading }}>
    {children}
  </UserContext.Provider>
}

export default UserProvider
