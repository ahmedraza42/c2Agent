import { useEffect, useState } from "react";
import { getItemFromStorage } from "./utils/storage";

export const useCurrentUser = () => {
    const [id, setID] = useState('');
    const [email, setEmail] = useState('');
  
    const getUserFromStorage=async()=>{
        const currentUser= await getItemFromStorage('current_user')   
        console.log({currentUser})
        setID(currentUser.id)
        setEmail(currentUser.emailAddress)
    }
  
    useEffect(() => {
        getUserFromStorage();
    }, []);
  
    return { id, email };
  };