import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return { username: "" };
  },
  actions: {
    login(username: string) {
      this.username = username;
    },
  },
});
