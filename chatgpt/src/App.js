import './App.css';
import './normal.css';
import { useState } from 'react';

function App() {

  const [input,setInput]=useState("")
  const [chatlog,setChatLog]=useState([{user:"gpt",message:"how can i help you"},{user:"me",message:"i want to use chat gpt"}])


  async function handelSubmit(e){
    e.preventDefault()
    let chatLogNew=[...chatlog,{user:"me",message:`${input}`}]
    setInput("")
    setChatLog(chatLogNew)
    const messages=chatLogNew.map((message)=>message.message).join("\n")

    const response = await fetch("http://localhost:3080/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:messages
      })
    })
    const data = await response.json()
    setChatLog([...chatLogNew,{user:"gpt" , message:`${data.message}`}])
    console.log(data.message);
  }
  function clearChat(){
    setChatLog([])
  }
  return (
    <div className="App">
      <aside className='sidemenu'>
        <div className='side-menu-button' onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className='chatbox'>
        <div className='chat-log'>
          {chatlog.map((message,index)=>(
            <ChatMessage key={index} message={message}/>
          ))}

        </div>
        <div className='chat-input-holder'>
          <form onSubmit={handelSubmit}>
          <input rows="1" className='chat-input-textarea'
          value={input}
          onChange={(e)=>setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
    </div>
  );
}
const ChatMessage=({message})=>{
  return(
    <div className={`chat-message ${message.user==="gpt"&&"chatgpt"}`}>
      <div className='chat-message-center'>
        <div className={`avatar ${message.user==="gpt"&&"chatgpt"}`}>
          {message.user==="gpt"&&<img src='https://cdn.vox-cdn.com/thumbor/VUn58Srehbu5brDicV6QgNp8SM0=/0x0:1820x1213/1400x1400/filters:focal(910x607:911x608)/cdn.vox-cdn.com/uploads/chorus_asset/file/24247717/lp_logo_3.0.jpg'></img>}
        </div>
          <div className='message'>{message.message}</div>
      </div>
    </div>
  )
}
export default App;
