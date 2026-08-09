import {
  AttributionControl,
  LngLatBounds,
  Map as MapLibreMap,
  NavigationControl,
  Popup,
  setWorkerUrl,
  type MapLayerMouseEvent,
  type StyleSpecification,
} from 'maplibre-gl';
import type { FeatureCollection, MultiPolygon } from 'geojson';
import mapLibreCssUrl from 'maplibre-gl/dist/maplibre-gl.css?url';
import mapLibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

setWorkerUrl(mapLibreWorkerUrl);

const geoJsonUrl = '/data/coverage-zones.geojson';
const styleUrl = 'https://tiles.openfreemap.org/styles/positron';
const sourceId = 'coverage-zones';
const fillLayerId = 'coverage-zones-fill';
const lineLayerId = 'coverage-zones-line';
const labelLayerId = 'coverage-zones-label';

interface CoverageZoneProperties {
  name: string;
  source?: string;
}

type CoverageZones = FeatureCollection<MultiPolygon, CoverageZoneProperties>;

export interface CoverageMapHandle {
  destroy: () => void;
  resize: () => void;
}

let stylesPromise: Promise<void> | undefined;

const ensureMapLibreStyles = async (): Promise<void> => {
  const existingLink = document.querySelector<HTMLLinkElement>(
    '[data-maplibre-styles]',
  );

  if (existingLink?.sheet) return;

  stylesPromise ??= new Promise<void>((resolve, reject) => {
    const link = existingLink ?? document.createElement('link');

    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener(
      'error',
      () => {
        link.remove();
        reject(new Error('MapLibre styles failed to load'));
      },
      { once: true },
    );

    if (!existingLink) {
      link.rel = 'stylesheet';
      link.href = mapLibreCssUrl;
      link.dataset.maplibreStyles = '';
      document.head.append(link);
    }
  });

  try {
    await stylesPromise;
  } catch (error) {
    stylesPromise = undefined;
    throw error;
  }
};

const fetchJson = async <Result>(url: string, label: string): Promise<Result> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${label} request failed with status ${response.status}`);
  }

  return (await response.json()) as Result;
};

const waitForStyle = (map: MapLibreMap): Promise<void> => {
  if (map.isStyleLoaded()) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('Map style timed out'));
    }, 15_000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      map.off('load', handleLoad);
      map.off('style.load', handleLoad);
      map.off('error', handleError);
    };

    const handleLoad = () => {
      cleanup();
      resolve();
    };

    const handleError = (event: { error?: Error }) => {
      cleanup();
      reject(event.error ?? new Error('Map style failed to load'));
    };

    map.on('load', handleLoad);
    map.on('style.load', handleLoad);
    map.on('error', handleError);

    window.requestAnimationFrame(() => {
      if (map.isStyleLoaded()) handleLoad();
    });
  });
};

const waitForCoverageLayer = (map: MapLibreMap): Promise<void> =>
  new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('Coverage layer timed out'));
    }, 10_000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      map.off('render', handleRender);
      map.off('sourcedata', handleRender);
      map.off('error', handleError);
    };

    const handleRender = () => {
      if (!map.getSource(sourceId) || !map.isSourceLoaded(sourceId)) return;

      cleanup();
      map.triggerRepaint();
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => resolve()),
      );
    };

    const handleError = (event: { error?: Error; sourceId?: string }) => {
      if (event.sourceId !== sourceId) return;
      cleanup();
      reject(event.error ?? new Error('Coverage layer failed to load'));
    };

    map.on('render', handleRender);
    map.on('sourcedata', handleRender);
    map.on('error', handleError);
    window.requestAnimationFrame(handleRender);
  });

const extendBounds = (bounds: LngLatBounds, coordinates: unknown): void => {
  if (!Array.isArray(coordinates)) return;

  if (
    coordinates.length >= 2 &&
    typeof coordinates[0] === 'number' &&
    typeof coordinates[1] === 'number'
  ) {
    bounds.extend([coordinates[0], coordinates[1]]);
    return;
  }

  coordinates.forEach((coordinate) => extendBounds(bounds, coordinate));
};

const createPopupContent = (name: string): HTMLElement => {
  const content = document.createElement('div');
  const eyebrow = document.createElement('span');
  const title = document.createElement('strong');

  eyebrow.className = 'coverage-popup__eyebrow';
  eyebrow.textContent = 'Zona de clases';
  title.className = 'coverage-popup__name';
  title.textContent = name;
  content.append(eyebrow, title);

  return content;
};

const getZoneName = (event: MapLayerMouseEvent): string | undefined => {
  const name = event.features?.[0]?.properties?.name;
  return typeof name === 'string' ? name : undefined;
};

export const initializeCoverageMap = async (
  mapElement: HTMLElement,
): Promise<CoverageMapHandle> => {
  const [style, zones] = await Promise.all([
    fetchJson<StyleSpecification>(styleUrl, 'Map style'),
    fetchJson<CoverageZones>(geoJsonUrl, 'Coverage GeoJSON'),
    ensureMapLibreStyles(),
  ]);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const map = new MapLibreMap({
    attributionControl: false,
    center: [-58.4865, -34.5705],
    cooperativeGestures: true,
    dragRotate: false,
    keyboard: true,
    maxPitch: 0,
    maxZoom: 16,
    minZoom: 10,
    pitchWithRotate: false,
    renderWorldCopies: false,
    style,
    touchPitch: false,
    container: mapElement,
    zoom: 11.2,
    locale: {
      'AttributionControl.ToggleAttribution': 'Mostrar atribución',
      'Map.Title': 'Mapa interactivo de las zonas donde AKDemia da clases',
      'NavigationControl.ZoomIn': 'Acercar',
      'NavigationControl.ZoomOut': 'Alejar',
      'Popup.Close': 'Cerrar',
      'CooperativeGesturesHandler.WindowsHelpText': 'Usá Ctrl + rueda para acercar el mapa',
      'CooperativeGesturesHandler.MacHelpText': 'Usá ⌘ + rueda para acercar el mapa',
      'CooperativeGesturesHandler.MobileHelpText': 'Usá dos dedos para mover el mapa',
    },
  });

  try {
    await waitForStyle(map);

    map.addControl(
      new NavigationControl({ showCompass: false, visualizePitch: false }),
      'top-right',
    );
    map.addControl(
      new AttributionControl({
        compact: true,
      }),
      'bottom-right',
    );

    map.addSource(sourceId, {
      type: 'geojson',
      data: zones,
      promoteId: 'name',
    });

    map.addLayer({
      id: fillLayerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': [
          'case',
          ['==', ['get', 'name'], 'Villa Urquiza'],
          '#009ee2',
          '#64c5ec',
        ],
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.72,
          ['==', ['get', 'name'], 'Villa Urquiza'],
          0.58,
          0.32,
        ],
      },
    });

    map.addLayer({
      id: lineLayerId,
      type: 'line',
      source: sourceId,
      paint: {
        'line-color': [
          'case',
          ['==', ['get', 'name'], 'Villa Urquiza'],
          '#007cb4',
          '#116186',
        ],
        'line-opacity': 0.95,
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          3,
          ['==', ['get', 'name'], 'Villa Urquiza'],
          2.5,
          1.35,
        ],
      },
    });

    map.addLayer({
      id: labelLayerId,
      type: 'symbol',
      source: sourceId,
      minzoom: 10.5,
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Noto Sans Bold'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 10.5, 10, 13, 12],
        'text-padding': 3,
      },
      paint: {
        'text-color': '#191a33',
        'text-halo-color': 'rgba(255,255,255,0.9)',
        'text-halo-width': 1.5,
      },
    });

    const bounds = new LngLatBounds();
    zones.features.forEach((feature) => extendBounds(bounds, feature.geometry.coordinates));

    if (!bounds.isEmpty()) {
      const compactLayout = window.matchMedia('(max-width: 767px)').matches;
      map.fitBounds(bounds, {
        duration: reducedMotion ? 0 : 650,
        maxZoom: 12.4,
        padding: compactLayout
          ? { top: 72, right: 28, bottom: 44, left: 28 }
          : { top: 76, right: 44, bottom: 52, left: 44 },
      });
    }

    let hoveredFeatureId: string | number | undefined;

    const clearHover = () => {
      if (hoveredFeatureId === undefined) return;
      map.setFeatureState({ source: sourceId, id: hoveredFeatureId }, { hover: false });
      hoveredFeatureId = undefined;
    };

    if (supportsHover) {
      map.on('mousemove', fillLayerId, (event) => {
        const featureId = event.features?.[0]?.id;

        if (featureId === undefined || featureId === hoveredFeatureId) return;

        clearHover();
        hoveredFeatureId = featureId;
        map.setFeatureState({ source: sourceId, id: featureId }, { hover: true });
      });

      map.on('mouseenter', fillLayerId, () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', fillLayerId, () => {
        clearHover();
        map.getCanvas().style.cursor = '';
      });
    }

    map.on('click', fillLayerId, (event) => {
      const name = getZoneName(event);

      if (!name) return;

      new Popup({
        className: 'coverage-popup',
        closeButton: true,
        closeOnClick: true,
        offset: 12,
      })
        .setLngLat(event.lngLat)
        .setDOMContent(createPopupContent(name))
        .addTo(map);
    });

    await waitForCoverageLayer(map);

    return {
      destroy: () => map.remove(),
      resize: () => map.resize(),
    };
  } catch (error) {
    map.remove();
    throw error;
  }
};
