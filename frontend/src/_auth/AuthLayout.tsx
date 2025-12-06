import { isAuthenticated } from "@/lib/react-query/authUtils";
import { Outlet,Navigate } from "react-router-dom";


const AuthLayout = () => {
  const userIsAuth = isAuthenticated(); 

  // If already logged in - redirect to homepage
  if (userIsAuth) {
    return <Navigate to="/" replace />;

  }


  
  return (
    <>
      

          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img src="/assets/images/side-img.svg" alt="logo" className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />


    </>
  )
}


export default AuthLayout;

