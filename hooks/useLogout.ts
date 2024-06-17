import { useLocalStorage } from "react-use"
import { toast } from "sonner"

export const useLogout = () => {
  const [, setId] = useLocalStorage("app:id", "")

  const logout = () => {
    setId("")
    toast.success("Successfully logged out")
  }

  return { logout }
}
