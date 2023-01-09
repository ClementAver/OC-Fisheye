function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const a = document.createElement("a");
    const img = document.createElement("img");
    const userDescription = document.createElement("span");
    userDescription.textContent = name;
    userDescription.id = name.replace(/ /g, "");
    userDescription.classList.add("sr-only");
    a.setAttribute("aria-describedby", name.replace(/ /g, ""));
    a.setAttribute("tabindex", "0");
    a.setAttribute("href", `photographer.html?id=${id}`);

    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const p1 = document.createElement("p");
    p1.textContent = `${city}, ${country}`;
    const p2 = document.createElement("p");
    p2.textContent = tagline;
    const p3 = document.createElement("p");
    p3.textContent = `${price}€/jour`;

    a.appendChild(userDescription);
    a.appendChild(img);
    a.appendChild(h2);

    article.appendChild(a);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
