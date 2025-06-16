//import { loadFilms } from "./data";
import {
  removeTable,
  loadDataFilter,
  setCurrentPage,
  setIsOnQuery,
  getIsOnQuery,
  checkTable,
  removeButtons,
  loadCustomQuery,
  loadDataFetch,
} from "./data.js";
import { buttonCustomQuery } from "./ui.js";
import { urlFilm, urlCategory } from "./url.js";

export function handleBtnFetch(
  idBtn: string,
  f: Function,
  urlString: string,
  isOnQuery: string
) {
  document.getElementById(idBtn)?.addEventListener("click", () => {
    let table = checkTable("app", "tableFilm");
    if (table) {
      f(urlString);
    } else {
      f(urlString);
    }
    removeContainerCustomQuery();
    setIsOnQuery(isOnQuery);
  });
}

export function handleBtnCustomQuery() {
  document.getElementById("btnCustomQuery")?.addEventListener("click", () => {
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
  document
    .getElementById("btnFindCustomQuery")
    ?.addEventListener("click", async () => {
      loadCustomQuery();
    });
}

export function handleBtnFind() {
  document.getElementById("btnFind")?.addEventListener("click", () => {
    const btnInput = (document.getElementById("btnInput") as HTMLInputElement)
      ?.value;
    const btnSelect = (document.getElementById("idSelect") as HTMLSelectElement)
      ?.value;
    loadDataFilter(btnInput, btnSelect);
  });
}

export function handleBtnClear() {
  document.getElementById("btnClean")?.addEventListener("click", () => {
    const btnInput = document.getElementById("btnInput") as HTMLInputElement;
    if (btnInput) btnInput.value = "";

    if (getIsOnQuery() === "qCategory") {
      setIsOnQuery("qCategory");
      loadDataFetch(urlCategory);
    } else if (getIsOnQuery() === "qCustomQuery") {
      setIsOnQuery("qCustomQuery");
      loadCustomQuery();
    } else {
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
  btnSelect?.innerHTML = "";
}
