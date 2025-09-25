import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supaBaseClient.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null); // Adding user state upon Login
  const [loading, setLoading] = useState(true);

  // Sign In (Existing User)
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      if (error) {
        console.error("Sign-in error:", error.message);
        return { success: false, error: error.message };
      }

      console.log("Sign-in success:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign-in:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Session Management
  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null); // Setting up the user
      setLoading(false);
    };

    getInitialSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null); // Update user when session changes
      }
    );

    return () => {
      subscription.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, user, loading, signInUser, signOut }} // Expose user to Client
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
