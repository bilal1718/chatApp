import Sidebar2 from "../../components/sidebar/Sidebar2";
import MessageContainer from "../../components/messages/MessageContainer";

const Home2 = () => {
  return (
<div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
      <Sidebar2/>
	  <MessageContainer />
    </div>
    </div>
  );
};

export default Home2;
