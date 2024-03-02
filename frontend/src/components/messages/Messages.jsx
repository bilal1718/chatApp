// Messages.js
import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
// import useGetImages from "../../hooks/useGetImages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading: messagesLoading } = useGetMessages();
//   const { images, loading: imagesLoading } = useGetImages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!messagesLoading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message  message={message} />
          </div>
        ))}

      {/* {!imagesLoading &&
        images.length > 0 &&
        images.map((image) => (
          <div key={image._id} ref={lastMessageRef}>
            <img src={`http://localhost:5000/${image.path}`} alt={image.name} />
          </div>
        ))} */}

      {(messagesLoading) && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!messagesLoading && messages.length === 0  && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
