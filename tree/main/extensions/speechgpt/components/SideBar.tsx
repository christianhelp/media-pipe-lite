'use client'

import NewChat from "./NewChat";
import { signOut, useSession } from "next-auth/react";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, orderBy, query} from "firebase/firestore";
import {db} from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
function SideBar() {


  const {data: session} = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, "users", session?.user?.email!, "chats"),
    orderBy("createdAt", "asc"))
  );


  return <div className="flex flex-col h-screen p-2">
    <div className="flex-1">
      <div>
        
        {/* New Chat */}
        <NewChat />

        <div className="hidden sm:inline">
          <ModelSelection></ModelSelection>
        </div>

        <div className="flex flex-col space-y-2 my-2">

          {loading && (
            <div className="animate-pulse text-center text-white">
              <p>Loading Chats...</p>
              </div>
          )}

        {
          chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          )
        )
      }
        </div>


      
      </div>
    </div>

    {
      session && (
        // log out button
        <a onClick={() => signOut()} className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>Log out</a>
        
      )
    }
  </div>; 
}

export default SideBar;