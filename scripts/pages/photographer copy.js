// catches page url and stock it into a constant.
const url = new URL(window.location.href);
// catches page url key 'id' and stock it into a constant.
const id = url.searchParams.get("id");
console.log(id);

// return a javascript object from a fetch request.
async function getDatas() {
  const result = await fetch("data/photographers.json");
  const data = await result.json();
  return data;
}

// catches the right photographer and display his datas.
async function getPhotographer() {
  // catches photographers attribute from getDatas()'s returned object.
  const { photographers } = await getDatas();
  // then iterate through it to find the right photographer.
  photographers.forEach((photographer) => {
    if (photographer.id == id) {
      // then destructures it.
      const { name, portrait, city, country, tagline, price, id } = photographer;
      // and applies the obtained constants into focused html elements.
      const h1 = document.querySelector("h1");
      h1.textContent = name;
      const p1 = document.querySelector(".photograph-header p:nth-child(2)");
      p1.textContent = `${city}, ${country}`;
      const p2 = document.querySelector(".photograph-header p:nth-child(3)");
      p2.textContent = tagline;

      const picture = `assets/photographers/${portrait}`;
      const img = document.querySelector(".photograph-header img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", `${name}`);

      const sectionPrice = document.querySelector(".price");
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

getPhotographer();

// catches the right photographer and display his datas.
async function getPhotographs() {
  // catches photographers attribute from getDatas()'s returned object.
  const { media } = await getDatas();
  // then iterate through it to find the right photographer.
  media.forEach((media) => {
    if (media.photographerId == id) {
      if (media.image) {
        const { image, title, likes } = media;
        const sectionMedia = document.querySelector("section.media");
        const div = document.createElement("div");
        const divB = document.createElement("div");
        const img = document.createElement("img");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        sectionMedia.append(div);
        div.append(img);
        div.append(divB);
        divB.append(p1);
        divB.append(p2);

        img.setAttribute("src", `assets/media/${image}`);
        p1.innerText = title;
        p2.innerHTML = `${likes}&nbsp;<i class="fa-solid fa-heart"></i>`;
      } else if (media.video) {
        const { video, title, likes } = media;
        const sectionMedia = document.querySelector("section.media");
        const div = document.createElement("div");
        const divB = document.createElement("div");
        const vid = document.createElement("video");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        sectionMedia.append(div);
        div.append(vid);
        div.append(divB);
        divB.append(p1);
        divB.append(p2);

        vid.setAttribute("src", `assets/media/${video}`);
        vid.setAttribute("controls", "");
        p1.innerText = title;
        p2.innerHTML = `${likes}&nbsp;<i class="fa-solid fa-heart"></i>`;
      }
    }
  });
}

getPhotographs();

class Image {
  constructor(media) {
    this._video = media.video;
    this._title = media.title;
    this._likes = media.likes;
  }
  get tile() {
    const sectionMedia = document.querySelector("section.media");
    const div = document.createElement("div");
    const divB = document.createElement("div");
    const vid = document.createElement("video");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    sectionMedia.append(div);
    div.append(vid);
    div.append(divB);
    divB.append(p1);
    divB.append(p2);

    vid.setAttribute("src", `assets/media/${video}`);
    vid.setAttribute("controls", "");
    p1.innerText = title;
    p2.innerHTML = `${likes}&nbsp;<i class="fa-solid fa-heart"></i>`;
  }
}
