import { useContext, useState } from 'react';
import { RoomDataContext } from "../Contexts/RoomDataContext";

export function RoomList() {
  const roomsContext = useContext(RoomDataContext);
  
  const rooms = roomsContext?.rooms || [];
   
  if (rooms?.length === 0) return <p>Sorry, you arent in any groups</p>;

  return (
    <section className='rooms-list'>
      {
        rooms.map(room => (
          <p key={room._id}> { room.name }</p>
        ))
      }
    </section>
  );

}