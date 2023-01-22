async function getPhotographers() {
  const result = await fetch("data/photographers.json");
  const data = await result.json();
  return data;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographers");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
