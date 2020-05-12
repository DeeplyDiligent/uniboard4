import React, { Component, useEffect, useState } from 'react';
import database from '../../../data/main';
const NewMsgCounter = ({channelId}) => {
    let [hasUnreads, setHasUnreads] = useState(false)
    useEffect(()=>{
        if(channelId){
            database.getLastMessageTime(channelId).then((timeOfLastMessage)=>{
                database.observeLastActiveTime(channelId, (lastActiveTime)=>{
                    setHasUnreads(timeOfLastMessage > new Date(lastActiveTime||new Date('1997-07-16T19:20:30+01:00').toISOString()))
                })
            });
        }
    },[])
    if(!hasUnreads) return null
    return ( <div className="px-1 leading-tight flex justify-center items-center bg-red-100 font-bold rounded-full text-red-700 mx-1">1+</div> );
}
 
export default NewMsgCounter;