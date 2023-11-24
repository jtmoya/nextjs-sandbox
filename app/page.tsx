"use client"
import { useEffect, useState } from "react"
import { io as ClientIO } from "socket.io-client"

export default function Home() {
  const [ socket, setSocket ] = useState();
  const [ isConnected, setIsConnected ] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  return (
    <main className="flex flex-col min-h-screen p-4">
      {
        isConnected && <span className="rounded-lg bg-green-400 font-medium text-white px-4 py-2">Connected</span>
      }
      {
        !isConnected && <span className="rounded-lg bg-yellow-500 font-medium text-white px-4 py-2">Disconnected</span>
      }
      <h1>Hello</h1>
    </main>
  )
}
