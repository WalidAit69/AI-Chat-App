import DeleteChat from "./DeleteChat"
import InviteUser from "./InviteUser"


function AdminControls({chatId} : {chatId:string}) {
  return (
    <div className="flex flex-col items-center gap-y-2 sm:flex-row sm:justify-end md:space-x-2 m-5 mb-0">
        <InviteUser chatId={chatId}/>

        <DeleteChat chatId={chatId}/>
    </div>
  )
}

export default AdminControls