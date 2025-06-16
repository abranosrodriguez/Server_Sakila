import {
  renderDataTable,
  renderPagination,
  renderQuery,
  loadDataSelect,
  renderCustomData,
} from "./ui.js";

import { Film } from "./interface/film.js";

export const setFilmsData = (data: Film[] | any[]) => {
  filmsData = data;
};

export let filmsData: Film[] = [];
let allFilms: Film[] = []; // NUEVA VARIABLE para conservar todos los datos
let currentPage = 1;
const pageSize = 10;
let isOnQuery = "qFilms";

export const setCurrentPage = (val: number) => {
  currentPage = val;
};

export const setIsOnQuery = (val: string) => {
  isOnQuery = val;
};

export const getCurrentPage = () => currentPage;
export const getIsOnQuery = () => isOnQuery;

export const loadDataFetch = async (urlFetch: string) => {
  try {
    const response = await fetch(urlFetch);
    const data = await response.json();

    if (response.ok) {
      filmsData = data;
      allFilms = data;
      setCurrentPage(1);
      renderDataTable(filmsData, currentPage, pageSize);
      renderPagination(filmsData, currentPage, pageSize);
      loadDataSelect(filmsData);
    } else {
      console.error("Error desde backend:", data);
      alert(`Error del servidor: ${data.message || "Error desconocido"}`);
    }
  } catch (error) {
    console.error("Error al cargar películas:", error);
  }
};

// Function to load the custom data
export const loadCustomQuery = async () => {
  const queryInput = (
    document.getElementById("btnInputCustomQuery") as HTMLInputElement
  )?.value;

  if (!queryInput) {
    alert("Por favor ingrese una consulta SQL.");
    return;
  }

  try {
    const response = await fetch("/api/films/custom-query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: queryInput }),
    });

    const data = await response.json();

    if (response.ok) {
      filmsData = data;
      allFilms = data;

      setFilmsData(data);
      loadDataSelect(data);
      setCurrentPage(1);
      setIsOnQuery("qCustomQuery");
      renderDataTable(data, 1, 10);
      renderPagination(data, 1, 10);
    } else {
      alert(data.message || "Error ejecutando consulta");
    }
  } catch (error) {
    console.error("Error en consulta personalizada:", error);
    alert("Error al ejecutar consulta personalizada.");
  }
};

// Function for filter of data
export const loadDataFilter = (input: string, key: string) => {
  if (!input) {
    alert("No se ha podido encontrar nada con el valor proporcionado");
    return;
  }

  const filtered = allFilms.filter((film) => {
    const value = film[key as keyof Film];
    return (
      value != null &&
      value.toString().toLowerCase().includes(input.toLowerCase())
    );
  });
  filmsData = filtered;
  setCurrentPage(1);
  if (filmsData.length == 0) {
    alert("No se ha encontrado ningún valor con el valor proporcionado");
  } else {
    if (isOnQuery === "qCategory") {
      renderQuery(filmsData, currentPage, pageSize);
    } else if (isOnQuery === "qCustomQuery") {
      renderDataTable(filmsData, currentPage, pageSize);
    } else {
      renderDataTable(filmsData, currentPage, pageSize);
    }

    renderPagination(filmsData, currentPage, pageSize);
  }
};

export const removeTable = (idTable: string, child: string) => {
  const children = document.getElementById(child);
  if (children) {
    document.getElementById(idTable)?.removeChild(children);
  }
};

export const removeButtons = (idTable: string, child: string) => {
  const children = document.getElementById(child);
  document.getElementById(idTable)?.removeChild(children);
};

export const checkTable = (idTable: string, child: string) => {
  const children = document.getElementById(child);
  return Boolean(children);
};
