import React from "react";

function Navbar() {
    return (
        <header id="navbar" className="z-50 fixed top-0 w-full bg-gray-700 text-white py-5 text-center backdrop-blur-md">
            <nav className="font-semibold text-2xl font-sans">
                <ul className="flex justify-center">
                    <li className="mr-5">
                        <a href="#top">Home</a>
                    </li>
                    <li className="mr-5">
                        <a href="first.html">My Profile</a>
                    </li>
                    <li className="mr-5">
                        <a href="settings.html">Settings</a>
                    </li>
                    <li className="mr-5">
                        <a href="signUp.html">Sign Up</a>
                    </li>
                    <li className="mr-5">
                        <a href="signIn.html">Sign In</a>
                    </li>
                    <li>
                        <a href="about.html">About</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
