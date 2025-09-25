// src/components/layouts/privateLayouts.jsx
import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/authContext.jsx";
import { Toaster } from "react-hot-toast";
import Logo from "../assets/logo-jjl.jpg";

export default function PrivateLayout() {
  const { signOut, user } = UserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };

  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Tickets", link: "/tickets" },
    { name: "Events", link: "/events" },
  ];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
          <Link to="/" onClick={() => setOpen(false)}>
            <img className="h-9" src={Logo} alt="dummyLogoColored" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((nav, i) => (
              <Link key={i} to={nav.link} className="text-sm">
                {nav.name}
              </Link>
            ))}

            <div className="relative group">
              <div className="w-8 h-8 capitalize flex justify-center items-center bg-amber-700 text-white font-semibold rounded-full">
                {user.email.slice(0, 1)}
              </div>
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                <li
                  onClick={() => navigate(`/tickets/verify`)}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  Verify Tickets
                </li>
                <li
                  onClick={signOut}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:hidden ">
            <button
              onClick={() => (open ? setOpen(false) : setOpen(true))}
              aria-label="Menu"
              className=""
            >
              {/* Menu Icon SVG */}
              <svg
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="21" height="1.5" rx=".75" fill="#426287" />
                <rect
                  x="8"
                  y="6"
                  width="13"
                  height="1.5"
                  rx=".75"
                  fill="#426287"
                />
                <rect
                  x="6"
                  y="13"
                  width="15"
                  height="1.5"
                  rx=".75"
                  fill="#426287"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div
              className={`${
                open ? "flex" : "hidden"
              } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
            >
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/edit-articles" onClick={() => setOpen(false)}>
                Articles
              </Link>

              <Link to="/tutorials" onClick={() => setOpen(false)}>
                Tutorials
              </Link>

              <button onClick={handleLogout}>Logout</button>

              <button
                onClick={signOut}
                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-indigo-600 transition text-white rounded-full text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="bg-gray-200 p-6 md:hidden transition-all duration-1000">
            <ul className="flex flex-col space-y-4 text-gray-800 text-lg">
              {navLinks.map((nav, i) => (
                <li key={i}>
                  <Link
                    to={nav.link}
                    className="text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={handleLogout}
              className="bg-white text-gray-700 mt-6 w-full text-sm hover:opacity-90 active:scale-95 transition-all h-11 rounded-full"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-grow">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="border-t py-10 bg-[#1c1c1d] border-gray-300 px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white text-white">
            {/* Logo & Address */}
            <div className="flex flex-col md:flex-row gap-5">
              <img className="w-20 rounded-full" src={Logo} alt="Logo" />
              <div>
                <div className="text-xl font-medium">Jam Junction Lucknow</div>
                <div className="text-base font-light">
                  Contact: +91 12345 67890
                </div>
                <p className="max-w-[410px] mt-4 text-sm text-white/80">
                  Address: Balaganj, Lucknow, Uttar Pradesh, India - 226003
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-8 w-full md:w-[50%]"></div>
          </div>

          <p className="py-4 text-center text-xs md:text-sm text-white/70">
            Copyright 2025 © JamJunctionLucknow. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
