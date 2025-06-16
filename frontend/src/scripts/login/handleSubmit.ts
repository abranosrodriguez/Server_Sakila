export function setupFormListener() {
  const form = document.getElementById("login-form") as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const host = (document.getElementById("idHost") as HTMLInputElement).value;
    const port = (document.getElementById("idPort") as HTMLInputElement).value;
    const username = (document.getElementById("idUser") as HTMLInputElement)
      .value;
    const password = (document.getElementById("idPass") as HTMLInputElement)
      .value;
    const database = (document.getElementById("idDB") as HTMLInputElement)
      .value;
    if (port !== "3306") {
      alert("El puerto debe ser 3306 para la conexión XAMPP.");
      return; // detener submit
    }
    console.log("Enviando:", { host, port, username, password, database });

    const res = await fetch("/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ host, port, user: username, password, database }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = "/protected/db.html";
    } else {
      alert(
        "Error: " +
          (data.message || "Desconocido") +
          "\nDetalle: " +
          (data.error || "")
      );
    }
  });
}
