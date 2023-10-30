import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@logos/logo.svg";
import { AspectRatio } from "../ui/aspect-ratio";

function Logo() {
  return (
    <Link href={"/"} className="overflow-hidden" prefetch={false}>
      <div className="w-72 h-14 flex items-center">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <Image
          priority
          alt="logo"
          src={logo}
          className="dark:filter dark:invert"
          ></Image>
        </AspectRatio>
      </div>
    </Link>
  );
}

export default Logo;
