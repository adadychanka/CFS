"use client";

import { io, Socket } from "socket.io-client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";

const SocketContext = createContext<Socket | null>(null);

type Props = {
  children: ReactNode;
};

const SocketProvider = ({ children }: Props) => {
  const { data } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!data?.user?.token) {
      socket?.disconnect();
      setSocket(null);
      return;
    }

    const s = io("http://16.16.26.38:3000/", {
      transports: ["websocket"],
      auth: { token: data.user.token },
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [data?.user?.token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};

export default SocketProvider;
