var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderFilms, renderPagination, renderQuery, loadDataSelect, } from "./ui.js";
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
export const loadFilms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/api/films");
        const data = yield response.json();
        if (response.ok) {
            filmsData = data;
            allFilms = data; // GUARDAMOS TODOS LOS DATOS
            setCurrentPage(1);
            renderFilms(filmsData, currentPage, pageSize);
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
export const loadQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/api/films/category");
        const data = yield response.json();
        filmsData = data;
        allFilms = data; // GUARDAMOS TODOS LOS DATOS
        setCurrentPage(1);
        renderQuery(filmsData, currentPage, pageSize);
        renderPagination(filmsData, currentPage, pageSize);
        loadDataSelect(filmsData);
    }
    catch (error) {
        console.error("Error al cargar categorías:", error);
    }
});
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
    if (isOnQuery === "qCategory") {
        renderQuery(filmsData, currentPage, pageSize);
    }
    else {
        renderFilms(filmsData, currentPage, pageSize);
    }
    renderPagination(filmsData, currentPage, pageSize);
};
export const removeTable = (idTable, child) => {
    var _a;
    const children = document.getElementById(child);
    (_a = document.getElementById(idTable)) === null || _a === void 0 ? void 0 : _a.removeChild(children);
};
