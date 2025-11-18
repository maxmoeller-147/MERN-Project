import Message from "./Message";
import React, { useEffect, useState } from "react";
import api from "../api";

//Import all basic profiles
import ProfileBored from "../assets/Default_profiles/Profile_bored.png";
import ProfileGlee from "../assets/Default_profiles/Profile_glee.png";
import ProfileLook from "../assets/Default_profiles/Profile_look.png";
import ProfileNeutral from "../assets/Default_profiles/Profile_netrual.png";
import ProfileSmile from "../assets/Default_profiles/Profile_smile.png";
import ProfileSpeed from "../assets/Default_profiles/Profile_Speed.png";

export default function RoomMessages({ socket }) {

    const [loadedUserInfo, setloadedUserInfo] = useState([]);
    const [loadedMessages, setLoadedMessages] = useState([]);

    const defaultImages = [
        ProfileBored,
        ProfileGlee,
        ProfileLook,
        ProfileNeutral,
        ProfileSmile,
        ProfileSpeed
    ];

    const getRandomProfile = () => {
        return defaultImages[Math.floor(Math.random() * defaultImages.length)];
    };

    useEffect(() => { 
        const handleRoomMessage = (msg) => {
            setLoadedMessages(prevMessages => [...prevMessages, msg]);

            const findUser = loadedUserInfo.some(user => user.id === msg.senderId) 

            if (findUser){ return }

            let defaultUserInfo = {
                id : msg.senderId,
                username: `User${msg.senderId.slice(msg.senderId.length-4,msg.senderId.length)}`,
                image : getRandomProfile()
            }

            try{
                api.get(`profiles/${msg.senderId}`).then((response) => {
                    if (response.data.error) throw response.data.error;

                    // If profile is found replace default info
                    defaultUserInfo.username = response.data.username;

                    if (response.data?.image){
                        defaultUserInfo.image = response.data.image;
                    }
                })
            }catch(error){
                console.log(`Couldnt find participants profile ${error}`);
            }  

            setloadedUserInfo(prevUsers => [...prevUsers, defaultUserInfo]);

        };

        socket.on("roomMessage", handleRoomMessage); 

        const handleRestore = ((messageHistory) => {
            messageHistory.forEach(msg => {
                handleRoomMessage(msg)
            });
        });
        //Restore chat history after joining room
        socket.on('restoreChatHistory', handleRestore);


        //Unmount the socket listen here
        return () => { 
            socket.off("roomMessage",handleRoomMessage); 
            socket.off("restoreChatHistory", handleRestore);
        };
    }, [socket]); //retrigger whenever socket changes (to remount the listeners)

    return (
        <div className="message-container"> 
            {loadedMessages.map((msg, index)=>(
                <Message key={index} message={msg} user={loadedUserInfo.find(user => user.id === msg.senderId) 
}/>
            ))}
            
        </div>
    );
}