var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderDataTable, renderPagination, renderQuery, loadDataSelect, } from "./ui.js";
export const setFilmsData = (data) => {
    filmsData = data;
};
export let filmsData = [];
let allFilms = []; // NUEVA VARIABLE para conservar todos los datos
let currentPage = 1;
const pageSize = 10;
let isOnQuery = "qFilms";
export const setCurrentPage = (val) => {
    currentPage = val;
};
export const setIsOnQuery = (val) => {
    isOnQuery = val;
};
export const getCurrentPage = () => currentPage;
export const getIsOnQuery = () => isOnQuery;
export const loadDataFetch = (urlFetch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(urlFetch);
        const data = yield response.json();
        if (response.ok) {
            filmsData = data;
            allFilms = data;
            setCurrentPage(1);
            renderDataTable(filmsData, currentPage, pageSize);
            renderPagination(filmsData, currentPage, pageSize);
            loadDataSelect(filmsData);
        }
        else {
            console.error("Error desde backend:", data);
            alert(`Error del servidor: ${data.message || "Error desconocido"}`);
        }
    }
    catch (error) {
        console.error("Error al cargar películas:", error);
    }
});
// Function to load the custom data
export const loadCustomQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const queryInput = (_a = document.getElementById("btnInputCustomQuery")) === null || _a === void 0 ? void 0 : _a.value;
    if (!queryInput) {
        alert("Por favor ingrese una consulta SQL.");
        return;
    }
    try {
        const response = yield fetch("/api/films/custom-query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: queryInput }),
        });
        const data = yield response.json();
        if (response.ok) {
            filmsData = data;
            allFilms = data;
            setFilmsData(data);
            loadDataSelect(data);
            setCurrentPage(1);
            setIsOnQuery("qCustomQuery");
            renderDataTable(data, 1, 10);
            renderPagination(data, 1, 10);
        }
        else {
            alert(data.message || "Error ejecutando consulta");
        }
    }
    catch (error) {
        console.error("Error en consulta personalizada:", error);
        alert("Error al ejecutar consulta personalizada.");
    }
});
// Function for filter of data
export const loadDataFilter = (input, key) => {
    if (!input) {
        alert("No se ha podido encontrar nada con el valor proporcionado");
        return;
    }
    const filtered = allFilms.filter((film) => {
        const value = film[key];
        return (value != null &&
            value.toString().toLowerCase().includes(input.toLowerCase()));
    });
    filmsData = filtered;
    setCurrentPage(1);
    if (filmsData.length == 0) {
        alert("No se ha encontrado ningún valor con el valor proporcionado");
    }
    else {
        if (isOnQuery === "qCategory") {
            renderQuery(filmsData, currentPage, pageSize);
        }
        else if (isOnQuery === "qCustomQuery") {
            renderDataTable(filmsData, currentPage, pageSize);
        }
        else {
            renderDataTable(filmsData, currentPage, pageSize);
        }
        renderPagination(filmsData, currentPage, pageSize);
    }
};
export const removeTable = (idTable, child) => {
    var _a;
    const children = document.getElementById(child);
    if (children) {
        (_a = document.getElementById(idTable)) === null || _a === void 0 ? void 0 : _a.removeChild(children);
    }
};
export const removeButtons = (idTable, child) => {
    var _a;
    const children = document.getElementById(child);
    (_a = document.getElementById(idTable)) === null || _a === void 0 ? void 0 : _a.removeChild(children);
};
export const checkTable = (idTable, child) => {
    const children = document.getElementById(child);
    return Boolean(children);
};
