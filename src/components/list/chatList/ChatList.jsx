import { useState } from 'react'
import './chatList.css'

function ChatList(){
  const [addMode,setaddMode]  = useState(false);

  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <img src="./search.png" alt="" />
          <input type="text" placeholder='search'/>
        </div>
        <img src={addMode? "./minus.png" :"./plus.png"} alt="" className='add' onClick={() => setaddMode(!addMode)}/>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Aditya verma</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Aditya verma</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Aditya verma</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default ChatList