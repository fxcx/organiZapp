import ChatSideBar from '@/components/Chat/chat-sidebar'

export default function ChatLayaut ({children}) {
    return(
        <>
        <ChatSideBar/>
        {children}
        </>
    )
}