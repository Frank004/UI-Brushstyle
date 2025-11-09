# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a UI Brushstyle! Esta guía te ayudará a empezar.

## 🛠️ Configuración del Entorno

### Requisitos Previos

- Node.js 18+ 
- pnpm 8+ (requerido)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/yourusername/ui-brushstyle.git
cd ui-brushstyle

# Instalar dependencias con pnpm
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

## 📝 Convención de Commits

Usamos el formato de commits semánticos:

```
<type>(<scope>): <message>
```

### Tipos Permitidos

- `Feat` - Nueva funcionalidad
- `Fix` - Corrección de bugs
- `Docs` - Cambios en documentación
- `Style` - Cambios de formato (no afectan el código)
- `Refactor` - Refactorización de código
- `Test` - Agregar o modificar tests
- `Chore` - Tareas de mantenimiento

### Ejemplos

```bash
Feat(button): add new size variant
Fix(modal): fix overlay click behavior
Docs(readme): update installation instructions
Refactor(utils): optimize path generation
Style(components): format code with prettier
Test(checkbox): add unit tests
Chore(deps): update dependencies
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   └── organic-ui/
│       ├── utils.js              # Utilidades compartidas
│       ├── Organic*.jsx          # Componentes
│       └── index.js              # Exportaciones
├── App.jsx                       # Demo/Playground
├── main.jsx                      # Entry point
└── index.css                     # Estilos globales
```

## 🎨 Creando un Nuevo Componente

1. **Crear el archivo del componente** en `src/components/organic-ui/`

```jsx
// OrganicNewComponent.jsx
import React, { useMemo } from 'react';
import { generateOrganicPath } from './utils';

export const OrganicNewComponent = ({ 
  children,
  className = "",
  // ... otras props
}) => {
  const pathD = useMemo(() => {
    return generateOrganicPath({
      width: 600,
      height: 80,
      cornerRadius: 20,
      wobbleIntensity: 8,
      seed: 12345 // Usa un seed único
    });
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Tu implementación */}
    </div>
  );
};
```

2. **Exportar en `index.js`**

```javascript
export { OrganicNewComponent } from './OrganicNewComponent';
```

3. **Agregar al demo en `App.jsx`**

```jsx
import { OrganicNewComponent } from './components/organic-ui';

// Usar en el JSX
<OrganicNewComponent>
  Demo del nuevo componente
</OrganicNewComponent>
```

4. **Documentar en el README**

Agregar sección con ejemplos de uso y props disponibles.

## ✅ Principios de Diseño

Todos los componentes deben seguir estos principios:

### Single Responsibility
Cada componente debe tener una única responsabilidad bien definida.

### DRY (Don't Repeat Yourself)
Usa utilidades compartidas en `utils.js` para evitar duplicación.

### Separation of Concerns
- Lógica de generación de paths → `utils.js`
- Componentes visuales → Archivos individuales
- Estilos → Tailwind CSS + CSS modules cuando sea necesario

### Performance
- Usa `useMemo()` para cachear paths SVG
- Usa `useCallback()` para funciones que se pasan como props
- Evita re-renders innecesarios

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén disponibles)
pnpm test

# Ejecutar linter
pnpm lint
```

## 📦 Build

```bash
# Build de la librería (para distribución)
pnpm build:lib

# Build del demo
pnpm build

# Preview del build
pnpm preview
```

## 🔄 Flujo de Trabajo

1. **Fork** el repositorio
2. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feat/nueva-funcionalidad
   ```
3. **Haz tus cambios** siguiendo las convenciones
4. **Commit** con mensajes descriptivos:
   ```bash
   git commit -m "Feat(component): add new feature"
   ```
5. **Push** a tu fork:
   ```bash
   git push origin feat/nueva-funcionalidad
   ```
6. **Crea un Pull Request** en GitHub

## 📋 Checklist para Pull Requests

- [ ] El código sigue las convenciones del proyecto
- [ ] Los componentes están documentados
- [ ] Se agregaron ejemplos en `App.jsx`
- [ ] El README está actualizado (si aplica)
- [ ] Los commits siguen la convención establecida
- [ ] El código pasa el linter
- [ ] Se probó en el navegador

## 🎯 Props Comunes

Todos los componentes orgánicos deben aceptar estas props base:

```typescript
{
  className?: string;           // Clases CSS adicionales
  strokeWidth?: number;         // Grosor del borde
  wobbleIntensity?: number;     // Intensidad de irregularidad
  cornerRadius?: number;        // Radio de esquinas
  disabled?: boolean;           // Estado deshabilitado
}
```

## 🎨 Variantes de Color

Usa el objeto `colorVariants` de `utils.js`:

```javascript
import { colorVariants } from './utils';

const color = colorVariants[variant] || colorVariants.default;
```

Variantes disponibles:
- `default`, `primary`, `success`, `danger`, `warning`, `gray`, `info`

## 📱 Responsividad

Usa clases de Tailwind para hacer componentes responsive:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Contenido */}
</div>
```

## ♿ Accesibilidad

- Usa elementos semánticos HTML
- Agrega `aria-label` cuando sea necesario
- Usa la clase `.sr-only` para texto solo para screen readers
- Asegura contraste de colores adecuado
- Soporta navegación por teclado

## 🐛 Reportar Bugs

Usa el [issue tracker de GitHub](https://github.com/yourusername/ui-brushstyle/issues) y proporciona:

- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Versión del navegador y OS

## 💡 Sugerir Funcionalidades

Abre un [GitHub Discussion](https://github.com/yourusername/ui-brushstyle/discussions) con:

- Descripción de la funcionalidad
- Casos de uso
- Ejemplos de implementación (si tienes)
- Mockups o referencias visuales

## 📞 Contacto

- 📧 Email: your.email@example.com
- 💬 Discord: [Link al servidor]
- 🐦 Twitter: [@yourusername]

---

**¡Gracias por contribuir a UI Brushstyle! 🎨**

