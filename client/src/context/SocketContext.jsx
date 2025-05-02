import { createContext, useContext, useRef, useEffect } from "react";
import io from "socket.io-client"; 

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(io()); // <-- Moved out of useEffect

  useEffect(() => {
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};


export const useSocket = () => useContext(SocketContext);
