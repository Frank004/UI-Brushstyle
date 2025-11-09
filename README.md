# UI Brushstyle

Librería de componentes React con estética "brushstroke" / hand-drawn. Construida con Vite + React + Tailwind, exporta un conjunto de componentes reutilizables listos para integrarse en proyectos nuevos o existentes.

## Instalación

```bash
pnpm add @brushstyle/organic-ui
# o
npm install @brushstyle/organic-ui
```

> Nota: copia el contenido de `src/components/organic-ui` a tu proyecto si quieres personalizarlo; próximamente se publicará el paquete en npm.

## Uso básico

```jsx
import {
  OrganicButton,
  OrganicBox,
  OrganicInput,
  OrganicAlert,
  OrganicTabs
} from '@brushstyle/organic-ui';

function Example() {
  return (
    <OrganicBox className="max-w-md mx-auto">
      <OrganicAlert
        variant="info"
        title="Actualización disponible"
        description="Hay una nueva versión lista para instalar."
      />
      <div className="mt-6 space-y-4">
        <OrganicInput placeholder="Email" type="email" />
        <OrganicButton variant="primary">Registrarme</OrganicButton>
      </div>
    </OrganicBox>
  );
}
```

## Design Tokens

UI Brushstyle expone tokens reutilizables desde `@brushstyle/organic-ui`. Úsalos para mantener spacing, tipografías **y colores** consistentes:

```jsx
import {
  spacingTokens,
  typographyTokens,
  colorTokens,
  getSpacing,
  getFontFamily,
  getColor
} from '@brushstyle/organic-ui';

const Section = ({ children }) => (
  <section
    style={{
      padding: getSpacing('section'),
      fontFamily: getFontFamily('body'),
      background: getColor('surface'),
      color: getColor('surfaceText')
    }}
  >
    {children}
  </section>
);
```

- **Spacing:** `spacingTokens.container`, `spacingTokens.section`, etc.
- **Tipografía:** `typographyTokens.fonts.body`, tamaños como `typographyTokens.sizes.title`.
- **Colores:** `colorTokens.surface`, `colorTokens.surfaceTextMuted`, `colorTokens.accent`, etc. Se aplican vía CSS variables para responder al tema.

### Presets orgánicos

También tienes `organicShapePresets` y `organicSeeds` para reutilizar la configuración de bordes/semillas en tus propios SVGs:

```jsx
import { generateOrganicPath, organicShapePresets, organicSeeds } from '@brushstyle/organic-ui';

const customPath = generateOrganicPath({
  ...organicShapePresets.container,
  seed: organicSeeds.box,
  width: 400,
  height: 160
});
```

## Theme Provider

La librería expone un `ThemeProvider` con un contexto para cambiar entre temas claro/oscuro.

```jsx
import { ThemeProvider, useTheme } from '@brushstyle/organic-ui';

function Layout() {
  const { theme, toggleTheme, tokens } = useTheme();
  return (
    <div style={{ background: tokens.palette.background, color: tokens.palette.text }}>
      <button onClick={toggleTheme}>
        Cambiar a {theme === 'light' ? 'modo oscuro' : 'modo claro'}
      </button>
      {/* resto de la UI */}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
```

Internamente el provider usa **Context API** + **useState** para gestionar el tema y aplica los tokens (colores, sombras, fuentes) al árbol mediante CSS variables.

---

## Componentes incluidos

| Categoría | Componentes |
| --- | --- |
| Fundamentos | `OrganicBox`, `OrganicCard`, `OrganicDivider`, `OrganicButton`, `OrganicBadge`, `OrganicBadgeCount` |
| Formularios | `OrganicInput`, `OrganicSelect`, `OrganicCheckbox`, `OrganicRadio`, `OrganicRadioGroup`, `OrganicToggle`, `OrganicFileUpload`, `OrganicSlider` |
| Feedback | `OrganicAlert`, `OrganicToastProvider` + `useOrganicToast`, `OrganicTooltip` |
| Navegación / Layout | `OrganicNavbar`, `OrganicTabs`, `OrganicPagination`, `OrganicModal`, `OrganicDrawer`, `OrganicPopover`, `OrganicTable`, `OrganicStepper` |

Consulta la guía detallada con props y ejemplos: [`docs/COMPONENT_GUIDE.md`](docs/COMPONENT_GUIDE.md).

## Demo local

```bash
pnpm install
pnpm dev -- --host 127.0.0.1 --port 3000
```

La app demo está en `src/App.jsx`. Allí puedes ver ejemplos de cada componente y cómo integrarlos.

## Desarrollo

- Vite 6 + React 18
- Tailwind y utilidades personalizadas para sombras/paths orgánicos
- `react-icons` para iconografía (set `tfi`)

## Siguiente pasos

- Publicar paquete npm
- Añadir ejemplos extendidos con los nuevos componentes (Drawer, Popover, Table, Stepper) en la documentación
- Incorporar tests automatizados para los generadores orgánicos y el ThemeProvider

---

¿Alguna idea o mejora? Abre un issue o manda un PR cuando el repositorio esté público. ¡Gracias por usar UI Brushstyle!

