"use client";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthdate] = useState("");

  const router = useRouter();
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  if (session) {
    router.replace("/");
    return null;
  }

  const registerAuth = async (e) => {
    e.preventDefault();
    if (
      username == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      birthDate == ""
    ) {
      setError("There are missing fields to complete!");
      return;
    } else {
      router.push("/auth/register/succesfull");
    }

    const response = await fetch(
      "http://localhost:3000/api/sendEmail/register",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          birthDate,
        }),
      }
    );
    console.log(await response.json());
    
    const response2 = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        birthDate
      }),
    });
    console.log(await response2.json());
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
            <div className="w-3/5 p-5">
              <div className="text-left font-bold">
                <span className="text-green-500">organiZapp</span>
              </div>
              <div className="py-10">
                <h2 className="text-3 font-bold text-green-500 mb-2">
                  Register
                </h2>

                <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                <div className="flex justify-center my-2">
                  <button
                    onClick={() =>
                      signIn("facebook", {
                        callbackUrl: "http://localhost:3000",
                      })
                    }
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaFacebookF className="text-sm text-green-500" />
                  </button>
                  <button
                    onClick={() =>
                      signIn("github", {
                        callbackUrl: "http://localhost:3000/",
                      })
                    }
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaGithub className=" text-sm text-green-500" />
                  </button>
                  <button
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: "http://localhost:3000/",
                      })
                    }
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaGoogle className="text-sm text-green-500  " />
                  </button>
                </div>
                <form
                  onSubmit={registerAuth}
                  className="flex flex-col items-center mb-5"
                >
                  {error && (
                    <span className="p-4 mb-2 text-sm font-semibold text-white bg-red-400">
                      {error}
                    </span>
                  )}
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      placeholder="Username"
                      className="bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Email"
                      className="bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                    <input
                      type="date"
                      name="birthdate"
                      id="birthdate"
                      value={birthDate}
                      onChange={(e) => {
                        setBirthdate(e.target.value);
                      }}
                      placeholder="Birthdate"
                      className=" bg-gray-100 outline-none text-sm flex-1  list-none "
                    />
                  </div>

                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      name="password"
                      placeholder="Password"
                      className=" bg-gray-100 outline-none text-sm flex-1  "
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      placeholder="Confirm Password"
                      className=" bg-gray-100 outline-none text-sm flex-1  "
                    />
                  </div>

                  <button
                    type="submit"
                    className=" border-2 border-green-500 text-green-500 rounded-full px-11 space-y-4 py-1 inline-block font-semibold hover:bg-green-500 hover:text-white "
                  >
                    Continue
                  </button>
                </form>
              </div>
            </div>
            <div className="w-2/5 bg-green-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
              <h2 className="text-3xl font-bold mb-2">Welcome</h2>
              <div className="border-white inline-block mb-2"></div>
              <p className="mb-4">
                The key to success is in the organization. Use our app and start
                working smarter, not harder.
              </p>
              <Link
                href="/auth/login"
                className="border-2 border-white rounded-full px-11 inline-block font-semibold hover:bg-white hover:text-green-500"
              >
                ¡Login Here!
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
