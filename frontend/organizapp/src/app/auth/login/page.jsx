"use client";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [error, setError] = useState(null);
  const { data: session } = useSession();
  if (session) {
    router.replace("/");
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      username: data.get("username"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/");
    } else {
      console.log("Error", signInResponse);
      setError("Your Username or Password is wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-500">organiZapp</span>
            </div>
            <div className="py-10">
              <h2 className="text-3 font-bold text-green-500 mb-2">Login!</h2>

              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <button
                  onClick={() =>
                    signIn("facebook", { callbackUrl: "http://localhost:3000" })
                  }
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaFacebookF className="text-sm text-green-500" />
                </button>
                <button
                  onClick={() =>
                    signIn("github", { callbackUrl: "http://localhost:3000/" })
                  }
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaGithub className=" text-sm text-green-500" />
                </button>
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "http://localhost:3000/" })
                  }
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaGoogle className="text-sm text-green-500  " />
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
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
                    placeholder="Username"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>

                <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
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
              href="/auth/register/"
              className="border-2 border-white rounded-full px-11 inline-block font-semibold hover:bg-white hover:text-green-500"
            >
              ¡Register here!
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
