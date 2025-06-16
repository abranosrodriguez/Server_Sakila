import { getIsOnQuery, setCurrentPage } from "./data.js";
import { createButton } from "./btns/createBtn.js";
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
    const btnCustomQuery = document.createElement("button");
    const btnFind = document.createElement("button");
    const btnInput = document.createElement("input");
    const btnClean = document.createElement("button");
    const btnCloseSession = document.createElement("button");
    btnInput.setAttribute("type", "text");
    createButton(btns, btnFilm, "btnFilm", "Botón Film");
    createButton(btns, btnQuery, "btnQuery", "Botón Query");
    createButton(btns, btnCustomQuery, "btnCustomQuery", "Botón Custom Query");
    createSelect();
    createButton(btnsFind, btnInput, "btnInput", "");
    createButton(btnsFind, btnFind, "btnFind", "Buscar");
    createButton(btnsClear, btnClean, "btnClean", "Limpiar");
    createButton(conBtnSession, btnCloseSession, "btnCloseSession", "Cerrar Sesión");
    btnClean.classList.add("btn", "btn-outline-danger");
    btnCloseSession.classList.add("btn", "btn-outline-dark");
    btnFind.classList.add("btn", "btn-outline-success");
}
export function buttonCustomQuery() {
    const containerBtn = document.getElementById("buttonsCustomQuery");
    const btnInput = document.createElement("textarea");
    const btnFind = document.createElement("button");
    createButton(containerBtn, btnInput, "btnInputCustomQuery", "");
    btnInput.setAttribute("rows", "3");
    btnInput.setAttribute("cols", "80");
    createButton(containerBtn, btnFind, "btnFindCustomQuery", "Query");
}
// ✅ NUEVA FUNCIÓN UNIFICADA
export function renderTable(data, currentPage, pageSize, renderHeader, renderRow) {
    const app = document.getElementById("app");
    if (!app || data.length === 0)
        return;
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = data.slice(startIndex, startIndex + pageSize);
    const header = renderHeader(paginated[0]);
    const rows = paginated.map(renderRow).join("");
    app.innerHTML = `
    <table class="table table-bordered table-hover table-primary" id="tableFilm">
      <thead class="table-secondary">
        <tr>${header}</tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <div id="pagination" class="d-flex justify-content-center mt-3"></div>
  `;
}
// 🎯 FUNCIONES DE USO
export function renderDataTable(filmsData, currentPage, pageSize) {
    renderTable(filmsData, currentPage, pageSize, (film) => Object.keys(film)
        .map((key) => `<th style="text-align:center; vertical-align:middle;">${key}</th>`)
        .join(""), (film) => `<tr style="text-align:center;">
        ${Object.keys(film)
        .map((k) => { var _a; return `<td>${(_a = film[k]) !== null && _a !== void 0 ? _a : ""}</td>`; })
        .join("")}
      </tr>`);
}
export function renderQuery(filmsData, currentPage, pageSize) {
    renderTable(filmsData, currentPage, pageSize, () => `<th>Categoría</th><th>Duración Media</th>`, (film) => `<tr>
        <td>${film.categoria}</td>
        <td>${film.duracion_media}</td>
      </tr>`);
}
// PAGINACIÓN (sin cambios)
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
                else if (getIsOnQuery() === "qCustomQuery") {
                    renderDataTable(filmsData, page, pageSize);
                }
                else {
                    renderDataTable(filmsData, page, pageSize);
                }
                renderPagination(filmsData, page, pageSize);
            }
        });
    });
}
export function renderCustomData(data, currentPage, pageSize) {
    if (!data.length) {
        document.getElementById("app").innerHTML =
            "<p>No hay datos para mostrar.</p>";
        return;
    }
    const keys = Object.keys(data[0]);
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = data.slice(startIndex, startIndex + pageSize);
    const header = keys.map((key) => `<th>${key}</th>`).join("");
    const rows = paginated
        .map((row) => {
        return `<tr>${keys.map((k) => { var _a; return `<td>${(_a = row[k]) !== null && _a !== void 0 ? _a : ""}</td>`; }).join("")}</tr>`;
    })
        .join("");
    const app = document.getElementById("app");
    app.innerHTML = `
    <table class="table table-bordered table-hover table-primary">
      <thead class="table-secondary"><tr>${header}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div id="pagination" class="d-flex justify-content-center mt-3"></div>
  `;
}
