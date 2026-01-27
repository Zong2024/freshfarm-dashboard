import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import api from "@/services/api"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await api.post("/admin/signin", {
        username,
        password,
      })
      const { token, expired } = response.data
      Cookies.set("hexToken", token, { expires: new Date(expired) })
      navigate("/admin/products")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to login.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='username'>Email</Label>
                <Input
                  id='username'
                  type='email'
                  placeholder='test@example.com'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' variant='primary'>
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login
