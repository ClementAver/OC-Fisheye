// catches page url and stock it into a constant.
const url = new URL(window.location.href);
// catches page url key 'id' and stock it into a constant.
const id = url.searchParams.get("id");

// stores targeted DOM sectors.
const sectionPhotographHeader = document.querySelector(".photograph-header");
const sectionMedia = document.querySelector("section.media");
const sectionPrice = document.querySelector(".price");
const sectionSlider = document.querySelector(".slider");

const sliderBg = document.querySelector(".slider-bg");
const close = document.querySelector(".close");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

// return a javascript object from a fetch request.
async function getDatas(url) {
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

class Photographer {
  constructor(data) {
    this._name = data.name;
    this._id = data.id;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = data.portrait;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  get tagline() {
    return this._tagline;
  }

  get price() {
    return this._price;
  }

  get portrait() {
    return `assets/photographers/${this._portrait}`;
  }

  createBanner() {
    sectionPhotographHeader.innerHTML = `
      <div>
        <h1>${this._name}</h1>
        <p>${this._city}, ${this._country}</p>
        <p>${this._tagline}</p>
      </div>

      <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
      <img src="assets/photographers/${this._portrait}" alt="${this._name}"/>`;
  }
}

let = "";

class Image {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._image = data.image;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._slide = document.createElement("div");
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  get url() {
    return `assets/media/${this._image}`;
  }

  get likes() {
    return this._likes;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }

  createArticle() {
    const card = document.createElement("article");
    const cardContent = `
          <img src="assets/media/${this._image}" alt="${this._title}">
          <div>
            <h2>${this._title}</h2>
            <p>${this._likes}&nbsp;<i class="fa-solid fa-heart"></i></p>
          </div>
      `;
    card.innerHTML = cardContent;
    card.addEventListener("click", () => {
      sliderBg.style.display = "flex";
      this._slide.classList.add("slide-container", "active");
    });
    sectionMedia.append(card);
  }

  createSlide() {
    const slideContent = `
          <article class="slide">
            <img src="assets/media/${this._image}" alt="${this._title}"/>
            <h2>${this._title}</h2>
          </article>
      `;
    this._slide.innerHTML = slideContent;
    this._slide.classList.add("slide-container");
    sectionSlider.append(this._slide);
  }
}

class Video {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._video = data.video;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._slide = document.createElement("div");
    this._slide.classList.add("slide-container");
    this._index = "";
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  get url() {
    return `assets/media/${this._video}`;
  }

  get likes() {
    return this._likes;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }

  createArticle() {
    const card = document.createElement("article");
    const cardContent = `
          <video src="assets/media/${this._video}" controls title="${this._title}">${this._title}</video>
          <div>
            <h2>${this._title}</h2>
            <p>${this._likes}&nbsp;<i class="fa-solid fa-heart"></i></p>
          </div>
      `;
    card.innerHTML = cardContent;
    sectionMedia.append(card);

    card.addEventListener("click", () => {
      sliderBg.style.display = "flex";
      this._slide.classList.add(".active");
      count = this._index;
    });
  }

  createSlide() {
    const slideContent = `
          <article class="slide">
            <video src="assets/media/${this._video}" controls title="${this._title}">${this._title}</video>
            <h2>${this._title}</h2>
          </article>
      `;
    this._slide.innerHTML = slideContent;
    sectionSlider.append(this._slide);
  }
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

let pictures = [];
let videos = [];

// mediafactory
class mediaFactory {
  constructor(data) {
    if (data.image && data.photographerId == id) {
      pictures.push(new Image(data));
    } else if (data.video && data.photographerId == id) {
      videos.push(new Video(data));
    }
  }
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

async function getTotalLikes(array) {
  let i = 0;
  array.forEach((key) => {
    const likes = key._likes;
    i += likes;
  });
  return i;
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //
let sliderCount = "";

function slider() {
  const slideContainers = document.querySelectorAll(".slide-container");
  let slideContainerActive = "";

  close.addEventListener("click", () => {
    slideContainerActive = document.querySelector(".slide-container.active");
    sliderBg.style.display = "none";
    slideContainerActive.classList.remove("active");
  });

  previous.addEventListener("click", () => {
    slideContainerActive = document.querySelector(".slide-container.active");
    //exécute le code ci-dessous quand le bouton previous du slider est pressé.
    slideContainerActive.classList.remove("active");
    if (sliderCount > 0) {
      sliderCount--;
    } else {
      sliderCount = medias.length - 1;
    }
    slideContainerActive.classList.add(".active");
  });

  next.addEventListener("click", () => {
    slideContainerActive = document.querySelector(".slide-container.active");
    //exécute le code ci-dessous quand le bouton next du slider est pressé.
    slideContainerActive.classList.remove(".active");
    if (sliderCount < medias.length - 1) {
      sliderCount++;
    } else {
      sliderCount = 0;
    }
    slideContainerActive.classList.add(".active");
  });
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

async function app(url) {
  // fetches datas, then returns them in js format.
  const data = await getDatas(url);

  /* 
    get 'photographers' property from data object.
    get 'media' property from data object.
    concatenates the two above
  */
  const photographers = data.photographers;
  const media = data.media;

  // for each key, instanciates the right class then push the newly created object on the right array.
  media.forEach((key) => new mediaFactory(key));

  // concatenates all medias together.
  const medias = pictures.concat(videos);

  /* test unit */
  console.log("=*=*=*=*=*=*=*=*=*=");
  console.log(pictures);
  console.log(videos);
  console.log(medias);
  console.log("=_=_=_=_=_=_=_=_=_=");

  // /!\.
  const photographer = photographers.filter((res) => res.id == id);
  const activePhotograph = new Photographer(photographer[0]);
  activePhotograph.createBanner();

  // creates and appends the media section content.
  medias.forEach((key) => key.createArticle());

  // creates and appends the price section content.
  sectionPrice.innerHTML = `<p>${await getTotalLikes(medias)}&nbsp;<i class="fa-solid fa-heart"></i></p><p>${photographer[0].price}€&#8239;/&#8239;jour</p>`;

  // creates and appends the slider section content.
  medias.forEach((key) => key.createSlide());

  // call the slider function
  slider();
}

app("data/photographers.json");
