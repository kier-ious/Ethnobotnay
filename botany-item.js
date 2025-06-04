class BotanyItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('data-title') || 'Untitled';
    const osage = this.getAttribute('data-osage') || 'Unknown';
    const description = this.getAttribute('data-description') || '';
    const image = this.getAttribute('data-img') || '';
    const url = this.getAttribute('data-url') || '#';

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          overflow: hidden;
          max-width: 300px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }

        .card:hover {
          transform: scale(1.02);
        }

        .card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          background: #ddd;
        }

        .card-body {
          padding: 1rem;
        }

        .card-body h2 {
          margin: 0 0 0.25rem;
          font-size: 1.25rem;
          color: #2c3e50;
        }

        .card-body h3 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          color: #16a085;
          font-style: italic;
        }

        .card-body p {
          font-size: 0.9rem;
          color: #444;
        }

        .card-body a {
          display: inline-block;
          margin-top: 0.75rem;
          color: #3498db;
          text-decoration: none;
        }

        .card-body a:hover {
          text-decoration: underline;
        }
      </style>
      <div class="card">
        ${image ? `<img src="${image}" alt="${title}" class="card-img" />` : ''}
        <div class="card-body">
          <h2>${title}</h2>
          <h3>${osage}</h3>
          <p>${description}</p>
          ${url !== '#' ? `<a href="${url}" target="_blank">View Details</a>` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('botany-item', BotanyItem);
