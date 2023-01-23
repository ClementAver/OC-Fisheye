// catches page url and stock it into a constant.
const url = new URL(window.location.href);
// catches page url key 'id' and stock it into a constant.
const id = url.searchParams.get("id");

// stores targeted DOM sectors.
const sectionPhotographerHeader = document.querySelector(".photographer-header");
const sectionMedia = document.querySelector("section.media");
const sectionPrice = document.querySelector(".price");

let lightboxSection = document.querySelector(".slider");
/*
const sliderBg = document.querySelector(".slider-bg");
*/
const sortingSelect = document.querySelector(".sorting-select");
const modalH2 = document.querySelector(".modal h2");

let dropDownArrow = {
  target: document.getElementById("dropDownArrow"),
  deployed: false,
};
const mainButton = document.querySelector(".select-like button:first-of-type");
const options = document.getElementById("sorting-options");

const likes = document.getElementById("option-likes");
const date = document.getElementById("option-date");
const title = document.getElementById("option-title");

/*
  initializes an array that will be filled later on, 
  it will contains one object representing the selected photographer.
*/
let activePhotographer = "";
/*
  initializes an array that will be filled later on, 
  it will contains all the slides of the selected photographer.
*/
let slideContainers = "";
/*
// initializes the slider counter.
let count = "";
*/

/* 
indicates the selected sorting algorithm :
0 - Popularity (default);
1 - Date;
2 - Title (A -> Z).
*/
let sortBy = 0;

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

// return a javascript object from a fetch request.
async function getDatas(url) {
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

function getTotalLikes(array) {
  let totalLikes = 0;
  array.forEach((key) => {
    const likes = key._likes;
    totalLikes += likes;
  });
  return totalLikes;
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

/*
function slider() {
  //checked// const close = document.querySelector(".close");
  //checked// const previous = document.querySelector(".previous");
  //checked// const next = document.querySelector(".next");

  let slideContainers = Object.values(document.querySelectorAll(".slide-container"));

  //checked// close.addEventListener("click", () => {
    sliderBg.classList.remove("active");
    slideContainers[count].classList.remove("active");
  });

  //checked// previous.addEventListener("click", () => {
    //exécute le code ci-dessous quand le bouton previous du slider est pressé.
    slideContainers[count].classList.remove("active");
    if (count > 0) {
      count--;
    } else {
      count = slideContainers.length - 1;
    }

    slideContainers[count].classList.add("active");
  });

  //checked// next.addEventListener("click", () => {
    //exécute le code ci-dessous quand le bouton next du slider est pressé.
    slideContainers[count].classList.remove("active");
    if (count < slideContainers.length - 1) {
      count++;
    } else {
      count = 0;
    }
    slideContainers[count].classList.add("active");
  });
}
*/

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //
// sorting

function sort(array, sortBy) {
  let sortedMedias = [];

  switch (sortBy) {
    // likes
    case 0:
      sortedMedias = array.sort((a, b) => b.likes - a.likes);
      sortedMedias.forEach((key) => console.log(key._likes));
      break;

    // date
    case 1:
      sortedMedias = array.sort((a, b) => new Date(b.date) - new Date(a.date));
      sortedMedias.forEach((key) => console.log(key._date));
      break;

    // title
    case 2:
      sortedMedias = array.sort((a, b) => a.title.localeCompare(b.title));
      sortedMedias.forEach((key) => console.log(key._title));
      break;

    default:
      console.error(`invalid object`);
  }

  document.querySelector("section.media").innerHTML = null;
  sortedMedias.forEach((key) => {
    key.createArticle();
  });

  Lightbox.createSlides(sortedMedias);

  /*
slider();
*/
}

function sorting(array) {
  mainButton.addEventListener("click", () => {
    switch (dropDownArrow.deployed) {
      case false:
        dropDownArrow.target.classList.add("U-turn");
        dropDownArrow.deployed = true;
        options.classList.add("deployed");
        mainButton.setAttribute("aria-expanded", "true");
        break;
      case true:
        dropDownArrow.target.classList.remove("U-turn");
        dropDownArrow.deployed = false;
        options.classList.remove("deployed");
        mainButton.setAttribute("aria-expanded", "false");
        break;
    }
  });

  likes.addEventListener("click", () => {
    sortBy = 0;
    sort(array, sortBy);
    displayOptions(sortBy);
  });

  date.addEventListener("click", () => {
    sortBy = 1;
    sort(array, sortBy);
    displayOptions(sortBy);
  });

  title.addEventListener("click", () => {
    sortBy = 2;
    sort(array, sortBy);
    displayOptions(sortBy);
  });
}

function displayOptions(sortBy) {
  let display = null;
  let undisplay = [];

  const selectedOption = document.getElementById("option-selected");

  dropDownArrow.deployed = false;
  options.classList.remove("deployed");
  mainButton.setAttribute("aria-expanded", "false");
  dropDownArrow.target.classList.remove("U-turn");

  switch (sortBy) {
    case 0:
      selectedOption.innerText = "Popularité";
      display = likes;
      undisplay.push(date, title);
      options.setAttribute("aria-activedescendant", "option-likes");
      break;
    case 1:
      selectedOption.innerText = "Date";
      display = date;
      undisplay.push(title, likes);
      options.setAttribute("aria-activedescendant", "option-date");
      break;
    case 2:
      selectedOption.innerText = "Titre";
      display = title;
      undisplay.push(date, likes);
      options.setAttribute("aria-activedescendant", "option-title");
      break;
  }

  display.setAttribute("aria-selected", "true");
  undisplay.forEach((key) => key.setAttribute("aria-selected", "false"));
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

async function app(url) {
  // fetches datas, then returns them in js format.
  const data = await getDatas(url);
  let medias = [];
  /* 
    get 'photographers' property from data object.
    get 'media' property from data object.
    concatenates the two above
  */
  const photographers = data.photographers;
  const media = data.media;

  // for each key, instanciates the right class then push the newly created object on the right array.
  media.forEach((key) => {
    if (key.photographerId == id) {
      medias.push(new MediaFactory(key));
    }
  });

  /* test unit */
  console.log("=*=*=*=*=*=*=*=*=*=");
  console.log(medias);
  console.log("=_=_=_=_=_=_=_=_=_=");

  // retrieves the right photographer according to his id.
  const photographer = photographers.filter((res) => res.id == id);
  // creates a Photographer instance.
  activePhotographer = new Photographer(photographer[0]);
  // calls the creation function for the banner.
  sectionPhotographerHeader.innerHTML = activePhotographer.createBanner();

  modalH2.innerHTML = `Conctactez<br> ${activePhotographer._name}`;

  Lightbox.createLightbox();
  Lightbox.createSlides(medias);

  // creates and inserts the price section content.
  sectionPrice.innerHTML = `<p><span id="total-likes">${getTotalLikes(medias)}</span>&nbsp;<i class="fa-solid fa-heart"></i></p><p>${activePhotographer.price}€&#8239;/&#8239;jour</p>`;

  // sorts initially by likes count (descending).
  sort(medias, sortBy);

  // adds eventListeners on 'select-like' div options.
  sorting(medias);
}

app("data/photographers.json");
