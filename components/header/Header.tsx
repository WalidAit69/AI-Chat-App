"use server"

import React from "react";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import Userbutton from "./Userbutton";
import Link from "next/link";
import {MessagesSquareIcon} from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import ProBanner from "./ProBanner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

async function Header() {

  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav
        className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900
      max-w-7xl mx-auto"
      >
        <Logo />

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* {LanguageSelect &&} */}

          {session ? (
            <>
              <Link href={"/chat"} prefetch={false}>
                <MessagesSquareIcon/>
              </Link>

              <CreateChatButton/>
            </>
          ) : (
            <>
              <Link href={"/pricing"}>
                Pricing
              </Link>
            </>
          )}

          <DarkModeToggle />
          <Userbutton session={session}/>
        </div>
      </nav>

      <ProBanner/>
    </header>
  );
}

export default Header;
