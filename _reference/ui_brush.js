// ============================================
// ARCHIVO: src/components/organic-ui/utils.js
// ============================================
// Utilidades para generar paths orgánicos consistentes

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


// ============================================
// ARCHIVO: src/components/organic-ui/OrganicBox.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateOrganicPath } from './utils';

export const OrganicBox = ({ 
  children, 
  className = "",
  strokeWidth = 5,
  cornerRadius = 20,
  wobbleIntensity = 8,
  backgroundColor = "white",
  strokeColor = "black",
  // Para consistencia, puedes pasar un ID único que genera el mismo path
  pathId = null
}) => {
  // Memorizar el path para evitar re-renders innecesarios
  const pathD = useMemo(() => {
    return generateOrganicPath({
      width: 100,
      height: 100,
      cornerRadius,
      wobbleIntensity,
      seed: pathId ? pathId.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : Math.random()
    });
  }, [cornerRadius, wobbleIntensity, pathId]);

  return (
    <div className={`relative ${className}`}>
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <path
          d={pathD}
          fill={backgroundColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};


// ============================================
// ARCHIVO: src/components/organic-ui/OrganicButton.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateOrganicPath } from './utils';

export const OrganicButton = ({ 
  children, 
  onClick,
  className = "",
  strokeWidth = 6,
  variant = 'default',
  size = 'medium',
  disabled = false,
  type = 'button'
}) => {
  const variants = {
    default: { bg: 'white', text: 'black', hover: '#f3f4f6' },
    primary: { bg: '#3b82f6', text: 'white', hover: '#2563eb' },
    success: { bg: '#10b981', text: 'white', hover: '#059669' },
    danger: { bg: '#ef4444', text: 'white', hover: '#dc2626' },
    warning: { bg: '#f59e0b', text: 'white', hover: '#d97706' },
    gray: { bg: '#6b7280', text: 'white', hover: '#4b5563' }
  };

  const sizes = {
    small: { height: '40px', text: 'text-sm', px: 'px-4' },
    medium: { height: '56px', text: 'text-base', px: 'px-6' },
    large: { height: '72px', text: 'text-lg', px: 'px-8' }
  };

  const color = variants[variant] || variants.default;
  const sizeConfig = sizes[size] || sizes.medium;

  const pathD = useMemo(() => {
    return generateOrganicPath({
      width: 600,
      height: 80,
      cornerRadius: 35,
      wobbleIntensity: 8
    });
  }, []);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed w-full ${sizeConfig.px} ${className}`}
      style={{ height: sizeConfig.height }}
    >
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 80"
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill={color.bg}
          stroke="black"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`relative z-10 font-semibold ${sizeConfig.text}`} style={{ color: color.text }}>
        {children}
      </span>
    </button>
  );
};


// ============================================
// ARCHIVO: src/components/organic-ui/OrganicInput.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateOrganicPath } from './utils';

export const OrganicInput = ({ 
  placeholder = "",
  value,
  onChange,
  type = "text",
  multiline = false,
  rows = 1,
  maxLength,
  className = "",
  strokeWidth = 4,
  disabled = false,
  name,
  id
}) => {
  const height = multiline ? (rows * 40 + 24) : 56;
  
  const pathD = useMemo(() => {
    return generateOrganicPath({
      width: 600,
      height,
      cornerRadius: 18,
      wobbleIntensity: 7
    });
  }, [height]);

  const inputClasses = "relative z-10 w-full h-full px-5 py-3 bg-transparent outline-none text-gray-800 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className={`relative w-full ${className}`} style={{ height: `${height}px` }}>
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 600 ${height}`}
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill="white"
          stroke="black"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          disabled={disabled}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={inputClasses}
        />
      )}
    </div>
  );
};


// ============================================
// ARCHIVO: src/components/organic-ui/OrganicCard.jsx
// ============================================
import React from 'react';
import { OrganicBox } from './OrganicBox';

export const OrganicCard = ({ 
  title,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  strokeWidth = 5
}) => {
  return (
    <OrganicBox 
      className={`p-6 ${className}`}
      strokeWidth={strokeWidth}
    >
      {title && (
        <h3 className={`text-xl font-bold mb-4 ${headerClassName}`}>
          {title}
        </h3>
      )}
      <div className={bodyClassName}>
        {children}
      </div>
    </OrganicBox>
  );
};


// ============================================
// ARCHIVO: src/components/organic-ui/index.js
// ============================================
// Exportar todos los componentes

export { OrganicBox } from './OrganicBox';
export { OrganicButton } from './OrganicButton';
export { OrganicInput } from './OrganicInput';
export { OrganicCard } from './OrganicCard';
export { generateOrganicPath } from './utils';


// ============================================
// ARCHIVO: src/App.jsx - EJEMPLO DE USO
// ============================================
import React, { useState } from 'react';
import { 
  OrganicBox, 
  OrganicButton, 
  OrganicInput, 
  OrganicCard 
} from './components/organic-ui';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, message });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <OrganicBox className="p-8 text-center">
          <h1 className="text-4xl font-black mb-2">Mi Aplicación</h1>
          <p className="text-gray-600">Con estilo orgánico consistente</p>
        </OrganicBox>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OrganicCard title="Card 1">
            <p className="text-gray-600">Contenido de la tarjeta 1</p>
          </OrganicCard>
          
          <OrganicCard title="Card 2">
            <p className="text-gray-600">Contenido de la tarjeta 2</p>
          </OrganicCard>
          
          <OrganicCard title="Card 3">
            <p className="text-gray-600">Contenido de la tarjeta 3</p>
          </OrganicCard>
        </div>

        {/* Form Example */}
        <OrganicBox className="p-8">
          <h2 className="text-2xl font-bold mb-6">Formulario de Contacto</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <OrganicInput
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Mensaje</label>
              <OrganicInput
                multiline
                rows={4}
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
              />
            </div>

            <div className="flex gap-4">
              <OrganicButton variant="primary" type="submit">
                Enviar
              </OrganicButton>
              <OrganicButton variant="default" type="button">
                Cancelar
              </OrganicButton>
            </div>
          </form>
        </OrganicBox>

        {/* Buttons Showcase */}
        <OrganicBox className="p-8">
          <h2 className="text-2xl font-bold mb-6">Variantes de Botones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OrganicButton variant="default">Default</OrganicButton>
            <OrganicButton variant="primary">Primary</OrganicButton>
            <OrganicButton variant="success">Success</OrganicButton>
            <OrganicButton variant="danger">Danger</OrganicButton>
          </div>
        </OrganicBox>

      </div>
    </div>
  );
}

export default App;