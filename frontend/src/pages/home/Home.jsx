import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import GroupMessageContainer from "../../components/groupMessages/groupMessageContainer";

const Home = () => {
  return (
<div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
      <Sidebar />
	  <GroupMessageContainer />
    </div>
    </div>
  );
};

export default Home;
