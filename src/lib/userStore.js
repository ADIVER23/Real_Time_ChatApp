import { doc, getDoc } from "firebase/firestore";
import { create }  from "zustand";  
import {db} from "./firebase"

export const useUserStore  = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async(uid) =>{
    if(!uid)return set({currentUser : null,isLoading:false});
    try {
      const docRef = doc(db, "users", uid);
      // console.log("docref:",docRef);
      
      const docSnap = await getDoc(docRef);
      // console.log("User: ",uid);
      
      if(docSnap.exists()){
        set({currentUser:docSnap.data(),isLoading:false})
      }else{
        set({currentUser:null,isLoading:false})
      }
    } catch (error) {
      console.log("Error: ",error);
      return set({currentUser:null,isLoading:false})
    }
  }
}))