import * as L from 'leaflet';

const mapSelector = '[data-coverage-map]';
const statusSelector = '[data-coverage-map-status]';
const geoJsonUrl = '/data/coverage-zones.geojson';

const defaultCenter: L.LatLngExpression = [-34.5705, -58.4865];

const zoneStyle: L.PathOptions = {
  color: '#009ee2',
  fillColor: '#cdebf9',
  fillOpacity: 0.34,
  opacity: 0.95,
  weight: 2,
};

const zoneHoverStyle: L.PathOptions = {
  fillOpacity: 0.58,
  weight: 3,
};

const showStatus = (mapElement: Element) => {
  const section = mapElement.closest('section');
  const status = section?.querySelector<HTMLElement>(statusSelector);
  status?.classList.remove('hidden');
};

const initializeCoverageMap = async (mapElement: HTMLElement) => {
  if (mapElement.dataset.mapReady === 'true') {
    return;
  }

  mapElement.dataset.mapReady = 'true';

  const map = L.map(mapElement, {
    center: defaultCenter,
    scrollWheelZoom: false,
    zoom: 12,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  try {
    const response = await fetch(geoJsonUrl);

    if (!response.ok) {
      throw new Error(`GeoJSON request failed with status ${response.status}`);
    }

    const geoJson = (await response.json()) as GeoJSON.FeatureCollection;

    const layer = L.geoJSON(geoJson, {
      style: zoneStyle,
      onEachFeature: (feature, featureLayer) => {
        const name = feature.properties?.name;

        if (typeof name === 'string') {
          featureLayer.bindPopup(name);
        }

        featureLayer.on({
          mouseover: (event) => {
            event.target.setStyle(zoneHoverStyle);
          },
          mouseout: (event) => {
            layer.resetStyle(event.target);
          },
        });
      },
    }).addTo(map);

    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [24, 24] });
    }
  } catch (error) {
    console.error('No se pudo cargar el mapa de cobertura.', error);
    showStatus(mapElement);
  }
};

if (typeof window !== 'undefined') {
  document
    .querySelectorAll<HTMLElement>(mapSelector)
    .forEach((mapElement) => {
      void initializeCoverageMap(mapElement);
    });
}
