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

## Componentes incluidos

| Categoría | Componentes |
| --- | --- |
| Fundamentos | `OrganicBox`, `OrganicCard`, `OrganicButton`, `OrganicBadge`, `OrganicBadgeCount` |
| Formularios | `OrganicInput`, `OrganicSelect`, `OrganicCheckbox`, `OrganicRadio`, `OrganicRadioGroup`, `OrganicToggle`, `OrganicFileUpload`, `OrganicSlider` |
| Feedback | `OrganicAlert`, `OrganicToastProvider` + `useOrganicToast`, `OrganicTooltip` |
| Navegación / Layout | `OrganicNavbar`, `OrganicTabs`, `OrganicPagination`, `OrganicModal` |

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
- Añadir componentes de Prioridad 3 (Drawer, Popover, Table, Stepper)
- Diseñar ejemplos completos de layouts con Brushstyle UI

---

¿Alguna idea o mejora? Abre un issue o manda un PR cuando el repositorio esté público. ¡Gracias por usar UI Brushstyle!

