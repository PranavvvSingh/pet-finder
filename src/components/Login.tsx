import React, { useState } from "react";
import { FaPaw as Logo } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithPassword, signInWithGoogle } from "../config/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function logIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      const err=await signInWithPassword(email, password);
      if(err) setError(err)
      else navigate("/");
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   navigate("/");
    // }
  }
  async function googleSignIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <div className="flex justify-center items-center mt-[40px]">
      <form
        action=""
        className="w-[350px] mx-auto flex flex-col  justify-center p-5 border-2 border-amber-500 rounded-xl "
      >
        <h1 className="heading text-center text-3xl flex justify-center items-center mb-5">
          <Logo className="mr-1" />
          PetFinder
        </h1>
        <p className="text-center mb-2 text-neutral-600">Login with email</p>
        {error.length>0?<p className="text-red-500">{error}</p>:""}
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
          required
        />
        <button
          className="mb-2 bg-amber-500 p-2 rounded-full"
          onClick={(e) => logIn(e)}
        >
          Log In
        </button>
        <div className="mb-2 flex justify-center items-center">
          <div className="flex flex-1 bg-neutral-300 h-[2px]" />
          <span className="mx-2 text-sm text-neutral-400">OR</span>
          <div className="flex flex-1 bg-neutral-300 h-[2px]" />
        </div>
        <button
          className="border-2 border-amber-500 bg-amber-100 p-2 rounded-full flex items-center justify-center gap-2"
          onClick={(e) => googleSignIn(e)}
        >
          <img src="/google-logo.png" alt="google-logo" className="h-[25px] p-[2px] bg-white rounded-full" /> 
          Sign In With Google
        </button>
        <div className="mt-5 text-sm flex justify-center items-center gap-1 text-neutral-500">
          Dont have an account?
          <NavLink to="/signup" className="text-neutral-700 text-center underline underline-offset-1">
            Sign up
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
