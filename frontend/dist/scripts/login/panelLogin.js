export function panelLogin() {
    let contain = document.getElementById("loginPanel");
    //class="position-absolute top-50 start-50 translate-middle"
    let panel = `
        <form id="login-form" class="position-absolute top-50 start-50 translate-middle">
          <div id="containText">
            <p id="pHost" class="text-primary-emphasis">Host:</p>
            <p id="pPort" class="text-primary-emphasis">Port:</p>
            <p id="pDB" class="text-primary-emphasis">Data Base:</p>
            <p id="pUser" class="text-primary-emphasis">Usuario:</p>
            <p id="pPass" class="text-primary-emphasis">Pass:</p>
          </div>
          <div id="containInputs"></div>
          <div id="conBtnEnter"></div>
        </form>

  `;
    contain === null || contain === void 0 ? void 0 : contain.innerHTML = panel;
}
