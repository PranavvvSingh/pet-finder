import { useEffect } from "react";
import "./App.css";
import Collection from "./components/Collection";
import Login from "./components/Login";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pet from "./components/Pet";
import Saved from "./components/Saved";
import RequireAuth from "./components/RequireAuth";
import Signup from "./components/Signup";
import { useDispatch, useSelector } from "react-redux";
import supabase from "./config/supabaseClient";
import { login, logout } from "./features/auth";
import { RootState } from "./app/store";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const current_session = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   if (session) {
    //     dispatch(login(session!));
    //     console.log("session detected "+session.user.email)
    //   }
    //   else
    //   console.log("no local session");
    // });

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "SIGNED_IN" && !current_session) {
        dispatch(login(session!));
        toast({
          description: `✅ Welcome, ${session?.user.user_metadata.name}`,
        });
      }
      if (event == "SIGNED_OUT") {
        dispatch(logout());
        toast({
          description: `✅ Log out successful`,
        });
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Collection />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="pet/:petId"
            element={
              <RequireAuth>
                <Pet />
              </RequireAuth>
            }
          />
          <Route
            path="saved"
            element={
              <RequireAuth>
                <Saved />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
