export function handleBtnCloseSession() {
  document.getElementById("btnCloseSession")?.addEventListener("click", () => {
    fetch("/logout", { method: "POST" }).then(() => {
      window.location.href = "/index.html";
    });
  });
}
