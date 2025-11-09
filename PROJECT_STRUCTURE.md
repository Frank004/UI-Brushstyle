# 📁 Estructura del Proyecto UI Brushstyle

```
ui-brushstyle/
├── 📄 package.json                    # Configuración del proyecto y dependencias
├── 📄 pnpm-lock.yaml                  # Lock file de pnpm
├── 📄 .gitignore                      # Archivos ignorados por Git
├── 📄 LICENSE                         # Licencia MIT
├── 📄 README.md                       # Documentación principal
├── 📄 CONTRIBUTING.md                 # Guía de contribución
├── 📄 DEPLOYMENT.md                   # Guía de despliegue
├── 📄 PROJECT_STRUCTURE.md            # Este archivo
│
├── ⚙️ Configuración
│   ├── vite.config.js                 # Configuración de Vite
│   ├── rollup.config.js               # Configuración de Rollup (bundling)
│   ├── tailwind.config.js             # Configuración de Tailwind CSS
│   ├── postcss.config.js              # Configuración de PostCSS
│   └── .babelrc                       # Configuración de Babel
│
├── 📂 src/
│   ├── 📂 components/
│   │   └── 📂 organic-ui/             # 🎨 LIBRERÍA DE COMPONENTES
│   │       │
│   │       ├── 🛠️ utils.js            # Utilidades compartidas
│   │       │   ├── generateOrganicPath()
│   │       │   ├── generateOrganicCircle()
│   │       │   ├── stringToSeed()
│   │       │   ├── colorVariants
│   │       │   └── sizeConfigs
│   │       │
│   │       ├── 📦 Componentes Base
│   │       │   ├── OrganicBox.jsx     # Contenedor base
│   │       │   ├── OrganicButton.jsx  # Botones (6 variantes, 3 tamaños)
│   │       │   ├── OrganicInput.jsx   # Inputs y textareas
│   │       │   └── OrganicCard.jsx    # Tarjetas
│   │       │
│   │       ├── 📝 Componentes de Formulario
│   │       │   ├── OrganicSelect.jsx      # Select dropdown
│   │       │   ├── OrganicCheckbox.jsx    # Checkbox con animación
│   │       │   ├── OrganicRadio.jsx       # Radio buttons + RadioGroup
│   │       │   └── OrganicToggle.jsx      # Switch/Toggle
│   │       │
│   │       ├── 🎪 Componentes de UI
│   │       │   ├── OrganicModal.jsx       # Modal con hook useModal
│   │       │   ├── OrganicBadge.jsx       # Badges + BadgeCount
│   │       │   └── OrganicTooltip.jsx     # Tooltips posicionables
│   │       │
│   │       └── 📤 index.js            # Exportaciones centralizadas
│   │
│   ├── 🎨 App.jsx                     # Demo/Playground de componentes
│   ├── 🚀 main.jsx                    # Entry point de React
│   └── 💅 index.css                   # Estilos globales + Tailwind
│
├── 📂 public/                         # Archivos estáticos
│
├── 📂 dist/                           # Build output (generado)
│   ├── index.js                       # CommonJS bundle
│   ├── index.esm.js                   # ES Module bundle
│   └── *.map                          # Source maps
│
└── 📂 node_modules/                   # Dependencias (ignorado por Git)
```

## 🎨 Componentes Disponibles

### Base (4)
1. **OrganicBox** - Contenedor base con bordes orgánicos
2. **OrganicButton** - Botones con variantes y tamaños
3. **OrganicInput** - Inputs y textareas
4. **OrganicCard** - Tarjetas con título

### Formularios (5)
5. **OrganicSelect** - Select dropdown
6. **OrganicCheckbox** - Checkbox animado
7. **OrganicRadio** - Radio button individual
8. **OrganicRadioGroup** - Grupo de radio buttons
9. **OrganicToggle** - Switch/Toggle

### UI (3)
10. **OrganicModal** - Modal/Dialog
11. **OrganicBadge** - Badge/Etiqueta
12. **OrganicBadgeCount** - Badge numérico
13. **OrganicTooltip** - Tooltip posicionable

### Hooks (1)
14. **useModal** - Hook para controlar modales

## 📊 Estadísticas del Proyecto

- **Total de Componentes**: 13 componentes + 1 hook
- **Líneas de Código**: ~2,500+ líneas
- **Archivos de Componentes**: 11 archivos .jsx
- **Utilidades**: 1 archivo utils.js
- **Variantes de Color**: 7 variantes
- **Tamaños**: 3 tamaños (small, medium, large)

## 🎯 Flujo de Desarrollo

```
┌─────────────────┐
│  Desarrollo     │
│  pnpm dev       │ ← Trabaja aquí (localhost:3000)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Build Demo     │
│  pnpm build     │ ← Build para GitHub Pages
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Build Lib      │
│  pnpm build:lib │ ← Build para distribución
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Publicar       │
│  Git + GitHub   │ ← Compartir con el mundo
└─────────────────┘
```

## 🔄 Flujo de Datos

```
┌──────────────┐
│   utils.js   │ ← Genera paths SVG con seeds
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ OrganicBox   │ ← Componente base
└──────┬───────┘
       │
       ├─────────────────┬──────────────┐
       ▼                 ▼              ▼
┌─────────────┐   ┌──────────┐   ┌──────────┐
│ OrganicCard │   │  Button  │   │  Input   │
└─────────────┘   └──────────┘   └──────────┘
                        │
                        ▼
                  ┌──────────┐
                  │   App    │ ← Demo
                  └──────────┘
```

## 📦 Exports

```javascript
// Desde index.js
export {
  // Utils
  generateOrganicPath,
  generateOrganicCircle,
  stringToSeed,
  colorVariants,
  sizeConfigs,
  
  // Base
  OrganicBox,
  OrganicButton,
  OrganicInput,
  OrganicCard,
  
  // Forms
  OrganicSelect,
  OrganicCheckbox,
  OrganicRadio,
  OrganicRadioGroup,
  OrganicToggle,
  
  // UI
  OrganicModal,
  useModal,
  OrganicBadge,
  OrganicBadgeCount,
  OrganicTooltip
}
```

## 🎨 Principios Aplicados

### ✅ Single Responsibility
Cada componente tiene una única responsabilidad:
- `OrganicButton` → Solo botones
- `OrganicInput` → Solo inputs
- `utils.js` → Solo generación de paths

### ✅ DRY (Don't Repeat Yourself)
- Utilidades compartidas en `utils.js`
- Configuraciones centralizadas (`colorVariants`, `sizeConfigs`)
- Componente base `OrganicBox` reutilizable

### ✅ Separation of Concerns
- **Lógica**: `utils.js`
- **Presentación**: Componentes `.jsx`
- **Estilos**: Tailwind CSS + `index.css`
- **Configuración**: Archivos de config separados

### ✅ Dependency Injection Ready
- Props flexibles y configurables
- Componentes desacoplados
- Fácil de testear y extender

## 🚀 Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build del demo
pnpm build:lib    # Build de la librería
pnpm preview      # Preview del build
pnpm lint         # Linter (cuando esté configurado)
```

## 📝 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Configuración y dependencias |
| `vite.config.js` | Config de Vite (dev server) |
| `rollup.config.js` | Config de Rollup (bundling) |
| `tailwind.config.js` | Config de Tailwind CSS |
| `src/components/organic-ui/index.js` | Entry point de la librería |
| `README.md` | Documentación principal |
| `CONTRIBUTING.md` | Guía para contribuidores |
| `DEPLOYMENT.md` | Guía de despliegue |

---

**Estructura diseñada para escalabilidad y mantenibilidad 🎯**

