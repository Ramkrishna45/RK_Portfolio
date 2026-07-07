import { useState, useCallback, useEffect } from "react";
import type { Socket } from "socket.io-client";
import type { User } from "@/contexts/socketio";

export function useTyping(
  socket: Socket | null,
  currentUser: User | null,
  scrollToBottom: (behavior?: ScrollBehavior) => void,
  isAtBottomRef: React.MutableRefObject<boolean>
) {
  const [typingUsers, setTypingUsers] = useState<User[]>([]);

  const handleTyping = useCallback(() => {
    if (!socket || !currentUser) return;
    socket.emit("typing", currentUser);
  }, [socket, currentUser]);

  useEffect(() => {
    if (!socket) return;
    const onTyping = (users: User[]) => {
      setTypingUsers(users);
      if (isAtBottomRef.current) {
        scrollToBottom();
      }
    };
    socket.on("typing", onTyping);
    return () => {
      socket.off("typing", onTyping);
    };
  }, [socket, scrollToBottom, isAtBottomRef]);

  return { typingUsers, handleTyping };
}
