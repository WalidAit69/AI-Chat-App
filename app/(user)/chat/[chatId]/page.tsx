import { authOptions } from '@/auth'
import ChatInput from '@/components/Chats/ChatInput';
import ChatMessages from '@/components/Chats/ChatMessages';
import { sortedMessagesRef } from '@/lib/converters/Message';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth'


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
  return (
    <div className=''>
        {/* {admin controls} */}

        {/* {Chatmember badge} */}

        {/* {chatMessages} */}
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