import ChatList from "@/components/Chats/ChatList";
import ChatPermissionError from "@/components/Chats/ChatPermissionError";
import GlowingBlob from "@/components/GlowingBlob";

type ChatsPageProps = {
  params: {};
  searchParams: {
    error: string;
  };
};

function ChatsPage({ searchParams: { error } }: ChatsPageProps) {
  return (
    <div className="relative">
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}

      <GlowingBlob />
      <ChatList />
    </div>
  );
}

export default ChatsPage;
