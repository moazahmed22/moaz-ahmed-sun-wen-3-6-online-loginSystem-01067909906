const welcomeMessage = document.querySelector(".welcome-message");
const logoutButton = document.querySelector(".logout-button");
let LoggedUser = localStorage.getItem("LoggedUser");

welcomeMessage.textContent = `welcome ${LoggedUser}`;

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("LoggedUser");
    window.open("../index.html");
});