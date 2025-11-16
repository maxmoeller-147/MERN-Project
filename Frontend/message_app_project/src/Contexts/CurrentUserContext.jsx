import { createContext, useState } from "react";

export const CurrentUserContext = React.createContext();

export function CurrentUserProvider({children}) {
  const [currentUser, setCurrentUser] = useState("");

  
}