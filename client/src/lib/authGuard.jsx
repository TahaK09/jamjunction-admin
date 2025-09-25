import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/authContext.jsx";
import { OrbitProgress } from "react-loading-indicators";

export default function AuthGuard({ children }) {
  const { user, loading } = UserAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <OrbitProgress
          variant="split-disc"
          color="#35c8ee"
          size="small"
          text=""
          textColor=""
        />
      </div>
    );
  if (!user) return <Navigate to="/signin" />;

  return children;
}
