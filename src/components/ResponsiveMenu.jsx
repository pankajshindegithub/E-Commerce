import { UserButton, useUser, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
    const { user } = useUser()

    return (
        <div className={`${openNav ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}>
            
            <div>
                {/* User Section */}
                <div className='flex items-center justify-start gap-3'>
                    <SignedIn>
                        <UserButton size={50} />
                    </SignedIn>

                    <SignedOut>
                        <FaUserCircle size={50} />
                    </SignedOut>

                    <div>
                        <h1>Hello, {user?.firstName || "Guest"}</h1>
                        <h1 className='text-sm text-slate-500'>
                            {user ? "Premium User" : "Please Sign In"}
                        </h1>
                    </div>
                </div>

                {/* Menu */}
                <nav className='mt-12'>
                    <ul className='flex flex-col gap-7 text-2xl font-semibold'>
                        <Link to={'/'} onClick={() => setOpenNav(false)}><li>Home</li></Link>
                        <Link to={"/products"} onClick={() => setOpenNav(false)}><li>Products</li></Link>
                        <Link to={"/about"} onClick={() => setOpenNav(false)}><li>About</li></Link>
                        <Link to={"/contact"} onClick={() => setOpenNav(false)}><li>Contact</li></Link>

                        {/* ⭐ Sign In Button After Contact */}
                        <SignedOut>
                            <SignInButton>
                                <button className="bg-red-500 text-white text-xl py-2 rounded-lg mt-3">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default ResponsiveMenu
