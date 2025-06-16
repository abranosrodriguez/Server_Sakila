import { getIsOnQuery, setCurrentPage } from "./data.js";
export function createButton(btnFather, btnChild, nameId, nameText) {
    btnChild.setAttribute("id", nameId);
    btnChild.setAttribute("class", "btn btn-outline-secondary");
    btnChild.textContent = nameText;
    btnFather === null || btnFather === void 0 ? void 0 : btnFather.appendChild(btnChild);
}
export function createSelect() {
    const select = document.getElementById("buttonsFind");
    const btnSelect = document.createElement("select");
    btnSelect.setAttribute("id", "idSelect");
    btnSelect.setAttribute("class", "btn btn-secondary dropdown-toggle ");
    select === null || select === void 0 ? void 0 : select.appendChild(btnSelect);
}
export function removeData() {
    const btnSelect = document.getElementById("idSelect");
    btnSelect === null || btnSelect === void 0 ? void 0 : btnSelect.remove();
}
export function loadDataBtn(filmsData) {
    const arrData = Object.keys(filmsData[0]);
    const btnSelect = document.getElementById("idSelect");
    for (let key of arrData) {
        const option = document.createElement("option");
        option.value = key;
        option.text = key;
        btnSelect === null || btnSelect === void 0 ? void 0 : btnSelect.appendChild(option);
    }
}
export function loadDataSelect(filmsData) {
    removeData();
    createSelect();
    loadDataBtn(filmsData);
}
export function createButtonsContainer() {
    const btns = document.getElementById("buttons");
    const btnsFind = document.getElementById("buttonsFind");
    const btnsClear = document.getElementById("buttonsClear");
    const conBtnSession = document.getElementById("containCloseSession");
    const btnFilm = document.createElement("button");
    const btnQuery = document.createElement("button");
    const btnFind = document.createElement("button");
    const btnInput = document.createElement("input");
    const btnClean = document.createElement("button");
    const btnCloseSession = document.createElement("button");
    btnInput.setAttribute("type", "text");
    createButton(btns, btnFilm, "btnFilm", "Botón Film");
    createButton(btns, btnQuery, "btnQuery", "Botón Query");
    createSelect();
    createButton(btnsFind, btnInput, "btnInput", "");
    createButton(btnsFind, btnFind, "btnFind", "Buscar");
    createButton(btnsClear, btnClean, "btnClean", "Limpiar");
    createButton(conBtnSession, btnCloseSession, "btnCloseSession", "Cerrar Sesión");
    btnClean.classList.add("btn", "btn-outline-danger");
    btnFind.classList.add("btn", "btn-outline-success");
}
export function renderFilms(filmsData, currentPage, pageSize) {
    const app = document.getElementById("app");
    if (!app || filmsData.length === 0)
        return;
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = filmsData.slice(startIndex, startIndex + pageSize);
    const keys = Object.keys(paginated[0]);
    app.innerHTML = `
    <table class="table table-bordered table-hover table-primary" id="tableFilm">
      <thead class="table-secondary">
        <tr>
          ${keys
        .map((key) => `<th style="text-align:center; vertical-align:middle;">${key}</th>`)
        .join("")}
        </tr>
      </thead>
      <tbody>
        ${paginated
        .map((film) => `
          <tr style="text-align:center;">
            ${keys
        .map((k) => { var _a; return `<td>${(_a = film[k]) !== null && _a !== void 0 ? _a : ""}</td>`; })
        .join("")}
          </tr>
        `)
        .join("")}
      </tbody>
    </table>
    <div id="pagination" class="d-flex justify-content-center mt-3"></div>
  `;
}
export function renderQuery(filmsData, currentPage, pageSize) {
    const app = document.getElementById("app");
    if (!app || filmsData.length === 0)
        return;
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = filmsData.slice(startIndex, startIndex + pageSize);
    app.innerHTML = `
    <table class="table table-bordered table-hover table-primary" id="tableFilm">
      <thead class="table-secondary">
        <tr><th>Categoría</th><th>Duración Media</th></tr>
      </thead>
      <tbody>
        ${paginated
        .map((film) => `
          <tr>
            <td>${film.categoria}</td>
            <td>${film.duracion_media}</td>
          </tr>
        `)
        .join("")}
      </tbody>
    </table>
    <div id="pagination" class="d-flex justify-content-center mt-3"></div>
  `;
}
export function renderPagination(filmsData, currentPage, pageSize) {
    const paginationDiv = document.getElementById("pagination");
    if (!paginationDiv)
        return;
    const totalPages = Math.ceil(filmsData.length / pageSize);
    const maxVisible = 7;
    let buttons = "";
    if (currentPage > 1) {
        buttons += `<button class="btn btn-outline-primary me-2" data-page="1">1</button>`;
    }
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        buttons += `<button class="btn ${i === currentPage ? "btn-secondary" : "btn-outline-secondary"} me-1" data-page="${i}">${i}</button>`;
    }
    if (currentPage < totalPages && endPage < totalPages) {
        buttons += `<button class="btn btn-outline-primary ms-2" data-page="${totalPages}">${totalPages}</button>`;
    }
    paginationDiv.innerHTML = buttons;
    paginationDiv.querySelectorAll("button[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const page = Number(btn.getAttribute("data-page"));
            if (!isNaN(page)) {
                setCurrentPage(page);
                if (getIsOnQuery() === "qCategory") {
                    renderQuery(filmsData, page, pageSize);
                }
                else {
                    renderFilms(filmsData, page, pageSize);
                }
                renderPagination(filmsData, page, pageSize); // 👈 ¡IMPORTANTE!
            }
        });
    });
}
