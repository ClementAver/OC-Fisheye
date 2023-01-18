function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const a = document.createElement("a");
    const img = document.createElement("img");

    a.setAttribute("tabindex", "0");
    a.setAttribute("href", `photographer.html?id=${id}`);

    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const p1 = document.createElement("p");
    p1.textContent = `${city}, ${country}`;
    const p2 = document.createElement("p");
    p2.textContent = tagline;
    const p3 = document.createElement("p");
    p3.textContent = `${price}€/jour`;

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
