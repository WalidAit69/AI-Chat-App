import React from "react";
import Logo from "./Logo";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex:row items-center p-5 pl-2 bg-white dark:bg-gray-900
      max-w-7xl mx-auto">
        <Logo />

        <div className="bg-black flex-1 items-center justify-end space-x-4">

            {/* {session &&} */}

            {/* {darkmode &&} */}

            {/* {userbutton &&} */}

        </div>

      </nav>

            {/* {pro banner} */}

    </header>
  );
}

export default Header;
