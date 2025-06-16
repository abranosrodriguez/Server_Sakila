export function handleBtnCloseSession() {
    var _a;
    (_a = document.getElementById("btnCloseSession")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        fetch("/logout", { method: "POST" }).then(() => {
            window.location.href = "/index.html";
        });
    });
}
