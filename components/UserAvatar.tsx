import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

function UserAvatar({
  name,
  image,
  classname,
}: {
  name: string | null;
  image: string | null;
  classname?: string;
}) {
  return (
    <Avatar className={cn("bg-white text-black", classname)}>
      {image && (
        <Image
          src={image}
          alt={name || "User Name"}
          width={40}
          height={40}
          className="rounded-full"
        ></Image>
      )}
      <AvatarFallback 
      delayMs={1000}
      className="dark:bg-white dark:text-black bg-black text-white text-lg">
        {name && name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
