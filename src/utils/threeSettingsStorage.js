/**
 * threeSettingsStorage.js
 * Persistent store and configuration management for Mango Achar 3D Experience.
 * Accessible by both the customer product page and the Admin Panel.
 */

const STORAGE_KEY = 'marusthali_mango_3d_config';

export const default3DSettings = {
  isEnabled: true,
  modelType: 'procedural', // 'procedural' (Three.js PBR WebGL) or 'glb' (custom GLB upload)
  glbUrl: '/models/mango-achar-jar.glb',
  defaultViewAngle: {
    elevation: 12, // degrees
    azimuth: 0,    // degrees
    zoomDistance: 5.5
  },
  autoRotateSpeed: 1.2,
  allowFullscreen: true,
  showIngredientMarkers: true,
  defaultBackground: 'warm-studio', // 'warm-studio' | 'marble' | 'rustic'
  ingredients: [
    {
      id: 'mangoes',
      name: 'Raw Mangoes',
      hindiName: 'कच्ची केरी',
      image: '/images/products/mango-fresh-harvest.jpg',
      icon: '🥭',
      subtitle: 'Fresh and tangy Rajasthani mangoes, handpicked from trusted farms.',
      role: 'Provides the characteristic tangy flavour and robust crisp bite.',
      points: [
        'Naturally tangy & crisp',
        'Rich in dietary fiber',
        'Sun dried for 21 days for concentrated taste',
        'Sourced from Marwar orchards, Rajasthan'
      ]
    },
    {
      id: 'mustard_seeds',
      name: 'Mustard Seeds',
      hindiName: 'काली व पीली राई',
      image: '/images/products/mango-raw-kairi.jpg',
      icon: '⚫',
      subtitle: 'Stone-crushed black and yellow mustard seeds from Rajasthan mandis.',
      role: 'Forms the pungent aromatic base and acts as a natural preservative.',
      points: [
        'Stone-ground coarse texture',
        'Natural pungent warmth',
        'Aids healthy gut digestion',
        'Essential for traditional preservation'
      ]
    },
    {
      id: 'fenugreek',
      name: 'Fenugreek',
      hindiName: 'मेथी दाना',
      image: '/images/process/step-3-spices-oil.jpg',
      icon: '🌾',
      subtitle: 'Plump golden methi dana slow-cured in pure mustard oil.',
      role: 'Balances the sharp tartness of raw mango with wholesome pleasant bitterness.',
      points: [
        'Slowly soaked in mustard oil',
        'Softens completely without sharp bitterness',
        'Known for wholesome metabolic support',
        'Sun-cured over three weeks'
      ]
    },
    {
      id: 'fennel',
      name: 'Fennel Seeds',
      hindiName: 'सौंफ',
      image: '/images/products/mango-stone-mortar.jpg',
      icon: '🌿',
      subtitle: 'Sun-warmed fragrant green Rajasthani fennel seeds.',
      role: 'Imparts delicate sweet notes and royal Marwari aroma.',
      points: [
        'Bold green hand-cleaned seeds',
        'Natural digestive cooling property',
        'Pleasant floral sweet undertone',
        'Lightly bruised for oil release'
      ]
    },
    {
      id: 'red_chilli',
      name: 'Mathania Red Chilli',
      hindiName: 'मथानिया लाल मिर्च',
      image: '/images/products/card-redmirch.jpg',
      icon: '🌶️',
      subtitle: 'Authentic sun-dried Mathania red chillies from Jodhpur desert sands.',
      role: 'Lends the vivid ruby red colour and signature authentic Rajasthani kick.',
      points: [
        'Geographical origin: Mathania, Rajasthan',
        'Naturally deep crimson colour',
        'Zero artificial food colours or oleoresins',
        'Balanced, lingering heat'
      ]
    },
    {
      id: 'mustard_oil',
      name: 'Pure Mustard Oil',
      hindiName: 'कच्ची घानी सरसों तेल',
      image: '/images/process/step-3-spices-oil.jpg',
      icon: '🫗',
      subtitle: 'First-press kacchi ghani cold-pressed mustard oil.',
      role: 'The traditional liquid gold seal that preserves the pickle naturally.',
      points: [
        '100% First-press cold extracted',
        'Creates an anaerobic seal to lock freshness',
        'Pungent, authentic aroma',
        'Rich in healthy unsaturated fatty acids'
      ]
    }
  ],
  layers: [
    {
      id: 'layer_oil',
      name: 'Mustard Oil Layer',
      color: '#EAB308',
      desc: 'Top protective golden seal of pure cold-pressed mustard oil preventing oxidation.'
    },
    {
      id: 'layer_mango',
      name: 'Mango Pieces',
      color: '#84CC16',
      desc: 'Hand-cut Ramkela raw mango cuts, sun-dried and cured with sendha namak.'
    },
    {
      id: 'layer_seeds',
      name: 'Rai & Methi',
      color: '#78350F',
      desc: 'Stone-crushed mustard seeds and oil-soaked fenugreek suspended throughout.'
    },
    {
      id: 'layer_spices',
      name: 'Spices Base',
      color: '#DC2626',
      desc: 'Dense foundation of Mathania chilli, turmeric, kalonji, and compounded hing.'
    }
  ]
};

export function get3DSettings() {
  if (typeof window === 'undefined') return default3DSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return default3DSettings;
    const parsed = JSON.parse(raw);
    return { ...default3DSettings, ...parsed };
  } catch (e) {
    console.warn('Failed to load 3D settings from localStorage:', e);
    return default3DSettings;
  }
}

export function save3DSettings(newSettings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    // Dispatch custom event so any open product viewer updates immediately
    window.dispatchEvent(new CustomEvent('marusthali:3d-settings-changed', { detail: newSettings }));
  } catch (e) {
    console.error('Failed to save 3D settings to localStorage:', e);
  }
}

export function reset3DSettings() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('marusthali:3d-settings-changed', { detail: default3DSettings }));
  return default3DSettings;
}
