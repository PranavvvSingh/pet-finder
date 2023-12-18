import React, { useState } from "react";
import { MdOutlinePets as Logo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signUpNewUser } from "../config/supabaseClient";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function signUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      await signUpNewUser(email, password, username);
      console.log("logging in");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
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
