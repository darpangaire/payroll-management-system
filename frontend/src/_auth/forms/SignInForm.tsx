import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Link,useNavigate} from "react-router-dom"
import { z } from "zod"
import { SignInValidation } from "@/lib/validation"

import { useLoginUser} from "@/lib/react-query/useAuth"
import { useUser } from "@/lib/react-query/useUser"

type SignInFormValues = z.infer<typeof SignInValidation>



const SignInForm = () => {
  const form = useForm<SignInFormValues>({
    resolver:zodResolver(SignInValidation),
    defaultValues:{
      email:"",
      password:"",
    },

  })
  const navigate = useNavigate();
  const {mutate,isPending,isError,error,isSuccess} = useLoginUser()
  const {data:user,isLoading} = useUser();

  const onSubmit = (values:SignInFormValues)=> {
    mutate(values,{
      onSuccess: (data)=> {
        // The backend may return tokens in two shapes:
        // - Registration returns { tokens: { access, refresh } }
        // - SimpleJWT login returns { access, refresh }
        if (data?.tokens) {
          localStorage.setItem("access", data.tokens.access)
          localStorage.setItem("refresh", data.tokens.refresh)
        } else if (data?.access && data?.refresh) {
          localStorage.setItem("access", data.access)
          localStorage.setItem("refresh", data.refresh)
        }
        form.reset()
        if (isLoading) return;
        if (!user) navigate("/sign-in");
        if (user && user.role === "admin") navigate("/admin/dashboard");
        navigate("/employee");
        // navigate("/");

      }
    })
  }
  
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background text-foreground px-4 dark">
      <div className="w-full max-w-md bg-card shadow-lg rounded-2xl p-8 border border-border">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-semibold text-center tracking-tight">
            Create a new account
          </h2>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            Join us and start your journey today 🚀
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="johndoe@gmail.com" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ Success / Error Messages */}
            {isError && (
              <p className="text-sm text-red-500 text-center">{(error as any)?.response?.data?.detail ||"Invalid credentials. Please try again."}</p>
            )}
            {isSuccess && (
              <p className="text-sm text-green-500 text-center">Signed in successfully!</p>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                className="w-full shad-button_primary text-base font-medium flex items-center justify-center gap-2"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader  />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-white hover:underline text-sm font-semibold ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInForm

