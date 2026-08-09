import * as L from 'leaflet';
import leafletCssUrl from 'leaflet/dist/leaflet.css?url';

const geoJsonUrl = '/data/coverage-zones.geojson';

const ensureLeafletStyles = async (): Promise<void> => {
  const existingLink = document.querySelector<HTMLLinkElement>('[data-leaflet-styles]');

  if (existingLink?.sheet) return;

  await new Promise<void>((resolve, reject) => {
    const link = existingLink ?? document.createElement('link');

    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener(
      'error',
      () => {
        link.remove();
        reject(new Error('Leaflet styles failed to load'));
      },
      { once: true },
    );

    if (!existingLink) {
      link.rel = 'stylesheet';
      link.href = leafletCssUrl;
      link.dataset.leafletStyles = '';
      document.head.append(link);
    }
  });
};

const zoneStyle: L.PathOptions = {
  color: '#116186',
  fillColor: '#cdebf9',
  fillOpacity: 0.42,
  opacity: 0.9,
  weight: 2,
};

const primaryZoneStyle: L.PathOptions = {
  color: '#007cb4',
  fillColor: '#009ee2',
  fillOpacity: 0.62,
  opacity: 1,
  weight: 4,
};

const zoneHoverStyle: L.PathOptions = {
  fillOpacity: 0.7,
  weight: 3,
};

interface CoverageMapOptions {
  onTileFailure?: () => void;
}

export interface CoverageMapHandle {
  destroy: () => void;
  invalidateSize: () => void;
}

const getZoneName = (feature?: GeoJSON.Feature): string | undefined => {
  const name = feature?.properties?.name;
  return typeof name === 'string' ? name : undefined;
};

export const initializeCoverageMap = async (
  mapElement: HTMLElement,
  options: CoverageMapOptions = {},
): Promise<CoverageMapHandle> => {
  await ensureLeafletStyles();

  const map = L.map(mapElement, {
    center: [-34.5705, -58.4865],
    keyboard: true,
    scrollWheelZoom: false,
    zoom: 12,
    zoomControl: true,
  });

  const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  });

  let tileLoaded = false;
  let tileErrors = 0;
  let tileFailureReported = false;

  tileLayer.on('tileload', () => {
    tileLoaded = true;
    tileErrors = 0;
  });

  tileLayer.on('tileerror', () => {
    tileErrors += 1;

    if (!tileLoaded && tileErrors >= 4 && !tileFailureReported) {
      tileFailureReported = true;
      options.onTileFailure?.();
    }
  });

  tileLayer.addTo(map);

  try {
    const response = await fetch(geoJsonUrl);

    if (!response.ok) {
      throw new Error(`GeoJSON request failed with status ${response.status}`);
    }

    const geoJson = (await response.json()) as GeoJSON.FeatureCollection;

    const layer = L.geoJSON(geoJson, {
      style: (feature) =>
        getZoneName(feature) === 'Villa Urquiza' ? primaryZoneStyle : zoneStyle,
      onEachFeature: (feature, featureLayer) => {
        const name = getZoneName(feature);

        if (name) {
          featureLayer.bindPopup(name);
        }

        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          featureLayer.on({
            mouseover: (event) => {
              event.target.setStyle(zoneHoverStyle);
            },
            mouseout: (event) => {
              layer.resetStyle(event.target);
            },
          });
        }
      },
    }).addTo(map);

    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      const desktopLayout = window.matchMedia('(min-width: 768px)').matches;

      map.fitBounds(bounds, {
        maxZoom: 13,
        paddingBottomRight: [20, 20],
        paddingTopLeft: desktopLayout ? [20, 70] : [20, 20],
      });
    }

    return {
      destroy: () => map.remove(),
      invalidateSize: () => map.invalidateSize({ animate: false }),
    };
  } catch (error) {
    map.remove();
    console.error('No se pudo cargar el mapa de cobertura.', error);
    throw error;
  }
};
