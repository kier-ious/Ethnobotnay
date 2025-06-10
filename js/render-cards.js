const container = document.getElementById('botany-container');

async function loadEthnobotanyData() {
  try {
    const response = await fetch('data.json');
    const json = await response.json();

    for (const item of json.data) {
      const attrs = item.attributes || {};

      const keywords = [
        attrs.field_common_name,
        attrs.field_scientific_name,
        attrs.field_osage_name
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const botanyItem = document.createElement('div');
      botanyItem.className = 'botany-item';
      botanyItem.setAttribute('data-keywords', keywords);

      const imageUrl = attrs.field_thumbnail_url || `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;

      const fullSummary = attrs.field_card_summary || '';
      const commonName = attrs.field_common_name || '';

      botanyItem.innerHTML = `
        <div class="botany-card">
          ${imageUrl ? `<img src="${imageUrl}" alt="${commonName || 'Plant Image'}" />` : ''}
          <h2 class="scientific-name-ribbon">${attrs.field_scientific_name || ''}</h2>
          <div class="card-content">
            <p class="osage-name">${attrs.field_osage_name || ''}</p>
            <p class="common-name">${commonName}</p>
            <p class="card-summary-full">${fullSummary}</p>
          </div>
        </div>
      `;

      container.appendChild(botanyItem);
    }
  } catch (error) {
    console.error('Failed to load ethnobotany data:', error);
    container.innerHTML = `<p style="color: red;">Failed to load data.</p>`;
  }
}

loadEthnobotanyData();

const searchInput = document.getElementById('search');
const botanyContainer = document.getElementById('botany-container');

searchInput.addEventListener('input', () => {
  const searchVal = searchInput.value.toLowerCase();
  const items = botanyContainer.querySelectorAll('[data-keywords]');

  items.forEach((item) => {
    const keywords = item.dataset.keywords;
    item.style.display = keywords.includes(searchVal) ? 'block' : 'none';
  });
});
