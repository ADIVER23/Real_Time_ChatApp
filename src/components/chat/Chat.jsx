import { useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

function Chat() {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("");
	// console.log("text", text);
	const handleEmoji = (e) => {
		setText((prev) => prev + e.emoji);
		setOpen(false);
	};

	return (
		<div className="chat">
			<div className="top">
				<div className="user">
					<img src="./avatar.png" alt="" />
				</div>
				<div className="texts">
					<span>Aditya Verma</span>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</div>
				<div className="icons">
					<img src="./phone.png" alt="" />
					<img src="./video.png" alt="" />
					<img src="./info.png" alt="" />
				</div>
			</div>
			<div className="centre">
				<div className="message">
					<img src="./avatar.png" alt="" />
					<div className="texts">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
							illo!
						</p>
            <span>
              1 min ago
            </span>
					</div>
				</div>
				<div className="message own">
					<div className="texts">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
							illo!
						</p>
            <span>
              1 min ago
            </span>
					</div>
				</div>
				<div className="message">
					<img src="./avatar.png" alt="" />
					<div className="texts">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
							illo!
						</p>
            <span>
              1 min ago
            </span>
					</div>
				</div>
				<div className="message own">
					<div className="texts">
            <img src="../../../public/bg2.jpg" alt="" />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
							illo!
						</p>
            <span>
              1 min ago
            </span>
					</div>
				</div>
			</div>
			<div className="bottom">
				<div className="icons">
					<img src="./img.png" alt="" />
					<img src="./camera.png" alt="" />
					<img src="./mic.png" alt="" />
				</div>
				<input
					type="text"
					placeholder="Type a message..."
					onChange={(e) => setText(e.target.value)}
					value={text}
				/>
				<div className="emoji">
					<img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />
					<div className="picker">
						<EmojiPicker open={open} onEmojiClick={handleEmoji} />
					</div>
				</div>
				<button className="sendButton">Send</button>
			</div>
		</div>
	);
}

export default Chat;
