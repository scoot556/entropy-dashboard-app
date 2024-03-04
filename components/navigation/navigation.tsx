import Link from "next/link";

export const Navigation = () => {
    return (
        <>
            <div className="bg-green-800 text-green-100 flex flex-col items-center justify-center md:hidden">
                <p className="text-2xl pt-4">Personal Dashboard</p>
                <div className="flex items-center space-x-4 p-4 w-full justify-evenly">
                
                    <Link href="/weather" className="block py-2.5 px-4 rounded hover:text-white hover:bg-green-700">Weather</Link>
                    <Link href="/news" className="block py-2.5 px-4 rounded hover:text-white hover:bg-green-700">News</Link>
                    <Link href="/tasks" className="block py-2.5 px-4 rounded hover:text-white hover:bg-green-700">Tasks</Link>
                </div>
            </div>

            <div className="hidden md:flex h-full w-64 z-30 flex-col fixed inset-y-0">
                <div className="w-64 bg-green-800 text-green-100 py-4 space-y-6 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 h-full">
                    <p className="text-2xl px-2">Personal Dashboard</p>
                    <Link href="/weather" className="block py-2.5 px-4 rounded hover:text-white hover:bg-green-700">Weather</Link>
                    <Link href="/news" className="block py-2.5 px-4 rounded hover:text-white hover:bg-green-700">News</Link>
                    <Link href="/tasks" className="block py-2.5 px-4 rounded hover:text-white hover:bg-green-700">Tasks</Link>
                    <div className="block h-fit py-2.5 px-4">
                        <a className="absolute bottom-0" href="https://github.com/scoot556" target="_blank">Made by Scott Djuric</a>
                    </div>
                </div>
            </div>
        </>
    );
}