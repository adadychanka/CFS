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
    const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;

    if (!socketURL || !data?.user?.token || data.user.role === "USER") {
      socket?.disconnect();
      setSocket(null);
      return;
    }

    const s = io(process.env.NEXT_PUBLIC_BACKEND_API, {
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
