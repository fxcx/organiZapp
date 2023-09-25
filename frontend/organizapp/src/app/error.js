'use client'

const ErrorComponent = ({error,reset}) => {
    return (
        <div className="bg-red-500 text-white p-3 rounded-md text-center">
            error!
            {error.message}
            <button className="border border-white p-1 rounded-md ml-2" onClick={reset}>Refresh</button>
        </div>
    )
}