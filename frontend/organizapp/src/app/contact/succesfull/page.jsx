import Link from "next/link";
export default function Succesfull() {
  return (
    <div className="bg-gray-300 flex items-center justify-center h-screen">
      <div className="card bg-white p-6 rounded-lg shadow-md text-center">
        <div className="rounded-full bg-green-100 h-32 w-32 mx-auto flex items-center justify-center">
          <i className="text-green-600 text-5xl checkmark">✓</i>
        </div>
        <h1 className="text-green-600 text-3xl font-semibold mt-6">Success</h1>
        <p className="text-gray-700 text-lg mt-2">
          ¡We have received your email!!
          <br /> We will contact you as soon as possible
        </p>
        <Link href="/">
          <button
            type="button"
            class=" my-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Back to the start
          </button>
        </Link>
      </div>
    </div>
  );
}
