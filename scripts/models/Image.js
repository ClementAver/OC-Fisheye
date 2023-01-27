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
    i.setAttribute("tabindex", "0");
    i.classList.add("fa-solid", "fa-heart");

    div.append(h2);
    div.append(p);
    div.append(i);
    card.append(img);
    card.append(div);
    sectionMedia.append(card);

    // media's likes counter.
    i.addEventListener("click", () => {
      let totalLikes = parseInt(document.getElementById("total-likes").textContent);
      if (this._likesCounter === this.likes && !this._liked) {
        this._likesCounter++;
        this._likes++;
        this._liked = true;
        totalLikes++;
        i.classList.add("likes-counter");
      } else {
        this._likesCounter--;
        this._likes--;
        this._liked = false;
        totalLikes--;
        i.classList.remove("likes-counter");
      }
      p.innerText = `${this._likes} `;
      document.getElementById("total-likes").textContent = totalLikes;
    });

    // 'enter' key
    i.addEventListener("keydown", (event) => {
      console.log(1);
      if ((event.which === 13) & (document.activeElement === i)) {
        console.log(2);
        let totalLikes = parseInt(document.getElementById("total-likes").textContent);
        if (this._likesCounter === this.likes && !this._liked) {
          this._likesCounter++;
          this._likes++;
          this._liked = true;
          totalLikes++;
          i.classList.add("likes-counter");
        } else {
          this._likesCounter--;
          this._likes--;
          this._liked = false;
          totalLikes--;
          i.classList.remove("likes-counter");
        }
        p.innerText = `${this._likes} `;
        document.getElementById("total-likes").textContent = totalLikes;
      }
    });
  }
}
