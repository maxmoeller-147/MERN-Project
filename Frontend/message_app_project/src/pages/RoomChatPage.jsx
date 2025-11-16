import RoomChat from "../components/RoomChat";

export default function RoomChatPage() {
  const params = useParams();
  const userIdParams = params?.roomChatId || ""; 

  return (
    <main>
      <h1>Room chat</h1>
      <RoomChat />
    </main>
  )
}