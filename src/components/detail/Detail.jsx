import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import "./detail.css";
import { useUserStore } from "../../lib/userStore";

const Detail = () => {
	const {chatId,user,isCurrentUserBlocked,isReceiverBlocked,changeBlock} = useChatStore();
	
  const { currentUser } = useUserStore();
	
	const handleBlock = async() =>{
		if(!user) return;
		const userDocRef = doc(db,"users",currentUser.id)
		try {
			await updateDoc(userDocRef,{
				blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
			});
			changeBlock()
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="detail">
			<div className="user">
				<img src={user?.avatar || "./avatar.png"} alt="" />
				<h2>{user?.username}</h2>
				<p className="ffs">The Drop Down options are under Development</p>
				<p>Block User & LogOut Options Work.</p>
			</div>
			<div className="info">
				<div className="option">
					<div className="title">
						<span>Chat Settings</span>
						<img src="./arrowDown.png" alt="" />
					</div>
				</div>
				<div className="option">
					<div className="title">
						<span>Privacy & Help</span>
						<img src="./arrowDown.png" alt="" />
					</div>
				</div>
				<div className="option">
					<div className="title">
						<span>Shared Photos</span>
						<img src="./arrowDown.png" alt="" />
					</div>	
				</div>
				<div className="option">
					<div className="title">
						<span>Shared Files </span>
						<img src="./arrowDown.png" alt="" />
					</div>
				</div>
				<button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
				<button className="logout" onClick={() =>auth.signOut()}>Log Out</button>
			</div>
		</div>
	);
}

export default Detail;
