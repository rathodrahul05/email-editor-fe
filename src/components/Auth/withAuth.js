
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) =>
  ({ ...props }) => {
    const [isClient, setIsClient] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsClient(true);
      }
    }, []);
    if (isClient) {
      const accessToken = JSON.parse(localStorage.getItem("authToken"));

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        navigate("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };

export default withAuth;