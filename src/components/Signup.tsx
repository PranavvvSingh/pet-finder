import React, { useState } from "react";
import { MdOutlinePets as Logo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signUpNewUser } from "../config/supabaseClient";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  async function signUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      const err=await signUpNewUser(email, password, username);
      if(err) setError(err)
      else navigate("/");
      // console.log("logging in");
    } catch (error) {
      console.log(error);
    }
  }
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
        <p className="text-center mb-2 text-neutral-600">Sign up with email</p>
        {error.length > 0 ? <p className="text-red-500 mb-1">{error}</p> : ""}
        <input
          type="text"
          size={1}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-5 rounded-lg p-2 bg-transparent border border-amber-500 outline-none"
        />
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
          className="mb-2 bg-amber-500 p-2 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            signUp(e);
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
