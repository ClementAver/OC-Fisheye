async function getPhotographers() {
  const result = await fetch("data/photographers.json");
  const data = await result.json();
  console.log(typeof data);
  return data;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographers");

  photographers.forEach((photographer) => {
    const photographerModel = PhotographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
