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
import { SignUpValidation } from "@/lib/validation"


import { useRegisterUser } from "@/lib/react-query/useAuth"

type SignUpFormValues = z.infer<typeof SignUpValidation>


const SignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()
  const {mutate,isPending,isError,error,isSuccess} = useRegisterUser()

  const onSubmit = (values:SignUpFormValues) => {
    mutate(values, {
      onSuccess: ()=> {

        form.reset()
        navigate("/sign-in")
      },
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
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="@johndoe" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" className="shad-input" {...field} />
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
              <p className="text-sm text-red-500 text-center">{(error as any)?.response?.data?.detail ||"Something went wrong. PLease try again."}</p>
            )}
            {isSuccess && (
              <p className="text-sm text-green-500 text-center">Account created successfully!</p>
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
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-white hover:underline text-sm font-semibold ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpForm