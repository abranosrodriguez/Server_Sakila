var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function setupFormListener() {
    const form = document.getElementById("login-form");
    if (!form)
        return;
    form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const host = document.getElementById("idHost").value;
        const port = document.getElementById("idPort").value;
        const username = document.getElementById("idUser")
            .value;
        const password = document.getElementById("idPass")
            .value;
        const database = document.getElementById("idDB")
            .value;
        if (port !== "3306") {
            alert("El puerto debe ser 3306 para la conexión XAMPP.");
            return; // detener submit
        }
        console.log("Enviando:", { host, port, username, password, database });
        const res = yield fetch("/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ host, port, user: username, password, database }),
        });
        const data = yield res.json();
        if (res.ok) {
            window.location.href = "/protected/db.html";
        }
        else {
            alert("Error: " +
                (data.message || "Desconocido") +
                "\nDetalle: " +
                (data.error || ""));
        }
    }));
}
