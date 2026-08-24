import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import './App.css'
import { MyContext } from './MyContext'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId,setCurrThreadId] = useState(uuidv4());
  const [prevChat, setPrevChat] = useState([]);
  const [newChat,setNewChat] = useState(true);
  const [allThreads,setAllThreads] = useState([]);
  const ProviderValues = {
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    newChat,setNewChat,
    prevChat,setPrevChat,
    allThreads,setAllThreads,
  };
  return (
   <div className='app'>
    <MyContext.Provider value={ProviderValues}>
    <Sidebar/>
    <ChatWindow/>
    </MyContext.Provider>
   </div>
  )
}

export default App
