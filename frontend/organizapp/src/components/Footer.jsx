"use client";
import Image from "next/image";
import Link from "next/link";
import webpLogoImage from "../../public/assets/organizapplogo.webp";
function Footer() {
  return (
    <footer className="bg-white shadow dark:bg-slate-950 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <Image
              src={webpLogoImage}
              className="mr-3"
              width={75}
              height={75}
              quality={100}
              alt="Logo Image"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-green-400">
              OrganiZapp
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-green-500 sm:mb-0 dark:text-green-400">
            <li>
              <Link href="/about" className="mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-green-500 sm:text-center dark:text-green-400">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            OrganiZapp
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
export default Footer;
