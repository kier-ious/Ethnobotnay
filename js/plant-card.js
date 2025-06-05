class PlantCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const scientificName = this.getAttribute('scientific-name') || '';
    const osageName = this.getAttribute('osage-name') || '';
    const description = this.getAttribute('description') || '';
    const imageSrc = this.getAttribute('image-src') || '';

    this.shadowRoot.innerHTML = `
      <style>
        @import "./styles.css";
      </style>
      <div class="card">
        <img src="${imageSrc}" alt="${scientificName}" class="card-img"/>
        <div class="card-body">
          <h2 class="sci-name">${scientificName}</h2>
          <h3 class="osage-name">${osageName}</h3>
          <p class="desc">${description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('plant-card', PlantCard);
