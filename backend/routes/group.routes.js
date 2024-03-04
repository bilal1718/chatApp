import express from "express";
import {
  addMemberToGroup,
  allGroups,
  getGroupDetails,
  createGroup,
  getGroupMembers,
  getGroupMessages,
  removeMemberFromGroup,
  sendMessageToGroup
} from "../controllers/group.controller.js";

const router = express.Router();
router.get('/',allGroups)
router.post('/create', createGroup);
router.get('/:id', getGroupDetails);
router.post('/:id/members/add', addMemberToGroup);
router.post('/:id/members/remove', removeMemberFromGroup);
router.get('/:id/members', getGroupMembers);
router.post('/:groupId/messages/send/:userId', sendMessageToGroup);
router.get('/:id/messages', getGroupMessages);

export default router;
