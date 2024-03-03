import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const AddGroupForm = ({ onSubmit, onClose }) => {
  const [groupTitle, setGroupTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend API to create a new group
      const response = await axios.post('/api/groups/create', {
        name: groupTitle,
      });

      // Check if the request was successful
      if (response.data.success) {
        // Call the parent onSubmit function with the group title
        onSubmit(groupTitle);
        // Clear the input after submission
        setGroupTitle('');
      } else {
        // Handle any errors or display a message to the user
        console.error('Error creating group:', response.data.error);
      }
    } catch (error) {
      console.error('Error creating group:', error.message);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 mx-auto p-4 bg-white rounded-t-lg">
      <button type="button" className="float-right text-gray-600" onClick={handleClose}>
        <span aria-hidden="true">&times;</span>
      </button>
      <label className="block mb-2 text-gray-800">Group Title:</label>
      <input
        type="text"
        value={groupTitle}
        onChange={(e) => setGroupTitle(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter group title"
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">Create Group</button>
    </form>
  );
};

export default AddGroupForm;
