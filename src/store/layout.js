import { defineStore } from "pinia";

export default defineStore("PINIA_LAYOUT", {
  state() {
    return {
      isCollapse: false,
      menuBg: "#0b4577",
      isLayout: true,
      menuWidth: "200px",
    };
  },
});
