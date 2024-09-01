import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
	arrayUnion,
	doc,
	getDoc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

function Chat() {
	const [chat, setChat] = useState();
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("");
	const [img, setImg] = useState({
		file:null,
		url:""
	});
	const { currentUser } = useUserStore();
	const { chatId,isCurrentUserBlocked,isReceiverBlocked, user } = useChatStore();

	const endRef = useRef(null);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
			setChat(res.data());

		});
		return () => {
			// console.log("Chats message: ",chat.messages)
			unSub();
		};
	}, [chatId]);
	// console.log(chat)

	const handleEmoji = (e) => {
		setText((prev) => prev + e.emoji);
		setOpen(false);
	};

	const handleImage = (e) =>{
    if(e.target.files[0]){

      setImg({
        file:e.target.files[0],
        url:URL.createObjectURL(e.target.files[0])
      })
    }
  }

	const handleSend = async () => {
		if (text === "") return;

		let imgUrl = null
		try {

			if(img.file){
				imgUrl = await upload(img.file)
			}

			await updateDoc(doc(db, "chats", chatId), {
				messages: arrayUnion({
					senderId: currentUser.id,
					text,
					createdAt: new Date(),
					...(imgUrl && { img:imgUrl }),
				}),
			});
			const userIDs = [currentUser.id, user.id];
			userIDs.forEach(async (id) => {
				const userChatsRef = doc(db, "userchats", id);
				const userChatsSnapshot = await getDoc(userChatsRef);
				if (userChatsSnapshot.exists()) {
					const userChatsData = userChatsSnapshot.data();

					const chatIndex = userChatsData.chats.findIndex(
						(c) => c.chatId === chatId
					);
					userChatsData.chats[chatIndex].lastMessage = text;
					userChatsData.chats[chatIndex].isSeen =
						id === currentUser.id ? true : false;
					userChatsData.chats[chatIndex].updatedAt = Date.now();

					await updateDoc(userChatsRef, {
						chats: userChatsData.chats,
					});
				}
			});
		} catch (error) {
			console.log("Error: ", error);
		}finally{
			setImg({
				file: null,
				url: "",
			});
	
			setText("");
			}
	};

	return (
		<div className="chat">
			<div className="top">
				<div className="user">
					<img src={user?.avatar || "./avatar.png"} alt="" />
				</div>
				<div className="texts">
					<span>{user?.username}</span>
					<p>Developed By Aditya Verma</p>
				</div>
				<div className="icons">
					<img src="./phone.png" alt="" />
					<img src="./video.png" alt="" />
					<img src="./info.png" alt="" />
				</div>
			</div>
			<div className="center">
				{chat?.messages?.map((message) => (
					<div className={message?.senderId === currentUser?.id ? "message own" : "message"} key={message?.createdAt}>
						<div className="texts">
							{message?.img && <img src={message?.img} alt="" />}
							<p>{message.text}</p>
							{/* <span>
              1 min ago
            </span>  */}
						</div>
					</div>
				))}
				{img.url && (
					<div className="message own">
						<div className="texts">

						<img src={img.url} alt="" />
						</div>
				</div>)}
				{/* <div>cd</div	> */}
				<div ref={endRef}></div>
			</div>
			<div className="bottom">
				<div className="icons">
					<label htmlFor="file">
						<img src="./img.png" alt="" />
					</label>
					<input type="file" id="file" style={{display:"none"}} onChange={handleImage}/>
					<img src="./camera.png" alt="" />
					<img src="./mic.png" alt="" />
				</div>
				<input
					type="text"
					placeholder={isCurrentUserBlocked || isReceiverBlocked? "You are blocked":"Type a message..."}
					onChange={(e) => setText(e.target.value)}
					value={text}
					disabled={isCurrentUserBlocked || isReceiverBlocked}
				/>
				<div className="emoji">
					<img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />
					<div className="picker">
						<EmojiPicker open={open} onEmojiClick={handleEmoji} />
					</div>
				</div>
				<button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>
					Send
				</button>
			</div>
		</div>
	);
}

export default Chat;
