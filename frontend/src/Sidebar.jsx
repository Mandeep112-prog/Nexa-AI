import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v4 as uuidv4 } from 'uuid';

export default function Sidebar(){
    const {allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChat} = useContext(MyContext);

    const getAllThreads = async () =>{
        try{
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filterData = res.map(thread=>({thread : thread.threadId, title :thread.title}));
            // console.log(filterData);
            setAllThreads(filterData);
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getAllThreads();
    },[currThreadId]);

    const createNewChat = ()=>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv4());
        setPrevChat([]);
    }

    const changeThread = async (newThreadId)=>{
        setCurrThreadId(newThreadId);
        try{
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            setPrevChat(res);
            setNewChat(false);
            setReply(null);
        }catch(err){
            console.log(err);
        }
    }
    const deleteThread =async (threadId)=>{
        try{
           const response = await fetch(`http://localhost:8080/api/thread/${threadId}`,{method:"DELETE"});
           const res = await response.json();
           console.log(res);

           setAllThreads(prev=>prev.filter(thread=> thread.thread !== threadId));
           if(threadId === currThreadId){
            createNewChat();
           }

        }catch(err){
            console.log(err);
        }
    }
    return (
       <section className="sidebar">
       
        <button onClick={createNewChat}>
            <img src="src/assets/blacklogo.png" alt="chatGPT logo" className="logo"></img>
           <span> <i className="fa-solid fa-pen-to-square"></i></span>
        </button>

        <ul className="history">
            {allThreads?.map((thread,idx)=>(
                <li key={idx} onClick={()=>changeThread(thread.thread)}
                className={thread.thread === currThreadId ? "highlighted" : ""}
                >{thread.title}
                <i className="fa-solid fa-trash" onClick={(e)=>{e.stopPropagation(); deleteThread(thread.thread)}}></i>
                </li>
            ))}
        </ul>

        <div className="sign">
            <p>By Mandeep &hearts;</p>
        </div>
       </section>
    )
}