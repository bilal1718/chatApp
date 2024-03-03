// GroupMessages.jsx
import { useEffect, useRef } from "react";
import useGetGroupMessages from "../../hooks/useGetGroupMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import GroupMessage from "./groupMessage";
import useListenMessages from "../../hooks/useListenMessages";

const GroupMessages = () => {
  const { groupMessages, loading: messagesLoading } = useGetGroupMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [groupMessages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!messagesLoading && groupMessages?.messages?.length > 0 ? (
        groupMessages.messages.map((message, index) => (
          <div key={message._id} ref={index === groupMessages.messages.length - 1 ? lastMessageRef : null}>
            <GroupMessage message={message} />
          </div>
        ))
      ) : (
        <p className='text-center'>
          {messagesLoading ? "Loading messages..." : "Send a message to start the conversation"}
        </p>
      )}

      {messagesLoading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
    </div>
  );
};

export default GroupMessages;
