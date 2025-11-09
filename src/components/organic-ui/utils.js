// ============================================
// ARCHIVO: src/components/organic-ui/utils.js
// ============================================
// Utilidades para generar paths orgánicos consistentes

/**
 * Genera un path SVG regular (rectángulo con esquinas redondeadas)
 * @param {Object} config - Configuración del path
 * @param {number} config.width - Ancho del path
 * @param {number} config.height - Alto del path
 * @param {number} config.cornerRadius - Radio de las esquinas
 * @returns {string} Path SVG
 */
export const generateRegularPath = (config) => {
  const {
    width = 600,
    height = 100,
    cornerRadius = 20
  } = config;

  const cr = cornerRadius;
  const edge = 0; // Sin offset para bordes perfectos

  // Path regular con esquinas redondeadas uniformes
  return `
    M ${cr} ${edge}
    L ${width - cr} ${edge}
    Q ${width} ${edge}, ${width} ${cr}
    L ${width} ${height - cr}
    Q ${width} ${height}, ${width - cr} ${height}
    L ${cr} ${height}
    Q ${edge} ${height}, ${edge} ${height - cr}
    L ${edge} ${cr}
    Q ${edge} ${edge}, ${cr} ${edge}
    Z
  `;
};

/**
 * Genera un path SVG orgánico con bordes irregulares tipo "brushstroke"
 * @param {Object} config - Configuración del path
 * @param {number} config.width - Ancho del path
 * @param {number} config.height - Alto del path
 * @param {number} config.cornerRadius - Radio de las esquinas
 * @param {number} config.wobbleIntensity - Intensidad de la irregularidad
 * @param {number} config.seed - Semilla para generar paths consistentes
 * @returns {string} Path SVG
 */
export const generateOrganicPath = (config) => {
  const {
    width = 600,
    height = 100,
    cornerRadius = 20,
    wobbleIntensity = 8,
    seed = Math.random() // Para paths consistentes, usa un seed fijo
  } = config;

  // Generador de números pseudo-aleatorios con seed
  const seededRandom = (seed) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const wobble = wobbleIntensity;
  const w = Array.from({ length: 20 }, (_, i) => 
    seededRandom(seed + i) * wobble - wobble/2
  );

  // Calcular porcentajes
  const cr = cornerRadius;
  const edge = 2;

  return `
    M ${cr + w[0]} ${edge + w[1]}
    Q ${width * 0.25 + w[2]} ${edge + w[3]}, ${width * 0.5 + w[4]} ${edge + w[5]}
    Q ${width * 0.75 + w[6]} ${edge + w[7]}, ${width - cr + w[8]} ${edge + w[9]}
    Q ${width - edge + w[10]} ${edge + w[11]}, ${width - edge + w[12]} ${cr + w[13]}
    Q ${width - edge + w[14]} ${height * 0.5 + w[15]}, ${width - edge + w[0]} ${height - cr + w[1]}
    Q ${width - edge + w[2]} ${height - edge + w[3]}, ${width - cr + w[4]} ${height - edge + w[5]}
    Q ${width * 0.75 + w[6]} ${height - edge + w[7]}, ${width * 0.5 + w[8]} ${height - edge + w[9]}
    Q ${width * 0.25 + w[10]} ${height - edge + w[11]}, ${cr + w[12]} ${height - edge + w[13]}
    Q ${edge + w[14]} ${height - edge + w[15]}, ${edge + w[0]} ${height - cr + w[1]}
    Q ${edge + w[2]} ${height * 0.5 + w[3]}, ${edge + w[4]} ${cr + w[5]}
    Q ${edge + w[6]} ${edge + w[7]}, ${cr + w[8]} ${edge + w[9]}
    Z
  `;
};

/**
 * Genera un círculo orgánico para checkboxes, radio buttons, etc.
 * @param {Object} config - Configuración del círculo
 * @param {number} config.size - Tamaño del círculo
 * @param {number} config.wobbleIntensity - Intensidad de la irregularidad
 * @param {number} config.seed - Semilla para consistencia
 * @returns {string} Path SVG
 */
export const generateOrganicCircle = (config) => {
  const {
    size = 100,
    wobbleIntensity = 3,
    seed = Math.random()
  } = config;

  const seededRandom = (seed) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const center = size / 2;
  const baseRadius = size / 2 - 4;
  const points = 16; // Número de puntos para el círculo
  
  let path = '';
  
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const wobble = seededRandom(seed + i) * wobbleIntensity - wobbleIntensity / 2;
    const radius = baseRadius + wobble;
    
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    
    if (i === 0) {
      path += `M ${x} ${y}`;
    } else {
      // Usar curvas cuadráticas para suavizar
      const prevAngle = ((i - 1) / points) * Math.PI * 2;
      const prevWobble = seededRandom(seed + i - 1) * wobbleIntensity - wobbleIntensity / 2;
      const prevRadius = baseRadius + prevWobble;
      const prevX = center + Math.cos(prevAngle) * prevRadius;
      const prevY = center + Math.sin(prevAngle) * prevRadius;
      
      const cpX = (prevX + x) / 2;
      const cpY = (prevY + y) / 2;
      
      path += ` Q ${cpX} ${cpY}, ${x} ${y}`;
    }
  }
  
  path += ' Z';
  return path;
};

/**
 * Convierte un string a un número seed consistente
 * @param {string} str - String para convertir
 * @returns {number} Seed numérico
 */
export const stringToSeed = (str) => {
  if (!str) return Math.random();
  return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
};

/**
 * Variantes de colores predefinidas
 */
export const colorVariants = {
  default: { 
    bg: '#ffffff', 
    text: '#000000', 
    hover: '#f3f4f6',
    border: '#000000'
  },
  primary: { 
    bg: '#3b82f6', 
    text: '#ffffff', 
    hover: '#2563eb',
    border: '#1e40af'
  },
  success: { 
    bg: '#10b981', 
    text: '#ffffff', 
    hover: '#059669',
    border: '#047857'
  },
  danger: { 
    bg: '#ef4444', 
    text: '#ffffff', 
    hover: '#dc2626',
    border: '#b91c1c'
  },
  warning: { 
    bg: '#f59e0b', 
    text: '#ffffff', 
    hover: '#d97706',
    border: '#b45309'
  },
  gray: { 
    bg: '#6b7280', 
    text: '#ffffff', 
    hover: '#4b5563',
    border: '#374151'
  },
  info: {
    bg: '#06b6d4',
    text: '#ffffff',
    hover: '#0891b2',
    border: '#0e7490'
  }
};

/**
 * Configuraciones de tamaño predefinidas
 */
export const sizeConfigs = {
  small: { 
    height: '32px', 
    text: 'text-xs', 
    px: 'px-3',
    py: 'py-1'
  },
  medium: { 
    height: '40px', 
    text: 'text-sm', 
    px: 'px-4',
    py: 'py-2'
  },
  large: { 
    height: '48px', 
    text: 'text-base', 
    px: 'px-5',
    py: 'py-2.5'
  }
};

export const brushShadows = {
  soft: 'drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.06))',
  medium: 'drop-shadow(6px 6px 0 rgba(0, 0, 0, 0.08))'
};

export const organicSeeds = {
  box: 87431,
  button: 12345,
  input: 54321,
  selectTrigger: 11111,
  selectMenu: 22222,
  tooltip: 99999,
  radioOuter: 44444,
  radioInner: 55555,
  tabsLine: 42,
  popoverPointer: 908,
  sliderLine: 70007,
  stepperLine: 52021
};

export const organicShapePresets = {
  container: { width: 600, height: 220, cornerRadius: 16, wobble: 6 },
  button: { cornerRadius: 20, wobble: 8, widthRatio: 15 },
  input: { width: 600, cornerRadius: 14, wobble: 10 },
  selectTrigger: { width: 600, cornerRadius: 14, wobble: 8 },
  selectMenu: { width: 520, cornerRadius: 18, wobble: 6 },
  tooltip: { cornerRadius: 12, wobble: 5 },
  popover: { cornerRadius: 14, wobble: 3 }
};

export { spacingTokens, typographyTokens, getSpacing, getFontFamily, getFontSize, getFontWeight, colorTokens, getColor } from './theme';

