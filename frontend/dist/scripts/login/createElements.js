export function createButtons() {
    createButton("containInputs", "input", "", "Host", "");
    createButton("containInputs", "input", "number", "Port", "3306");
    createButton("containInputs", "input", "", "DB", "");
    createButton("containInputs", "input", "", "User", "");
    createButton("containInputs", "input", "password", "Pass", "");
    createButton("conBtnEnter", "button", "submit", "Enter", "Enter");
}
function createButton(containFather, createType, setType, nameIdBtn, valueBtn) {
    let btnFather = document.getElementById(containFather);
    let btn = document.createElement(createType);
    btn.setAttribute("id", `id${nameIdBtn}`);
    btn.setAttribute("value", valueBtn);
    btn.setAttribute("type", setType);
    btn.setAttribute("class", "btn btn-outline-secondary");
    btn.textContent = valueBtn;
    btnFather === null || btnFather === void 0 ? void 0 : btnFather.appendChild(btn);
}
