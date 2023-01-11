///// global constants.
// catches page url and stock it into a constant.
const url = new URL(window.location.href);
// catches page url key 'id' and stock it into a constant.
const id = url.searchParams.get("id");
const sectionPrice = document.querySelector(".price");
const h1 = document.querySelector("h1");
const p1 = document.querySelector(".photograph-header p:nth-child(2)");
const p2 = document.querySelector(".photograph-header p:nth-child(3)");
const img = document.querySelector(".photograph-header img");
const sectionMedia = document.querySelector("section.media");

// ----------------------

///// return a javascript object from a fetch request.
async function getDatas() {
  const result = await fetch("data/photographers.json");
  const data = await result.json();
  return data;
}

// ----------------------

///// catches the right photographer and displays his informations into the DOM.
async function getPhotographer() {
  // catches photographers attribute from getDatas()'s returned object.
  const { photographers } = await getDatas();
  // then iterate through it to find the right photographer.
  photographers.forEach((photographer) => {
    if (photographer.id == id) {
      // then destructures it.
      const { name, portrait, city, country, tagline, price, id } = photographer;
      // and applies the obtained constants into focused html elements.

      h1.textContent = name;

      p1.textContent = `${city}, ${country}`;

      p2.textContent = tagline;

      const picture = `assets/photographers/${portrait}`;

      img.setAttribute("src", picture);
      img.setAttribute("alt", `${name}`);
      // get the sum of likes of all the photographs of the photographer.
      async function getTotalLikes() {
        // retrieve media attribute instead of photographers.
        const { media } = await getDatas();
        // then iterate through it to find the rights photographers Ids and increments i for all matches.
        let i = 0;
        media.forEach((media) => {
          if (media.photographerId == id) {
            const { likes } = media;
            i += likes;
          }
        });
        sectionPrice.innerHTML = `<p>${i}&nbsp;<i class="fa-solid fa-heart"></i></p> <p>${price}€&#8239;/&#8239;jour</p>`;
      }
      getTotalLikes();
    }
  });
}

// call the above.
getPhotographer();

// ----------------------

///// catches the right photographs and appends them into the DOM.
async function getPhotographs() {
  // catches photographers attribute from getDatas()'s returned object.
  const { media } = await getDatas();
  // then iterate through it to find the right photographer.
  media.forEach((media) => {
    if (media.photographerId == id) {
      if (media.image) {
        new Image(media).create;
      } else if (media.video) {
        new Video(media).create;
      }
    }
  });
}

// call the above.
getPhotographs();

// ----------------------

class Image {
  constructor(media) {
    this._media = media;
  }

  get create() {
    const card = document.createElement("article");
    const cardContent = `
          <img src="assets/media/${this._media.image}" alt="${this._media.title}">
          <div>
            <h2>${this._media.title}</h2>
            <p>${this._media.likes}&nbsp;<i class="fa-solid fa-heart"></i></p>
          </div>
      `;
    card.innerHTML = cardContent;
    sectionMedia.append(card);
  }
}

class Video {
  constructor(media) {
    this._media = media;
  }
  get create() {
    const card = document.createElement("article");
    const cardContent = `
          <video src="assets/media/${this._media.video}" controls title="${this._media.title}">${this._media.title}</video>
          <div>
            <h2>${this._media.title}</h2>
            <p>${this._media.likes}&nbsp;<i class="fa-solid fa-heart"></i></p>
          </div>
      `;
    card.innerHTML = cardContent;
    sectionMedia.append(card);
  }
}
