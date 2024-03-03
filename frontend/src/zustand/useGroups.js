import { create } from "zustand";

const useGroups = create((set) => ({
  selectedGroup: null,
  setSelectedGroup: (selectedGroup) => set({ selectedGroup, groupMessages: [], groupMembers: [] }),

  groupMessages: [],
  setGroupMessages: (groupMessages) => set({ groupMessages }),

  groupMembers: [],
  setGroupMembers: (groupMembers) => set({ groupMembers }),
}));

export default useGroups;
