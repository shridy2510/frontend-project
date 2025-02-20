'use client'

export default function Header(){

    return(
        <header className="sticky top-0  w-full flex items-center justify-between bg-background text-foreground  p-4 shadow-lg z-50">
            <div className="text-2xl font-bold">
                <img src={"/itam.svg"}/>

            </div>
            <nav className="space-x-6">
                <a href="/" className="hover:text-gray-300 transition duration-200">
                    Dashboard
                </a>
                <a href="/about" className="hover:text-gray-300 transition duration-200">
                    About
                </a>
                <a href="/contact" className="hover:text-gray-300 transition duration-200">
                    Contact
                </a>
            </nav>
            <div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-200">
                    Login
                </button>
            </div>
        </header>
    )







}