// catches page url and stock it into a constant.
const url = new URL(window.location.href);
// catches page url key 'id' and stock it into a constant.
const id = url.searchParams.get("id");

// stores targeted DOM sectors.
const sectionPhotographHeader = document.querySelector(".photograph-header");
const sectionMedia = document.querySelector("section.media");
let sectionPrice = document.querySelector(".price");
const sectionSlider = document.querySelector(".slider");
const sliderBg = document.querySelector(".slider-bg");
const sortingSelect = document.querySelector(".sorting-select");

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
// initializes the slider counter.
let count = "";
// initializes the selected photographer's global likes counter.
let totalLikes = 0;

/*
  initializes two arrays that will be filled later on
  with the medias of the selected photographer.
*/
let pictures = [];
let videos = [];

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
    this._liked = false;
    this._likesCounter = this._likes;
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

    const img = document.createElement("img");
    img.setAttribute("src", `assets/media/${this._image}`);
    img.setAttribute("alt", `${this._title}`);

    const div = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.innerText = `${this._title}`;

    const p = document.createElement("p");
    p.innerText = `${this._likes} `;

    const i = document.createElement("i");
    i.classList.add("fa-solid", "fa-heart");

    div.append(h2);
    div.append(p);
    div.append(i);
    card.append(img);
    card.append(div);
    sectionMedia.append(card);

    img.addEventListener("click", () => {
      sliderBg.classList.add("active");
      this._slide.classList.add("active");

      // sends back an array containing all elements targeted by the '.slide-container' selector.
      let slideContainers = Object.values(document.querySelectorAll(".slide-container"));

      // updates and returns count with the index of the array key containing an attribute .style.display who's worth "flex".
      slideContainers.filter((res) => {
        if (res.classList.contains("active")) {
          count = slideContainers.indexOf(res);
        }
      });
    });

    i.addEventListener("click", () => {
      if (this._likesCounter === this.likes && !this._liked) {
        this._likesCounter++;
        this._likes++;
        p.innerText = `${this._likes} `;
        this._liked = true;
        totalLikes++;
        sectionPrice.innerHTML = `<p>${totalLikes}&nbsp;<i class="fa-solid fa-heart"></i></p><p>${activePhotographer.price}€&#8239;/&#8239;jour</p>`;
      } else {
        this._likesCounter--;
        this._likes--;
        p.innerText = `${this._likes} `;
        this._liked = false;
        totalLikes--;
        sectionPrice.innerHTML = `<p>${totalLikes}&nbsp;<i class="fa-solid fa-heart"></i></p><p>${activePhotographer.price}€&#8239;/&#8239;jour</p>`;
      }
    });
  }

  createSlide() {
    this._slide.classList.add("slide-container");
    const slideContent = `
          <article class="slide">
            <img src="assets/media/${this._image}" alt="${this._title}"/>
            <h2>${this._title}</h2>
          </article>
      `;
    this._slide.innerHTML = slideContent;
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
    this._liked = false;
    this._likesCounter = this._likes;
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

    const video = document.createElement("video");
    video.setAttribute("src", `assets/media/${this._video}`);
    video.setAttribute("title", `${this._title}`);
    video.setAttribute("controls", "");
    video.innerText = `${this.title}`;

    const div = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.innerText = `${this._title}`;

    const p = document.createElement("p");
    p.innerText = `${this._likes} `;

    const i = document.createElement("i");
    i.classList.add("fa-solid", "fa-heart");

    div.append(h2);
    div.append(p);
    div.append(i);
    card.append(video);
    card.append(div);
    sectionMedia.append(card);

    video.addEventListener("click", (e) => {
      e.preventDefault();
      sliderBg.classList.add("active");
      this._slide.classList.add("active");
      // sends back an array containing all elements targeted by the '.slide-container' selector.
      let slideContainers = Object.values(document.querySelectorAll(".slide-container"));

      // updates and returns count with the index of the array key containing an attribute .style.display who's worth "flex".
      slideContainers.filter((res) => {
        if (res.classList.contains("active")) {
          count = slideContainers.indexOf(res);
        }
      });
    });

    i.addEventListener("click", () => {
      if (this._likesCounter === this.likes && !this._liked) {
        this._likesCounter++;
        this._likes++;
        p.innerText = `${this._likes} `;
        this._liked = true;
        totalLikes++;
        sectionPrice.innerHTML = `<p>${totalLikes}&nbsp;<i class="fa-solid fa-heart"></i></p><p>${activePhotographer.price}€&#8239;/&#8239;jour</p>`;
      } else {
        this._likesCounter--;
        this._likes--;
        p.innerText = `${this._likes} `;
        this._liked = false;
        totalLikes--;
        sectionPrice.innerHTML = `<p>${totalLikes}&nbsp;<i class="fa-solid fa-heart"></i></p><p>${activePhotographer.price}€&#8239;/&#8239;jour</p>`;
      }
    });
  }

  createSlide() {
    this._slide.classList.add("slide-container");
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

// factory
class MediaFactory {
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
  totalLikes = i;
}

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

function slider() {
  const close = document.querySelector(".close");
  const previous = document.querySelector(".previous");
  const next = document.querySelector(".next");

  let slideContainers = Object.values(document.querySelectorAll(".slide-container"));

  close.addEventListener("click", () => {
    sliderBg.classList.remove("active");
    slideContainers[count].classList.remove("active");
  });

  previous.addEventListener("click", () => {
    //exécute le code ci-dessous quand le bouton previous du slider est pressé.
    slideContainers[count].classList.remove("active");
    if (count > 0) {
      count--;
    } else {
      count = slideContainers.length - 1;
    }

    slideContainers[count].classList.add("active");
  });

  next.addEventListener("click", () => {
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

// - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - = - //

// sorting
async function Sort(object, sortBy) {
  sectionMedia.innerHTML = ``;
  sectionSlider.innerHTML = `
    <button type="button" class="close">
      <i class="fa-sharp fa-solid fa-xmark"></i>
    </button>
    <button type="button" class="previous">
      <i class="fa-sharp fa-solid fa-chevron-left"></i>
    </button>
    <button type="button" class="next">
      <i class="fa-sharp fa-solid fa-chevron-right"></i>
    </button>
  `;
  await object;
  // object => array
  let array = Object.values(object);

  switch (sortBy) {
    // likes
    case 0:
      sortedMedias = array.sort((a, b) => b.likes - a.likes);
      sortedMedias.forEach((key) => key.createArticle());
      sortedMedias.forEach((key) => key.createSlide());
      sortedMedias.forEach((res) => console.log(res.likes));
      break;

    // date
    case 1:
      sortedMedias = array.sort((a, b) => new Date(b.date) - new Date(a.date));
      sortedMedias.forEach((key) => key.createArticle());
      sortedMedias.forEach((key) => key.createSlide());
      sortedMedias.forEach((res) => console.log(res.date));
      break;

    // title
    case 2:
      sortedMedias = array.sort((a, b) => a.title.localeCompare(b.title));
      sortedMedias.forEach((key) => key.createArticle());
      sortedMedias.forEach((key) => key.createSlide());
      sortedMedias.forEach((res) => console.log(res.title));
      break;

    default:
      console.error(`invalid object`);
  }

  slider();
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
  media.forEach((key) => new MediaFactory(key));

  // concatenates all medias together.
  const medias = pictures.concat(videos);

  /* test unit */
  console.log("=*=*=*=*=*=*=*=*=*=");
  console.log(pictures);
  console.log(videos);
  console.log(medias);
  console.log("=_=_=_=_=_=_=_=_=_=");

  // retrieves the right photographer according to his id.
  const photographer = photographers.filter((res) => res.id == id);
  // creates a Photographer instance.
  activePhotographer = new Photographer(photographer[0]);
  // calls the creation function for the banner.
  activePhotographer.createBanner();

  // creates and inserts the price section content.
  getTotalLikes(medias);
  sectionPrice.innerHTML = `<p>${totalLikes}&nbsp;<i class="fa-solid fa-heart"></i></p><p>${activePhotographer.price}€&#8239;/&#8239;jour</p>`;

  // sort initially by likes count (descending)
  Sort(medias, sortBy);

  // returns the selectedIndex attribute of the select.
  sortingSelect.addEventListener("change", () => {
    const selectedIndex = sortingSelect.options.selectedIndex;
    sortBy = selectedIndex;
    Sort(medias, sortBy);
  });
}

app("data/photographers.json");
