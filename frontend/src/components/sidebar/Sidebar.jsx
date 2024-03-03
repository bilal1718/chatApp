import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import AddGroupButton from "./AddGroupButton";
import Groups from "./Groups";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 w-[400px] p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<Groups />
			<div
      className='fixed bottom-10 left-10 flex space-x-6'
    >
		<LogoutButton />
		<AddGroupButton />
	</div>
		</div>
	);
};
export default Sidebar;
