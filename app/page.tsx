"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <header className="w-full py-4 px-6 bg-gray-800 shadow-md flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">MediaLabs</h1>

        {/* Authentication Buttons */}
        <nav className="flex items-center gap-4">
          <SignedOut>
            <Link href="/sign-in">
              <button className="btn btn-outline btn-primary">Sign In</button>
            </Link>
            <Link href="/sign-up">
              <button className="btn btn-primary">Sign Up</button>
            </Link>
          </SignedOut>

          {/* Show user profile button when signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>

      {/* Main Branding Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center p-6">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          MediaLabs
        </h2>
        <p className="text-xl text-gray-300 mt-4 max-w-xl">
          Transform images and videos with AI.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-6 flex gap-4">
          <SignedOut>
            <Link href="/sign-up">
              <button className="btn btn-primary btn-lg">Get Started</button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="btn btn-secondary btn-lg">Go to Dashboard</button>
            </Link>
          </SignedIn>
        </div>
      </main>
    </div>
  );
}
