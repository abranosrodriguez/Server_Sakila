import { removeTable, loadQuery, loadFilms, loadDataFilter, setCurrentPage, setIsOnQuery, getIsOnQuery, } from "./data.js";
export function handleBtnQuery() {
    var _a;
    (_a = document.getElementById("btnQuery")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        removeTable("app", "tableFilm");
        removeTable("app", "pagination");
        loadQuery();
        setIsOnQuery("qCategory");
        setCurrentPage(1);
    });
}
export function handleBtnFilm() {
    var _a;
    (_a = document.getElementById("btnFilm")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        removeTable("app", "tableFilm");
        removeTable("app", "pagination");
        loadFilms();
        setIsOnQuery("qFilms");
        setCurrentPage(1);
    });
}
export function handleBtnFind() {
    var _a;
    (_a = document.getElementById("btnFind")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const btnInput = (_a = document.getElementById("btnInput")) === null || _a === void 0 ? void 0 : _a.value;
        const btnSelect = (_b = document.getElementById("idSelect")) === null || _b === void 0 ? void 0 : _b.value;
        loadDataFilter(btnInput, btnSelect);
    });
}
export function handleBtnClear() {
    var _a;
    (_a = document.getElementById("btnClean")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        const btnInput = document.getElementById("btnInput");
        if (btnInput)
            btnInput.value = "";
        if (getIsOnQuery() === "qCategory") {
            loadQuery();
        }
        else {
            loadFilms();
        }
    });
}
export function handleBtnCloseSession() {
    var _a;
    (_a = document.getElementById("btnCloseSession")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        fetch("/logout", { method: "POST" }).then(() => {
            window.location.href = "/index.html";
        });
    });
}
