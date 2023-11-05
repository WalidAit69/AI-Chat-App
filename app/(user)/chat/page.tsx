import ChatList from "@/components/Chats/ChatList";
import ChatPermissionError from "@/components/Chats/ChatPermissionError";

type ChatsPageProps = {
  params: {};
  searchParams: {
    error: string;
  };
};

function ChatsPage({ searchParams: { error } }: ChatsPageProps) {
  return (
    <div className="">
      {error && (
        <div className="m-2">
          <ChatPermissionError/>
        </div>
      )}

      <ChatList />
    </div>
  );
}

export default ChatsPage;
