import { createButtonsContainer } from "./main/ui.js";
import { urlFilm, urlCategory } from "./main/url.js";
//import { loadData } from "./main/data";
import { setIsOnQuery, loadDataFetch } from "./main/data.js";
import { handleBtnFind, handleBtnClear, handleBtnCustomQuery, handleBtnFetch, } from "./main/domHandler.js";
import { handleBtnCloseSession } from "./main/btns/closeSession.js";
document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    if (app) {
        app.innerHTML = `<p class="text-success">¡Frontend listo y esperando datos de Sakila!</p>`;
        setIsOnQuery("qFilms");
        createButtonsContainer();
        //handleBtnFunction("btnFilm", loadFilms);
        //handleBtnFunction("btnQuery", loadQuery);
        handleBtnFetch("btnFilm", loadDataFetch, urlFilm, "qFilms");
        handleBtnFetch("btnQuery", loadDataFetch, urlCategory, "qCategory");
        handleBtnCustomQuery();
        handleBtnFind();
        handleBtnClear();
        handleBtnCloseSession();
        loadDataFetch(urlFilm);
    }
});
