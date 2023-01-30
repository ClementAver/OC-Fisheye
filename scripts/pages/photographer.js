// catches page url and stock it into a constant.
const url = new URL(window.location.href);
// catches page url key 'id' and stock it into a constant.
const id = url.searchParams.get("id");

// stores targeted DOM sectors.
const header = document.querySelector("header");
const main = document.querySelector("main");
const sectionPrice = document.querySelector("section.price");
const lightboxBg = document.querySelector("div.lightbox-bg");
const contactModal = document.getElementById("contact-modal");

const sectionPhotographerHeader = document.querySelector(".photographer-header");
const sectionMedia = document.querySelector("section.media");

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

// initializes the slides counter.
let count = 0;

// initializes the window addEventListeners state for the lightbox keys navigation.
let LightboxNavKeys = "not declared";

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
  function closeSorting() {
    dropDownArrow.target.classList.remove("U-turn");
    dropDownArrow.deployed = false;
    options.classList.remove("deployed");
    mainButton.setAttribute("aria-expanded", "false");
    mainButton.focus();
  }

  function openSorting() {
    dropDownArrow.target.classList.add("U-turn");
    dropDownArrow.deployed = true;
    options.classList.add("deployed");
    mainButton.setAttribute("aria-expanded", "true");
    likes.focus();
  }

  mainButton.addEventListener("click", () => {
    switch (dropDownArrow.deployed) {
      case false:
        openSorting();
        break;
      case true:
        closeSorting();
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

  /////////////////////////////////////////////////////

  window.addEventListener("keydown", (e) => {
    if (!dropDownArrow.deployed) {
      return;
    }

    function sortingNavKeys(a, b, i) {
      switch (e.key) {
        case "Escape":
          closeSorting();
          break;
        case "Enter":
          sortBy = i;
          sort(array, sortBy);
          displayOptions(sortBy);
          break;
        case "ArrowUp":
          e.preventDefault();
          a.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          b.focus();
          break;
      }
    }

    if (document.activeElement === likes) {
      sortingNavKeys(title, date, 0);
      return;
    }

    if (document.activeElement === date) {
      sortingNavKeys(likes, title, 1);
      return;
    }

    if (document.activeElement === title) {
      sortingNavKeys(date, likes, 2);
      return;
    }

    /*
    if (document.activeElement === likes) {
      switch (e.key) {
        case "Escape":
          closeSorting();
          break;
        case "Enter":
          sortBy = 0;
          sort(array, sortBy);
          displayOptions(sortBy);
          break;
        case "ArrowUp":
          e.preventDefault();
          title.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          date.focus();
          break;
      }
      return;
    }

    if (document.activeElement === date) {
      switch (e.key) {
        case "Escape":
          closeSorting();
          break;
        case "Enter":
          sortBy = 1;
          sort(array, sortBy);
          displayOptions(sortBy);
          break;
        case "ArrowUp":
          e.preventDefault();
          likes.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          title.focus();
          break;
      }
      return;
    }

    if (document.activeElement === title) {
      switch (e.key) {
        case "Escape":
          closeSorting();
          break;
        case "Enter":
          sortBy = 2;
          sort(array, sortBy);
          displayOptions(sortBy);
          break;
        case "ArrowUp":
          e.preventDefault();
          date.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          likes.focus();
          break;
      }
      return;
    }
*/
  });
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

function pageFocusOff() {
  let uninteresting = document.querySelectorAll('header a, section.photographer-header button, .select-like > button, .media video, .media img, i[aria-label="likes"]');
  uninteresting.forEach((key) => key.setAttribute("tabindex", "-1"));
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
  sectionPrice.setAttribute("aria-hidden", "true");
  lightboxBg.setAttribute("aria-hidden", "true");
  contactModal.setAttribute("aria-hidden", "true");
}

function pageFocusOn() {
  let uninteresting = document.querySelectorAll('header a, section.photographer-header button, .select-like > button, .media video, .media img, i[aria-label="likes"]');
  uninteresting.forEach((key) => key.setAttribute("tabindex", "0"));
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
  sectionPrice.setAttribute("aria-hidden", "false");
  lightboxBg.setAttribute("aria-hidden", "true");
  contactModal.setAttribute("aria-hidden", "true");
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

  pageFocusOn();
}

app("data/photographers.json");
