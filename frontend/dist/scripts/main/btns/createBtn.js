export function createButton(btnFather, btnChild, nameId, nameText) {
    btnChild.setAttribute("id", nameId);
    btnChild.setAttribute("class", "btn btn-outline-secondary");
    btnChild.textContent = nameText;
    btnFather === null || btnFather === void 0 ? void 0 : btnFather.appendChild(btnChild);
}
