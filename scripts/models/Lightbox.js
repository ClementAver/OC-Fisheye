class Lightbox {
  static createLightbox() {
    // creates a div.slider-bg.
    const sliderBg = document.createElement("div");
    sliderBg.classList.add("slider-bg");

    // creates a section.slider.
    const lightboxSection = document.createElement("section");
    lightboxSection.classList.add("slider");
    lightboxSection.setAttribute("aria-label", `media close up view.`);

    // creates a 'close' button.
    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("type", "button");
    closeBtn.classList.add("close");
    closeBtn.setAttribute("aria-label", "Fermer la vue avancée.");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fa-sharp", "fa-solid", "fa-xmark");
    closeBtn.append(closeIcon);

    // creates a 'previous' button.
    const previousBtn = document.createElement("button");
    previousBtn.setAttribute("type", "button");
    previousBtn.classList.add("previous");
    previousBtn.setAttribute("aria-label", "Image précédente.");
    const previousIcon = document.createElement("i");
    previousIcon.classList.add("fa-sharp", "fa-solid", "fa-chevron-left");
    previousBtn.append(previousIcon);

    // creates a 'next' button.
    const nextBtn = document.createElement("button");
    nextBtn.setAttribute("type", "button");
    nextBtn.classList.add("next");
    nextBtn.setAttribute("aria-label", "Image suivante.");
    const nextIcon = document.createElement("i");
    nextIcon.classList.add("fa-sharp", "fa-solid", "fa-chevron-right");
    nextBtn.append(nextIcon);

    lightboxSection.append(closeBtn);
    lightboxSection.append(previousBtn);
    lightboxSection.append(nextBtn);

    sliderBg.append(lightboxSection);

    document.body.append(sliderBg);

    //// listeners.
    closeBtn.addEventListener("click", () => {
      //exécute le code ci-dessous quand le bouton close du slider est pressé.
      let slideContainers = Object.values(document.querySelectorAll(".slide-container"));
      sliderBg.classList.remove("active");
      slideContainers[count].classList.remove("active");
    });

    previousBtn.addEventListener("click", () => {
      //exécute le code ci-dessous quand le bouton previous du slider est pressé.
      let slideContainers = Object.values(document.querySelectorAll(".slide-container"));
      slideContainers[count].classList.remove("active");
      if (count > 0) {
        count--;
      } else {
        count = slideContainers.length - 1;
      }
      slideContainers[count].classList.add("active");
    });

    nextBtn.addEventListener("click", () => {
      //exécute le code ci-dessous quand le bouton next du slider est pressé.
      let slideContainers = Object.values(document.querySelectorAll(".slide-container"));
      slideContainers[count].classList.remove("active");
      if (count < slideContainers.length - 1) {
        count++;
      } else {
        count = 0;
      }
      slideContainers[count].classList.add("active");
    });
  }

  static createSlides(array) {
    array.forEach((key) => {
      key._slide.classList.add("slide-container");
      let slideContent = null;
      if (key._image) {
        slideContent = `
          <article class="slide">
            <img src="${key.url}" alt="${key._title}"/>
            <h2>${key._title}</h2>
          </article>
          `;
      } else if (key._video) {
        slideContent = `
          <article class="slide">
            <video src="${key.url}" controls title="${key._title}">${key._title}</video>
            <h2>${key._title}</h2>
          </article>
          `;
      } else {
        console.error("invalid object passed to the createSlides 'function'.");
      }
      key._slide.innerHTML = slideContent;
      const lightboxSection = document.querySelector("section.slider");
      lightboxSection.append(key._slide);
    });
  }

  static pinOn(array) {
    const sliderBg = document.querySelector("div.slider-bg");
    let i = 0;

    array.forEach((key) => {
      key._index = i;
      key.addEventListener("click", (e) => {
        e.preventDefault();
        count = key._index;

        sliderBg.classList.add("active");

        let slideContainers = Object.values(document.querySelectorAll(".slide-container"));
        slideContainers[count].classList.add("active");
        /*
        // sends back an array containing all elements targeted by the '.slide-container' selector.
        let slideContainers = Object.values(document.querySelectorAll(".slide-container"));

        // updates and returns count with the index of the array key containing an attribute .style.display who's worth "flex".
        slideContainers.filter((res) => {
          if (res.classList.contains("active")) {
            count = slideContainers.indexOf(res);
          }
        });
        */
      });
      i++;
    });
  }
}
