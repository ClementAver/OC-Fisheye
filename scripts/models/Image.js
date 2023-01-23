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
    const sectionPrice = document.querySelector(".price");
    const card = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", `assets/media/${this._image}`);
    img.setAttribute("tabindex", "0");
    img.setAttribute("alt", `${this._title}`);

    const div = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.innerText = `${this._title}`;

    const p = document.createElement("p");
    p.innerText = `${this._likes} `;

    const i = document.createElement("i");
    i.setAttribute("aria-label", "likes");
    i.classList.add("fa-solid", "fa-heart");

    div.append(h2);
    div.append(p);
    div.append(i);
    card.append(img);
    card.append(div);
    sectionMedia.append(card);

    /*
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
      */

    i.addEventListener("click", () => {
      let totalLikes = parseInt(document.getElementById("total-likes").textContent);
      if (this._likesCounter === this.likes && !this._liked) {
        this._likesCounter++;
        this._likes++;
        this._liked = true;
        totalLikes++;
      } else {
        this._likesCounter--;
        this._likes--;
        this._liked = false;
        totalLikes--;
      }
      p.innerText = `${this._likes} `;
      document.getElementById("total-likes").textContent = totalLikes;
    });
  }

  /*
  createSlide() {
    this._slide.classList.add("slide-container");
    const slideContent = `
          <article class="slide">
            <img src="assets/media/${this._image}" alt="${this._title}"/>
            <h2>${this._title}</h2>
          </article>
      `;
    this._slide.innerHTML = slideContent;
    sectionSlider.setAttribute("aria-label", `image close up view.`);
    sectionSlider.append(this._slide);
  }
*/
}
