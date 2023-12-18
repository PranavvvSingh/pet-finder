import React, { useState } from "react";
import { MdOutlinePets as Logo } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
// import { set } from "../features/favorites";
import { NavLink, useNavigate } from "react-router-dom";
// import Loader from "../components/Loader";
import { signInWithPassword, signInWithGoogle } from "../config/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function logIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      await signInWithPassword(email, password);
      console.log("logging in");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  }
  async function googleSignIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      console.log("logging in");
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    } 
    finally {
      console.log("final block executed")
    }
  }
  // if (isPending) return <Loader />;
  // else
  return (
    <div className="flex justify-center items-center mt-[50px]">
      <form
        action=""
        className="w-[350px] mx-auto flex flex-col  justify-center p-5 border-2 border-amber-500 rounded-xl"
      >
        <h1 className="heading text-center text-3xl flex justify-center items-center mb-5">
          <Logo className="mr-1" />
          PetFinder
        </h1>
        <NavLink to="/signup" className="text-neutral-500 text-center mb-5">
          Not a member? Click here
        </NavLink>
        <input
          type="text"
          size={1}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-5 rounded-lg p-2 bg-transparent border border-amber-500 outline-none"
        />
        <input
          type="password"
          size={1}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-5 rounded-lg p-2 bg-transparent border border-amber-500 outline-none"
        />
        <button
          className="mb-5 bg-amber-500 p-2 rounded-xl"
          onClick={(e) => logIn(e)}
        >
          Log In
        </button>
        <hr className="bg-neutral-200 h-[2px]   mb-5" />
        <button
          className="bg-amber-500 p-2 rounded-xl flex items-center justify-center gap-2"
          onClick={(e) => googleSignIn(e)}
        >
          <FaGoogle />
          Sign In With Google
        </button>
      </form>
    </div>
  );
};

export default Login;
