// Handle token

export function handleToken(token) {
  if (!token) {
    return;
  }

  const editionMode = document.querySelector(".edition-mode");
  editionMode.style.display = null;
  const linkModification = document.querySelector(".js-modal");
  linkModification.style.display = null;
  const filterButtons = document.querySelector(".buttons");
  filterButtons.innerHTML = "";

  const linkLogin = document.querySelector("#link-login");
  linkLogin.style.display = "none";
  const linkLogout = document.querySelector("#link-logout");
  linkLogout.style.display = null;
}
