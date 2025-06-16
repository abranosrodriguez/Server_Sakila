var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { loadFilms } from "./data";
import { removeTable, loadDataFilter, setCurrentPage, setIsOnQuery, getIsOnQuery, checkTable, removeButtons, loadCustomQuery, loadDataFetch, } from "./data.js";
import { buttonCustomQuery } from "./ui.js";
import { urlFilm, urlCategory } from "./url.js";
export function handleBtnFetch(idBtn, f, urlString, isOnQuery) {
    var _a;
    (_a = document.getElementById(idBtn)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        let table = checkTable("app", "tableFilm");
        if (table) {
            f(urlString);
        }
        else {
            f(urlString);
        }
        removeContainerCustomQuery();
        setIsOnQuery(isOnQuery);
    });
}
export function handleBtnCustomQuery() {
    var _a;
    (_a = document.getElementById("btnCustomQuery")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        emptySelect();
        removeContainerCustomQuery();
        buttonCustomQuery();
        handleBtnFindCustomQuery();
        removeTable("app", "tableFilm");
        removeTable("app", "pagination");
        setIsOnQuery("qCustomQuery");
        setCurrentPage(1);
    });
}
export function handleBtnFindCustomQuery() {
    var _a;
    (_a = document
        .getElementById("btnFindCustomQuery")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        loadCustomQuery();
    }));
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
            setIsOnQuery("qCategory");
            loadDataFetch(urlCategory);
        }
        else if (getIsOnQuery() === "qCustomQuery") {
            setIsOnQuery("qCustomQuery");
            loadCustomQuery();
        }
        else {
            setIsOnQuery("qFilms");
            loadDataFetch(urlFilm);
        }
    });
}
function removeContainerCustomQuery() {
    if (getIsOnQuery() !== "qCustomQuery" || getIsOnQuery() === "qCustomQuery") {
        let butons = checkTable("buttonsCustomQuery", "btnInputCustomQuery");
        if (butons) {
            removeButtons("buttonsCustomQuery", "btnInputCustomQuery");
            removeButtons("buttonsCustomQuery", "btnFindCustomQuery");
        }
    }
}
function emptySelect() {
    let btnSelect = document.getElementById("idSelect");
    btnSelect === null || btnSelect === void 0 ? void 0 : btnSelect.innerHTML = "";
}
