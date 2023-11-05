import { authOptions } from '@/auth'
import AdminControls from '@/components/Chats/AdminControls';
import ChatInput from '@/components/Chats/ChatInput';
import ChatMessages from '@/components/Chats/ChatMessages';
import Chatmemberbadge from '@/components/Chats/Chatmemberbadge';
import { chatMembersRef } from '@/lib/converters/ChatMembers';
import { sortedMessagesRef } from '@/lib/converters/Message';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';


type Props = {
  params:{
    chatId:string
  }
}

async function ChatPage({params : {chatId}} : Props) {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  )

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs.map((doc) => doc.id).includes(session?.user.id!);

  if(!hasAccess) redirect("/chat?error=permission");
  
  return (
    <div className='flex flex-col justify-between h-full'>
        <AdminControls chatId={chatId}/>

        <Chatmemberbadge chatId={chatId}/>

        <div className='flex-1'>
          <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
          />
        </div>

        <ChatInput chatId={chatId}/>
    </div>
  )
}

export default ChatPage