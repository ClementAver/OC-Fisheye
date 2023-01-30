class Lightbox {
  static createLightbox() {
    // retrieves a div.lightbox-bg.
    const lightboxBg = document.querySelector("div.lightbox-bg");

    // creates a section.slider.
    const sectionLightbox = document.createElement("section");
    sectionLightbox.classList.add("slider");
    sectionLightbox.setAttribute("aria-label", `media close up view.`);

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

    sectionLightbox.append(closeBtn);
    sectionLightbox.append(previousBtn);
    sectionLightbox.append(nextBtn);

    // empties the section before appending the newly created content.
    lightboxBg.innerHTML = null;
    lightboxBg.append(sectionLightbox);

    closeBtn.addEventListener("click", () => {
      //exécute le code ci-dessous quand le bouton close du slider est pressé.
      let slides = Object.values(document.querySelectorAll(".slide"));
      lightboxBg.classList.remove("active");
      slides[count].classList.remove("active");
      pageFocus(false, true, true);
    });

    previousBtn.addEventListener("click", () => {
      //exécute le code ci-dessous quand le bouton previous du slider est pressé.
      let slides = Object.values(document.querySelectorAll(".slide"));
      slides[count].classList.remove("active");
      if (count > 0) {
        count--;
      } else {
        count = slides.length - 1;
      }
      slides[count].classList.add("active");
    });

    nextBtn.addEventListener("click", () => {
      //exécute le code ci-dessous quand le bouton next du slider est pressé.
      let slides = Object.values(document.querySelectorAll(".slide"));
      slides[count].classList.remove("active");
      if (count < slides.length - 1) {
        count++;
      } else {
        count = 0;
      }
      slides[count].classList.add("active");
    });

    if (LightboxNavKeys === "declared") {
      return;
    } else {
      // 'escape' key
      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightboxBg.classList.contains("active")) {
          // exécute le code ci-dessous quand la touche 'échap' du clavier est pressé.
          let slides = Object.values(document.querySelectorAll(".slide"));
          lightboxBg.classList.remove("active");
          slides[count].classList.remove("active");
          pageFocus(false, true, true);
          LightboxNavKeys = "declared";
        }
      });

      // <-
      window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && lightboxBg.classList.contains("active")) {
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
        LightboxNavKeys = "declared";
      });

      // ->
      window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" && lightboxBg.classList.contains("active")) {
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
        LightboxNavKeys = "declared";
      });
    }
  }

  static createSlides(array) {
    array.forEach((key) => {
      let slide = document.createElement("article");
      slide.classList.add("slide");
      let slideContent = null;
      if (key._image) {
        slideContent = `
            <img src="${key.url}" alt="${key._title}"/>
            <h2>${key._title}</h2>
          `;
      } else if (key._video) {
        slideContent = `
            <video src="${key.url}" controls title="${key._title}">${key._title}</video>
            <h2>${key._title}</h2>
          `;
      } else {
        console.error("invalid object passed to the createSlides 'function'.");
      }

      slide.innerHTML = slideContent;
      const sectionLightbox = document.querySelector("section.slider");
      sectionLightbox.append(slide);
    });
  }

  static pinOn(array) {
    const lightboxBg = document.querySelector("div.lightbox-bg");
    let i = 0;

    array.forEach((key) => {
      key._index = i;
      key.addEventListener("click", () => {
        count = key._index;

        lightboxBg.classList.add("active");

        let slides = Object.values(document.querySelectorAll(".slide"));
        slides[count].classList.add("active");

        pageFocus(true, false, true);
      });

      // 'enter' key
      key.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !lightboxBg.classList.contains("active")) {
          count = key._index;

          lightboxBg.classList.add("active");

          let slides = Object.values(document.querySelectorAll(".slide"));
          slides[count].classList.add("active");
          pageFocus(true, false, true);
        }
      });
      i++;
    });
  }
}
