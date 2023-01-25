// catches page url and stock it into a constant.
const url = new URL(window.location.href);
// catches page url key 'id' and stock it into a constant.
const id = url.searchParams.get("id");

// stores targeted DOM sectors.
const sectionPhotographerHeader = document.querySelector(".photographer-header");
const sectionMedia = document.querySelector("section.media");
const sectionPrice = document.querySelector("section.price");

// sorting section dom elements.
const mainButton = document.querySelector(".select-like button:first-of-type");
let dropDownArrow = {
  target: document.getElementById("dropDownArrow"),
  deployed: false,
};
const options = document.getElementById("sorting-options");
const likes = document.getElementById("option-likes");
const date = document.getElementById("option-date");
const title = document.getElementById("option-title");

const modalTitle = document.querySelector(".modal h2");

// initializes the slider counter.
let count = 0;

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

function getTotalLikes(array) {
  let totalLikes = 0;
  array.forEach((key) => {
    const likes = key._likes;
    totalLikes += likes;
  });
  return totalLikes;
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

// adds the actuals sorting algorithms.
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

  Lightbox.createLightbox();
  Lightbox.createSlides(sortedMedias);
  const anchors = document.querySelectorAll("section.media article img, section.media article video");
  Lightbox.pinOn(anchors);
}

// mutates the 'sorting' section html when an option is selected by the user.
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

// adds the listeners on the 'sorting' section elements, which ones call the two functions above.
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

  likes.addEventListener("keydown", (event) => {
    if (event.which === 13) {
      sortBy = 0;
      sort(array, sortBy);
      displayOptions(sortBy);
    }
  });

  date.addEventListener("click", () => {
    sortBy = 1;
    sort(array, sortBy);
    displayOptions(sortBy);
  });

  date.addEventListener("keydown", (event) => {
    if (event.which === 13) {
      sortBy = 1;
      sort(array, sortBy);
      displayOptions(sortBy);
    }
  });

  title.addEventListener("click", () => {
    sortBy = 2;
    sort(array, sortBy);
    displayOptions(sortBy);
  });

  title.addEventListener("keydown", (event) => {
    if (event.which === 13) {
      sortBy = 2;
      sort(array, sortBy);
      displayOptions(sortBy);
    }
  });
}
// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

function pageFocusOff() {
  let uninteresting = document.querySelectorAll('header a, section.photographer-header button, .select-like > button, .media video, .media img, i[aria-label="likes"]');
  uninteresting.forEach((key) => key.setAttribute("tabindex", "-1"));
  console.log("OFF");
}

function pageFocusOn() {
  let uninteresting = document.querySelectorAll('header a, section.photographer-header button, .select-like > button, .media video, .media img, i[aria-label="likes"]');
  uninteresting.forEach((key) => key.setAttribute("tabindex", "0"));
  console.log("ON");
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
  let activePhotographer = new Photographer(photographer[0]);
  // calls the creation function for the banner.
  sectionPhotographerHeader.innerHTML = activePhotographer.createBanner();

  modalTitle.innerHTML = `Contactez<br> ${activePhotographer._name}`;

  // creates and inserts the price section content.
  sectionPrice.innerHTML = `<p><span id="total-likes">${getTotalLikes(medias)}</span>&nbsp;<i class="fa-solid fa-heart"></i></p><p>${activePhotographer.price}€&#8239;/&#8239;jour</p>`;

  // sorts initially by likes count (descending).
  sort(medias, sortBy);

  // adds eventListeners on 'select-like' div options.
  sorting(medias);

  // -_-_-_-_- //
  const sliderBg = document.querySelector("div.slider-bg");
  // <-
  window.addEventListener("keydown", (event) => {
    if (event.which === 37 && sliderBg.classList.contains("active")) {
      // exécute le code ci-dessous quand la touche 'flèche gauche' du clavier est pressé.
      let slides = Object.values(document.querySelectorAll(".slide"));
      slides[count].classList.remove("active");
      if (count > 0) {
        count--;
      } else {
        count = slides.length - 1;
      }
      slides[count].classList.add("active");
    }
  });

  // ->
  window.addEventListener("keydown", (event) => {
    if (event.which === 39 && sliderBg.classList.contains("active")) {
      // exécute le code ci-dessous quand la touche 'flèche droite' du clavier est pressé.
      let slides = Object.values(document.querySelectorAll(".slide"));
      slides[count].classList.remove("active");
      if (count < slides.length - 1) {
        count++;
      } else {
        count = 0;
      }
      slides[count].classList.add("active");
    }
  });

  // 'escape' key
  window.addEventListener("keydown", (event) => {
    if (event.which === 27 && sliderBg.classList.contains("active")) {
      // exécute le code ci-dessous quand la touche 'échap' du clavier est pressé.
      let slides = Object.values(document.querySelectorAll(".slide"));
      sliderBg.classList.remove("active");
      slides[count].classList.remove("active");
      pageFocusOn();
    }
  });
}

app("data/photographers.json");
