import React from 'react';
import useGetGroups from '../../hooks/useGetGroups.js';
// import { useSocketContext } from '../../context/SocketContext';
import useGroups from '../../zustand/useGroups.js';

const Groups = () => {
  const { loading, groups } = useGetGroups();
  const { selectedGroup, setSelectedGroup } = useGroups();
  // const { onlineUsers } = useSocketContext();

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {Array.isArray(groups.groups) ? (
        groups.groups.map((group) => (
          <div
            key={group._id}
            className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
              selectedGroup?._id === group._id ? 'bg-sky-500' : ''
            }`}
            onClick={() => setSelectedGroup(group)}
          >
            {/* ${onlineUsers.includes(group._id) ? 'online' : '' */}
            <div className={`avatar }`}>
              <div className='w-12 rounded-full'>
                {/* You may need to adjust this based on how the group's profilePic is stored */}
                {/* <img src={group.profilePic} alt='group avatar' /> */}
                <span className='text-xl'>👥</span>
              </div>
            </div>

            <div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{group.name}</p>
						{/* <span className='text-xl'>{emoji}</span> */}
            <span className='text-xl'>👥</span>
					</div>
				</div>
			</div>
        ))
      ) : (
        <span>No groups available</span>
      )}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
};

export default Groups;
