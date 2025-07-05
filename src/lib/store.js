import { create } from "zustand";

const useGlobalStore = create((set) => ({
  AllQuestions: [],

  setAllQuestions: (questions) => set({ AllQuestions: questions }),
}));

export default useGlobalStore;
