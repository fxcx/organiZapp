"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import webpLogoImage from "../../public/assets/organizapplogo.webp";
function NavBar() {
  const { data: session } = useSession();

  useEffect(() => {
    const handleBurgerClick = () => {
      const menus = document.querySelectorAll(".navbar-menu");

      if (menus.length) {
        for (let i = 0; i < menus.length; i++) {
          menus[i].classList.toggle("hidden");
        }
      }
    };

    const handleCloseClick = () => {
      const menus = document.querySelectorAll(".navbar-menu");

      if (menus.length) {
        for (let i = 0; i < menus.length; i++) {
          menus[i].classList.toggle("hidden");
        }
      }
    };

    const handleBackdropClick = () => {
      const menus = document.querySelectorAll(".navbar-menu");

      if (menus.length) {
        for (let i = 0; i < menus.length; i++) {
          menus[i].classList.toggle("hidden");
        }
      }
    };

    const burgers = document.querySelectorAll(".navbar-burger");
    if (burgers.length) {
      for (let i = 0; i < burgers.length; i++) {
        burgers[i].addEventListener("click", handleBurgerClick);
      }
    }

    const closes = document.querySelectorAll(".navbar-close");
    if (closes.length) {
      for (let i = 0; i < closes.length; i++) {
        closes[i].addEventListener("click", handleCloseClick);
      }
    }
    const backdrops = document.querySelectorAll(".navbar-backdrop");
    if (backdrops.length) {
      for (let i = 0; i < backdrops.length; i++) {
        backdrops[i].addEventListener("click", handleBackdropClick);
      }
    }
    return () => {
      if (burgers.length) {
        for (let i = 0; i < burgers.length; i++) {
          burgers[i].removeEventListener("click", handleBurgerClick);
        }
      }

      if (closes.length) {
        for (let i = 0; i < closes.length; i++) {
          closes[i].removeEventListener("click", handleCloseClick);
        }
      }

      if (backdrops.length) {
        for (let i = 0; i < backdrops.length; i++) {
          backdrops[i].removeEventListener("click", handleBackdropClick);
        }
      }
    };
  }, []);

  const renderAuthNavbar = (
    <>
      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
        <li>
          <a
            className="text-sm text-white font-bold hover:text-gray-300"
            href="/"
          >
            Home
          </a>
        </li>
        <li className="text-gray-300"></li>
        <li>
          <Link
            className="text-sm text-white font-bold hover:text-gray-300"
            href="/chat"
          >
            Chat
          </Link>
        </li>
        <li className="text-gray-300"></li>
        <li>
          <Link
            className="text-sm text-white font-bold hover:text-gray-300"
            href="/callendary"
          >
            Callendary
          </Link>
        </li>
        <li className="text-gray-300"></li>
        <li>
          <Link
            className="text-sm text-white font-bold hover:text-gray-300"
            href="/contact"
          >
            Contact
          </Link>
        </li>
      </ul>
      <div className="flex ">
        <p className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl ">
          {session?.user?.name}
        </p>
        <Image
          src={session?.user?.image}
          className="w-10 h-10 rounded-full lg:inline-block mx-0"
          quality={100}
          width={100}
          height={100}
          alt=""
        ></Image>

        <button
          onClick={() => signOut()}
          className="hidden lg:inline-block space-x-0.5 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200 mx-10"
        >
          Logout
        </button>
      </div>
    </>
  );
  const renderCommonNavbar = (
    <>
      <Link
        className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
        href="#"
      >
        <button onClick={() => signIn()}>Login</button>
      </Link>
      <Link
        className="hidden lg:inline-block py-2 px-6 bg-green-500 hover:bg-green-600 text-sm text-white font-bold rounded-xl transition duration-200"
        href="/auth/register/"
      >
        Register
      </Link>
    </>
  );
  const hamburguerAuthNavbar = (
    <>
      <div className="flex items-center mb-8">
        <a className="mr-auto text-3xl font-bold leading-none" href="#">
          <svg className="h-12" alt="logo" viewBox="0 0 10240 10240">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M8284 9162 c-2 -207 -55 -427 -161 -667 -147 -333 -404 -644 -733 -886 -81 -59 -247 -169 -256 -169 -3 0 -18"
            ></path>
          </svg>
        </a>
        <button className="navbar-close">
          <svg
            className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div className="my-2">
        <ul>
          <li className="mb-1">
            <Link
              className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className="mb-1">
            <Link
              className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded"
              href="/chat"
            >
              Chat
            </Link>
          </li>
          <li className="mb-1">
            <Link
              className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded"
              href="/chat"
            >
              Callendary
            </Link>
          </li>
          <li className="mb-1">
            <Link
              className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded"
              href="/contact"
            >
              Contact
            </Link>
          </li>
          <li className="mb-1">
            <button
              onClick={() => signOut()}
              className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-green-600 hover:bg-green-700  rounded-xl"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
  const hamburguerCommonNavbar = (
    <>
      <div className="mt-auto">
        <div className="pt-6">
          <Link
            className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
            href="#"
          >
            <button onClick={() => signIn()}>Login</button>
          </Link>
          <Link
            className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-green-600 hover:bg-green-700  rounded-xl"
            href="/auth/register"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-green-600">
        <Link className="text-3xl font-bold leading-none" href="/">
          <Image
            src={webpLogoImage}
            alt="Mi Imagen WebP"
            width={75}
            height={75}
            quality={100}
          ></Image>
        </Link>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-green-400 p-3">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        {session?.user ? renderAuthNavbar : renderCommonNavbar}
      </nav>
      <div className="navbar-menu relative z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          {session?.user ? hamburguerAuthNavbar : hamburguerCommonNavbar}
        </nav>
      </div>
    </>
  );
}
export default NavBar;
