"use client";

import useAdminId from "@/hooks/useAdminId";
import { ChatMembers, chatMembersRef } from "@/lib/converters/ChatMembers";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "../LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "../UserAvatar";

function Chatmemberbadge({ chatId }: { chatId: string }) {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  const adminId = useAdminId({ chatId });

  if (loading && !members)
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    !loading && (
      <div className="border m-5 p-2 rounded-xl">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
          {members?.map((member) => (
            <Badge variant={"secondary"} key={member.email} className="flex h-14 p-5 pl-2 pr-5 space-x-2">
              <div className="flex items-center space-x-2">
                <UserAvatar image={member.image} name={member.email} />
              </div>

              <div>
                <p>{member.email}</p>
                {member.userId === adminId && <p className="text-indigo-400 animate-pulse">Admin</p>}
              </div>
            </Badge>
          ))}
        </div>
      </div>
    )
  );
}

export default Chatmemberbadge;
