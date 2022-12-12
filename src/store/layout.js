import { defineStore } from "pinia";

export default defineStore("PINIA_LAYOUT", {
  state() {
    return {
      isCollapse: false,
      menuBg: "#0b4577",
      isLayout: import.meta.env.VITE_ISLAYOUT === "true",
      menuWidth: "200px",
      innerWidth: window.innerWidth,
    };
  },
  actions: {
    windowWidth() {
      this.innerWidth = window.innerWidth;
    },
  },
});
