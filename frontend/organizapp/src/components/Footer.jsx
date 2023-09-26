"use client";
import Image from "next/image";
function Footer(){
    return (
    <footer className="bg-white rounded-lg shadow dark:bg-slate-950 ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a className="flex items-center mb-4 sm:mb-0">
                <Image src="" className="h-8 mr-3" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-green-400">OrganiZapp</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-green-500 sm:mb-0 dark:text-green-400">
                <li>
                    <a className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-green-500 sm:text-center dark:text-green-400">© 2023 <a className="hover:underline">OrganiZapp</a>. All Rights Reserved.</span>
    </div>
</footer>
    )
}
export default Footer;