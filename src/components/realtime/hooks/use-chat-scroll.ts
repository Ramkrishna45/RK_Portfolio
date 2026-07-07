import { useRef, useCallback, useEffect } from "react";

export function useChatScroll(
  isOpen: boolean,
  msgsLength: number,
  currentUserId?: string,
  lastMsgSessionId?: string,
  firstMsgId?: string
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior
      });
      isAtBottomRef.current = true;
    }
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    isAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 50;
  }, []);
  
  useEffect(() => {
    if (isOpen && isAtBottomRef.current) {
      scrollToBottom();
    }
  }, [isOpen, msgsLength, scrollToBottom]);

  return { scrollRef, isAtBottomRef, scrollToBottom, handleScroll };
}
