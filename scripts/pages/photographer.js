//Mettre le code JavaScript lié à la page photographer.html
const url = new URL(window.location.href);

const id = url.searchParams.get("id");
console.log(id);
