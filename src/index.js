import "./style/style.scss";

const home = () => {
  const container = document.createElement("div");
  container.innerHTML = `<h1>Oh yes!</h1>`

  return container;
}
const app = document.getElementById("app");

app.appendChild(home());
