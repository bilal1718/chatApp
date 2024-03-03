import Group from "../models/group.model.js";
import User from "../models/user.model.js";
export const allGroups=async (req,res)=>{
  try {
    const groups = await Group.find();
    return res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error('Error getting all groups:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
    export const createGroup= async (req, res) => {
      try {
        const { name } = req.body;
        const newGroup = new Group({ name, members: [], messages: [] });
        await newGroup.save();
        return res.status(201).json({ success: true, group: newGroup });
      } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };
    export const getGroupDetails= async (req, res) => {
      try {
        const groupId = req.params.id;
        console.log('Attempting to find group with ID:', groupId);
        const group = await Group.findById(groupId).populate('members', 'username'); // Populate members with their usernames
        if (!group) {
          return res.status(404).json({ success: false, error: 'Group not found' });
        }
  
        return res.status(200).json({ success: true, group });
      } catch (error) {
        console.error('Error getting group details:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };
  
    export const addMemberToGroup= async (req, res) => {
      try {
        const groupId = req.params.id;
        const { memberId } = req.body;
  
        // Check if the user exists
        const user = await User.findById(memberId);
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' });
        }
  
        // Check if the user is already a member of the group
        const group = await Group.findById(groupId);
        if (group.members.includes(memberId)) {
          return res.status(400).json({ success: false, error: 'User is already a member of the group' });
        }
  
        group.members.push(memberId);
        await group.save();
  
        return res.status(200).json({ success: true, group });
      } catch (error) {
        console.error('Error adding member to group:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };
  
    export const removeMemberFromGroup= async (req, res) => {
      try {
        const groupId = req.params.id;
        const { memberId } = req.body;
  
        const group = await Group.findById(groupId);
        if (!group) {
          return res.status(404).json({ success: false, error: 'Group not found' });
        }
        // Check if the user is a member of the group
        if (!(group.members.includes(memberId))) {
          return res.status(400).json({ success: false, error: 'User is not a member of the group' });
        }
        // Remove the user from the group
        group.members = group.members.filter((member) => member.toString() !== memberId);
        await group.save();
        return res.status(200).json({ success: true, group });
      } catch (error) {
        console.error('Error removing member from group:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };
    export const getGroupMembers= async (req, res) => {
      try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId).populate('members', 'username'); // Populate members with their usernames
        if (!group) {
          return res.status(404).json({ success: false, error: 'Group not found' });
        }
        return res.status(200).json({ success: true, members: group.members });
      } catch (error) {
        console.error('Error getting group members:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };
    export const sendMessageToGroup = async (req, res) => {
        try {
          const groupId = req.params.groupId;
          const { text } = req.body;
          const group = await Group.findById(groupId);
      
          if (!group) {
            return res.status(404).json({ success: false, error: 'Group not found' });
          }
      
          const senderId = req.params.userId; // Using req.params.userId to get the user ID
          if (!group.members.includes(senderId)) {
            return res.status(403).json({ success: false, error: 'Sender is not a member of the group' });
          }
      
          const message = { sender: senderId, text };
          group.messages.push(message);
          await group.save();
      
          return res.status(200).json({ success: true, message, group });
        } catch (error) {
          console.error('Error sending message to group:', error);
          return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
      };
    export const getGroupMessages= async (req, res) => {
      try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId);
        if (!group) {
          return res.status(404).json({ success: false, error: 'Group not found' });
        }
        return res.status(200).json({ success: true, messages: group.messages });
      } catch (error) {
        console.error('Error getting group messages:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };