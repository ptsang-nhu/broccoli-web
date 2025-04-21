import Link from "next/link";

import React from "react";

function Navbar() {
  return (
    <header className="bg-background fixed top-0 w-full">
      <nav className="mx-auto w-full border-b-2 border-b-violet-400 px-2 py-4 md:px-4 md:py-6 dark:border-b-blue-400">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mt-2 cursor-pointer rounded-2xl p-1 font-mono text-xl font-semibold text-gray-950 outline-blue-400 focus-visible:outline-2 md:text-3xl dark:text-white dark:outline-blue-300"
          >
            BROCCOLI & CO.
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
