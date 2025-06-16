export function createButton(
  btnFather: HTMLElement | null,
  btnChild: HTMLElement,
  nameId: string,
  nameText: string
) {
  btnChild.setAttribute("id", nameId);
  btnChild.setAttribute("class", "btn btn-outline-secondary");
  btnChild.textContent = nameText;
  btnFather?.appendChild(btnChild);
}
