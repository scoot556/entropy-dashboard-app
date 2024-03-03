import Link from "next/link";

export const Navigation = () => {
    return (
        <div className="w-64 bg-green-800 text-green-100 py-4 space-y-6 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 h-full">
            <p className="text-2xl px-2">Personal Dashboard</p>
            <Link href="/weather" className="block py-2.5 px-4 rounded hover:text-white hover:bg-green-700">Weather</Link>
            <Link href="/news" className="block py-2.5 px-4 rounded hover:text-white hover:bg-green-700">News</Link>
            <Link href="/tasks" className="block py-2.5 px-4 rounded hover:text-white hover:bg-green-700">Tasks</Link>
        </div>
    );
}