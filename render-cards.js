const proxy = 'https://api.allorigins.win/get?url=';
const API_URL = 'https://www.osageculture.com/jsonapi/node/Ethnobotany';
const container = document.getElementById('botany-container');

async function loadEthnobotanyData() {
  try {
    const response = await fetch(proxy + encodeURIComponent(API_URL));
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const json = JSON.parse(data.contents);

    for (const item of json.data) {
      const botanyItem = document.createElement('botany-item');

      botanyItem.setAttribute('data-title', item.attributes.title || '');
      botanyItem.setAttribute('data-osage', item.attributes.field_osage_name || '');
      botanyItem.setAttribute('data-description', item.attributes.field_short_description || '');
      botanyItem.setAttribute('data-url', item.attributes.path?.alias || '');

      const imageEndpoint = item.relationships.field_image?.links?.related?.href;

      if (imageEndpoint) {
        try {
          const imageRes = await fetch(imageEndpoint);
          const imageData = await imageRes.json();
          const imagePath = imageData.data?.attributes?.uri?.url;

          if (imagePath) {
            botanyItem.setAttribute('data-img', `https://www.osageculture.com${imagePath}`);
          }
        } catch (err) {
          console.warn('Image fetch failed:', err);
        }
      }

      container.appendChild(botanyItem);
    }
  } catch (error) {
    console.error('Failed to load ethnobotany data:', error);
    container.innerHTML = `<p style="color: red;">Failed to load data. Please try again later.</p>`;
  }
}

loadEthnobotanyData();
