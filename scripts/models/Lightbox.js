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
    console.log(lightboxSection);

    //// listeners.

    closeBtn.addEventListener("click", () => {
      //exécute le code ci-dessous quand le bouton close du slider est pressé.
      sliderBg.classList.remove("active");
      slideContainers[count].classList.remove("active");
    });

    previousBtn.addEventListener("click", () => {
      //exécute le code ci-dessous quand le bouton previous du slider est pressé.
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
      const slideContent = `
          <article class="slide">
            <img src="${key.url}" alt="${key._title}"/>
            <h2>${key._title}</h2>
          </article>
      `;
      key._slide.innerHTML = slideContent;
      const lightboxSection = document.querySelector("section.slider");
      lightboxSection.append(key._slide);
      console.log(lightboxSection);
      console.log(key._slide);
    });
  }
}
