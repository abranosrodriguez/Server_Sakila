import { panelLogin } from "./login/panelLogin.js";
import { createButtons } from "./login/createElements.js";
import { setupFormListener } from "./login/handleSubmit.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginPanel = document.getElementById("loginPanel");
  if (loginPanel) {
    panelLogin();
    createButtons();
    setupFormListener();
  }
});
