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
    return `
      <div>
        <h1>${this._name}</h1>
        <p>${this._city}, ${this._country}</p>
        <p>${this._tagline}</p>
      </div>

      <span class="sr-only" id="contact-btn-description">Ouvre le formulaire de contact</span>
      <button type="button" aria-labelledby="contact-btn-description" class="contact-button" onclick="displayModal()">Contactez-moi</button>
      <div>
      <img src="assets/photographers/${this._portrait}" alt="${this._name}"/>
      </div>
    `;
  }
}
