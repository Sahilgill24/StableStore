import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { getUserAPI } from "@/lib/endpoints";
import Spinner from "../ui/spinner";
import { useUserStore } from "@/hooks/useStore";

const PrivateRoute = () => {

  const { toast } = useToast()
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  const { setUser } = useUserStore()
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(getUserAPI, {
          withCredentials: true
        })
        if (res.status == 403) {
          setVerified(false)
        } else if (res.status == 200) {
          setUser(res.data)
          setVerified(true)
        }
      } catch (error) {
        toast({
          description: "An error occurred while verifying your identity.",
        })
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  return (
    <>{loading ? (
      <div className="flex justify-center align-center w-full h-full">
        <div className="absolute top-[50%] left-[50%]">
          <Spinner className="w-10 h-10" />
        </div>
      </div>
    ) : verified ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace={true} /> // Redirect to login if not authenticated
    )
    }
    </>
  );
};

export default PrivateRoute;
