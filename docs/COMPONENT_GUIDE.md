# UI Brushstyle Component Guide

Guía rápida con propiedades ajustables y ejemplos para cada componente del kit Brushstyle.

## Design Tokens

| Categoría | Tokens | Descripción |
| --- | --- | --- |
| Spacing | `spacingTokens` (`xs`, `sm`, `md`, `lg`, `xl`, `container`, `section`, `gap`) | Escala de espacio utilizada en paddings, gaps y contenedores. Ejemplo: `getSpacing('container')` devuelve `clamp(1.25rem, 4vw, 2.75rem)`. |
| Tipografía | `typographyTokens.fonts` (`body`, `display`, `mono`), `typographyTokens.sizes`, `typographyTokens.weights`, `typographyTokens.lineHeights` | Controlan familia, tamaños y pesos de fuente. Se consumen con `getFontFamily`, `getFontSize`, `getFontWeight`. |
| Tema | `ThemeProvider`, `useTheme`, `themeVariants` | Contexto para alternar entre temas (light/dark). Cambia gradientes, colores de superficie y acento usando `useTheme`. |

```jsx
import { spacingTokens, typographyTokens, getSpacing, getFontFamily } from '@brushstyle/organic-ui';

const CardTitle = () => (
  <h2 style={{
    fontFamily: getFontFamily('display'),
    fontSize: typographyTokens.sizes.title,
    marginBottom: getSpacing('md')
  }}>
    Título orgánico
  </h2>
);
```

---

## Tabla general de componentes

| Componente | Descripción corta |
| --- | --- |
| `OrganicButton` | Botones con efecto brush-stroke y variantes de color/tamaño. |
| `OrganicBox` | Contenedor base con borde orgánico, usado en cards y layout. |
| `OrganicCard` | Card preconfigurada que envuelve contenido dentro de `OrganicBox`. |
| `OrganicInput` | Input/textarea con borde orgánico y autofill-friendly. |
| `OrganicSelect` | Select personalizado con lista desplegable orgánica. |
| `OrganicCheckbox` | Checkbox con transición orgánica y check animado. |
| `OrganicToggle` | Interruptor con track brushstroke y knob animado. |
| `OrganicRadioGroup` | Grupo de radios estilizados. |
| `OrganicModal` | Modal con overlay y animaciones. |
| `OrganicTooltip` | Tooltip con borde orgánico y posiciones. |
| `OrganicAlert` | Alertas/banners con estados visuales. |
| `OrganicToastProvider` / `useOrganicToast` | Sistema de toasts flotantes. |
| `OrganicNavbar` | Encabezado responsivo con stroke orgánico. |
| `OrganicTabs` | Tabs controladas con botones orgánicos. |
| `OrganicBadge` / `OrganicBadgeCount` | Badges para estados y contadores. |

---

## OrganicButton

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `variant` | `string` | `"default"` | Paleta visual (`default`, `primary`, `success`, `danger`, `warning`, `gray`, `info`). |
| `size` | `string` | `"medium"` | Tamaño (`small`, `medium`, `large`). Ajusta alto y tipografía. |
| `strokeWidth` | `number` | `6` | Grosor del trazo del borde. |
| `disabled` | `boolean` | `false` | Deshabilita el botón. |
| `onClick` | `function` | `undefined` | Handler de clic opcional. |

```jsx
// Ejemplo 1: Botón primario estándar
o<OrganicButton variant="primary" onClick={handleSave}>
  Guardar cambios
</OrganicButton>

// Ejemplo 2: Botón pequeño con stroke más fino
o<OrganicButton variant="success" size="small" strokeWidth={4}>
  Aprobar
</OrganicButton>
```

---

## OrganicBox

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `strokeWidth` | `number` | `5` | Grosor del trazo. |
| `cornerRadius` | `number` | `16` | Radio de esquinas. |
| `wobbleIntensity` | `number` | `6` | Intensidad del stroke orgánico. |
| `backgroundColor` | `string` | `"white"` | Relleno interno. |
| `strokeColor` | `string` | `"#000000"` | Color del borde. |
| `className` | `string` | `""` | Clases adicionales, p.ej. utilidades de layout. |
| `style` | `object` | `{}` | Estilos inline (sobrescriben la sombra por defecto si lo deseas). |

```jsx
// Ejemplo 1: Contenedor con padding responsivo automático
<OrganicBox>
  <h3>Información</h3>
  <p>Contenido del contenedor.</p>
</OrganicBox>

// Ejemplo 2: Caja con color de fondo y stroke personalizado
<OrganicBox backgroundColor="#fffbea" strokeColor="#f59e0b" strokeWidth={4}>
  <p>Aviso importante</p>
</OrganicBox>
```

---

## OrganicCard

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `title` | `string` | `undefined` | Título opcional del card. |
| `className` | `string` | `""` | Clases extra para el contenedor (`p-8` se añade automáticamente si no hay padding). |
| `headerClassName` | `string` | `""` | Clases para el título. |
| `bodyClassName` | `string` | `""` | Clases para el contenido. |
| `strokeWidth` | `number` | `5` | Grosor del borde heredado de `OrganicBox`. |
| `backgroundColor` | `string` | `"white"` | Relleno del card. |

```jsx
// Ejemplo 1: Card simple con título
o<OrganicCard title="Resumen semanal">
  <ul>
    <li>Ventas: $52k</li>
    <li>Usuarios: 1,204</li>
  </ul>
</OrganicCard>

// Ejemplo 2: Card compacta sin título con padding personalizado
o<OrganicCard className="p-4" strokeWidth={4}>
  <p className="text-sm">Estado del sistema: operativo.</p>
</OrganicCard>
```

---

## OrganicInput (incluye textarea)

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `type` | `string` | `"text"` | Tipo del input (ignorado si `multiline`). |
| `multiline` | `boolean` | `false` | Si es `true`, renderiza `<textarea>`. |
| `rows` | `number` | `1` | Número de filas para textarea. |
| `strokeWidth` | `number` | `4` | Grosor del borde. |
| `disabled` | `boolean` | `false` | Deshabilita el campo. |
| `className` | `string` | `""` | Clases adicionales para el contenedor. |
| `style` | `object` | `{}` | Estilos extra para el wrapper. |
| `value/onChange` | control | `undefined` | Controlado por React. |

```jsx
// Ejemplo 1: Input de email
<OrganicInput
  type="email"
  placeholder="tu@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// Ejemplo 2: Textarea con más filas y stroke personalizado
<OrganicInput
  multiline
  rows={4}
  strokeWidth={3}
  placeholder="Cuéntanos tu historia..."
  value={story}
  onChange={(e) => setStory(e.target.value)}
/>
```

---

## OrganicSelect

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `options` | `{ label, value }[]` | `[]` | Opciones disponibles. |
| `value` | `string` | `undefined` | Valor seleccionado. |
| `onChange` | `function` | `undefined` | Recibe `{ target: { name, value } }`. |
| `placeholder` | `string` | `"Selecciona una opción"` | Texto placeholder. |
| `strokeWidth` | `number` | `3` | Grosor del borde del select y dropdown. |
| `disabled` | `boolean` | `false` | Deshabilita el select. |
| `className` | `string` | `""` | Clases extra para el wrapper. |
| `style` | `object` | `{}` | Estilos adicionales. |

```jsx
// Ejemplo 1: Select controlado
<OrganicSelect
  options={countries}
  value={country}
  onChange={(e) => setCountry(e.target.value)}
/>

// Ejemplo 2: Select deshabilitado con placeholder personalizado
<OrganicSelect
  placeholder="No disponible"
  disabled
  options={[]}
  strokeWidth={2}
/>
```

---

## OrganicCheckbox

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Estado del checkbox. |
| `onChange` | `function` | `undefined` | Callback al cambiar. |
| `label` | `string` | `undefined` | Texto a la derecha. |
| `strokeWidth` | `number` | `4` | Grosor del borde. |
| `disabled` | `boolean` | `false` | Deshabilita el checkbox. |
| `className` | `string` | `""` | Clases extra. |

```jsx
// Ejemplo 1: Checkbox controlado
<OrganicCheckbox
  checked={terms}
  onChange={(e) => setTerms(e.target.checked)}
  label="Acepto los términos"
/>

// Ejemplo 2: Checkbox deshabilitado
<OrganicCheckbox
  checked
  disabled
  label="Solo lectura"
  strokeWidth={3}
/>
```

---

## OrganicToggle

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Estado ON/OFF. |
| `size` | `string` | `"medium"` | `small`, `medium`, `large`. |
| `onChange` | `function` | `undefined` | Callback con el nuevo estado. |
| `strokeWidth` | `number` | `4` | Borde del track y knob. |
| `label` | `string` | `undefined` | Texto a la derecha. |

```jsx
// Ejemplo 1: Toggle estándar
<OrganicToggle
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
  label="Notificaciones"
/>

// Ejemplo 2: Toggle grande con stroke reducido
<OrganicToggle
  checked={darkMode}
  size="large"
  strokeWidth={3}
  onChange={(e) => setDarkMode(e.target.checked)}
  label="Modo oscuro"
/>
```

---

## OrganicRadioGroup

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `options` | `{ label, value }[]` | `[]` | Radios disponibles. |
| `value` | `string` | `undefined` | Valor seleccionado. |
| `onChange` | `function` | `undefined` | Handler con `event.target.value`. |
| `name` | `string` | `undefined` | Nombre del grupo. |
| `strokeWidth` | `number` | `3` | Grosor del borde del radio. |
| `className` | `string` | `""` | Clases extra. |

```jsx
// Ejemplo 1: Grupo básico
<OrganicRadioGroup
  name="gender"
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  options={[
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' }
  ]}
/>

// Ejemplo 2: Radios con stroke personalizado
<OrganicRadioGroup
  name="theme"
  strokeWidth={2}
  value={theme}
  onChange={(e) => setTheme(e.target.value)}
  options={[
    { label: 'Claro', value: 'light' },
    { label: 'Oscuro', value: 'dark' },
    { label: 'Auto', value: 'auto' }
  ]}
/>
```

---

## OrganicModal

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | `false` | Controla visibilidad. |
| `onClose` | `function` | `undefined` | Callback para cerrar. |
| `title` | `string` | `undefined` | Título del modal. |
| `footer` | `ReactNode` | `undefined` | Contenido para pie de página. |
| `size` | `string` | `"medium"` | `small`, `medium`, `large`. |
| `className` | `string` | `""` | Clases extra para el contenedor. |

```jsx
// Ejemplo 1: Modal básico
const modal = useModal();

<>
  <OrganicButton onClick={modal.open}>Abrir modal</OrganicButton>
  <OrganicModal isOpen={modal.isOpen} onClose={modal.close} title="Detalles">
    <p>Contenido del modal.</p>
  </OrganicModal>
</>

// Ejemplo 2: Modal grande con footer
<OrganicModal
  isOpen={isConfirm}
  onClose={closeConfirm}
  size="large"
  title="Confirmar acción"
  footer={
    <div className="flex justify-end gap-3">
      <OrganicButton variant="gray" onClick={closeConfirm}>Cancelar</OrganicButton>
      <OrganicButton variant="danger" onClick={handleDelete}>Eliminar</OrganicButton>
    </div>
  }
>
  <p>¿Estás seguro de continuar?</p>
</OrganicModal>
```

---

## OrganicTooltip

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `content` | `string` | `undefined` | Texto del tooltip. |
| `position` | `string` | `"top"` | `top`, `bottom`, `left`, `right`. |
| `strokeWidth` | `number` | `2` | Grosor del borde del tooltip. |
| `delay` | `number` | `200` | Tiempo en ms antes de mostrarse. |
| `className` | `string` | `""` | Clases extra para el trigger. |

```jsx
// Ejemplo 1: Tooltip arriba
o<OrganicTooltip content="Tooltip arriba" position="top">
  <OrganicButton size="small">Hover</OrganicButton>
</OrganicTooltip>

// Ejemplo 2: Tooltip derecha con stroke personalizado
o<OrganicTooltip content="Más info" position="right" strokeWidth={3}>
  <span className="underline cursor-pointer">Ver detalles</span>
</OrganicTooltip>
```

---

## OrganicBadge & OrganicBadgeCount

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `variant` | `string` | `"default"` | Paleta (`default`, `primary`, `success`, etc.). |
| `size` | `string` | `"medium"` | Ajusta alto/tipografía. |
| `strokeWidth` | `number` | `3` | Borde de la pastilla. |
| `count` (`BadgeCount`) | `number` | `0` | Valor numérico que se muestra en el contador. |

```jsx
// Ejemplo 1: Badge de estado
<OrganicBadge variant="warning" size="small">
  Beta
</OrganicBadge>

// Ejemplo 2: BadgeCount sobre un icono
<div className="relative inline-flex">
  <IconBell />
  <OrganicBadgeCount count={8} className="absolute -top-2 -right-2" />
</div>
```

---

## OrganicAlert

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `variant` | `string` | `"info"` | Variantes visuales (`info`, `success`, `warning`, `danger`, `announcement`). |
| `title` | `string` | `undefined` | Texto principal. |
| `description` | `string` | `undefined` | Descripción opcional. |
| `onClose` | `function` | `undefined` | Muestra botón de cierre y callback. |
| `actions` | `ReactNode` | `undefined` | Renderiza acciones adicionales (botones, links). |
| `icon` | `ReactNode` | `undefined` | Ícono personalizado. |
| `compact` | `boolean` | `false` | Reduce padding y line-height. |

```jsx
// Ejemplo 1: Alerta informativa
o<OrganicAlert
  variant="info"
  title="Actualización disponible"
  description="Hay una nueva versión lista para instalar."
/>

// Ejemplo 2: Alerta con acciones y cierre
o<OrganicAlert
  variant="warning"
  title="Requiere tu atención"
  description="Tus credenciales expiran pronto."
  onClose={() => console.log('Cerrar')}
  actions={
    <OrganicButton size="small" variant="primary">Actualizar ahora</OrganicButton>
  }
/>
```

---

## OrganicToastProvider & useOrganicToast

Envuelve tu app con `OrganicToastProvider` y usa el hook `useOrganicToast()` para disparar toasts.

```jsx
function App() {
  return (
    <OrganicToastProvider>
      <AppContent />
    </OrganicToastProvider>
  );
}

function AppContent() {
  const { addToast } = useOrganicToast();
  return (
    <OrganicButton
      onClick={() =>
        addToast({
          variant: 'success',
          title: 'Guardado',
          description: 'Tus cambios están seguros'
        })
      }
    >
      Mostrar toast
    </OrganicButton>
  );
}
```

- Los toasts heredan el estilo de `OrganicAlert` y se muestran en la esquina superior derecha.
- Prop `duration` controla el auto-cierre (por defecto 4000 ms, `null` para persistir).

---

## OrganicNavbar

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `brand` | `ReactNode` | `undefined` | Contenido de la marca/logo. |
| `links` | `{ label, href }[]` | `[]` | Navegación principal. |
| `actions` | `object` | `undefined` | `{ primary, secondary }` cada uno con `{ label, onClick }`. |
| `strokeWidth` | `number` | `5` | Grosor de borde. |
| `backgroundColor` | `string` | `"white"` | Fondo del navbar. |

```jsx
// Ejemplo 1: Navbar con enlaces
o<OrganicNavbar
  brand={<span>Brushstyle UI</span>}
  links={[
    { label: 'Docs', href: '#docs' },
    { label: 'Componentes', href: '#components' }
  ]}
  actions={{
    primary: { label: 'Descargar', onClick: handleDownload },
    secondary: { label: 'Changelog', onClick: handleChangelog }
  }}
/>

// Ejemplo 2: Navbar simple sin acciones
o<OrganicNavbar
  brand={<span>Mi proyecto</span>}
  links={[{ label: 'Inicio', href: '#' }]}
/>
```

---

## OrganicTabs

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `tabs` | `{ value, label, content }[]` | `[]` | Datos de las pestañas. |
| `defaultValue` | `string` | `tabs[0]?.value` | Valor inicial seleccionado. |
| `onValueChange` | `function` | `undefined` | Callback al cambiar de tab. |
| `orientation` | `string` | `"horizontal"` | `horizontal` o `vertical`. |
| `strokeWidth` | `number` | `5` | Grosor del contenedor. |

```jsx
const tabs = [
  { value: 'overview', label: 'Resumen', content: <Overview /> },
  { value: 'activity', label: 'Actividad', content: <ActivityLog /> }
];

<OrganicTabs tabs={tabs} onValueChange={(value) => console.log(value)} />
```

---

## OrganicFileUpload

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | Drag message | Texto principal en el dropzone. |
| `description` | `string` | Secondary text | Texto auxiliar. |
| `accept` | `string` | `undefined` | Filtro de tipos (`image/*`, etc.). |
| `multiple` | `boolean` | `true` | Permite seleccionar múltiples archivos. |
| `maxSize` | `number` | `undefined` | Tamaño máximo por archivo (bytes). |
| `onFilesSelected` | `function` | `undefined` | Callback con la lista de archivos válidos. |

```jsx
// Ejemplo 1: Carga múltiple
<OrganicFileUpload onFilesSelected={setFiles} maxSize={5 * 1024 * 1024} />

// Ejemplo 2: Solo imágenes, un archivo
<OrganicFileUpload
  multiple={false}
  accept="image/*"
  label="Cargar portada"
  onFilesSelected={(files) => console.log(files[0])}
/>
```

---

## OrganicSlider

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `value` | `number` | `undefined` | Valor controlado del slider. |
| `defaultValue` | `number` | `0` | Valor inicial (modo no controlado). |
| `min` | `number` | `0` | Valor mínimo. |
| `max` | `number` | `100` | Valor máximo. |
| `step` | `number` | `1` | Incrementos del slider. |
| `label` | `string` | `undefined` | Etiqueta superior. |
| `showValue` | `boolean` | `true` | Muestra el valor actual. |
| `accentColor` | `string` | `#2563eb` | Color del trazo activo y knob. |
| `baseColor` | `string` | `#e5e7eb` | Color del trazo base. |
| `onChange` | `function` | `undefined` | Callback al cambiar el valor. |

```jsx
// Ejemplo 1: Slider controlado
const [volume, setVolume] = useState(40);
<OrganicSlider label="Volumen" value={volume} onChange={setVolume} />

// Ejemplo 2: Slider con paleta personalizada
<OrganicSlider
  label="Temperatura"
  defaultValue={30}
  accentColor="#f97316"
  baseColor="#fde68a"
/>
```

---

## OrganicPagination

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `page` | `number` | `1` | Página actual. |
| `totalPages` | `number` | `undefined` | Total de páginas (requerido). |
| `onPageChange` | `function` | `undefined` | Callback cuando cambia la página. |
| `siblingCount` | `number` | `1` | Cantidad de páginas vecinas a mostrar. |

```jsx
// Ejemplo 1: Paginación simple
const [page, setPage] = useState(2);
<OrganicPagination page={page} totalPages={12} onPageChange={setPage} />

// Ejemplo 2: Mayor número de páginas con más vecinos
<OrganicPagination
  page={page}
  totalPages={30}
  siblingCount={2}
  onPageChange={setPage}
/>
```

---

## OrganicDrawer

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | `false` | Controla visibilidad del panel. |
| `onClose` | `function` | `undefined` | Callback para cerrar. |
| `position` | `string` | `"right"` | `right` o `left`. |
| `size` | `string` | `"medium"` | `small`, `medium`, `large`. |
| `title` | `ReactNode` | `undefined` | Encabezado del drawer. |
| `footer` | `ReactNode` | `undefined` | Acciones inferiores. |
| `blurOverlay` | `boolean` | `true` | Aplica blur al overlay. |

```jsx
const [open, setOpen] = useState(false);
<>
  <OrganicButton onClick={() => setOpen(true)}>Configuraciones</OrganicButton>
  <OrganicDrawer
    isOpen={open}
    onClose={() => setOpen(false)}
    title="Centro de comandos"
    footer={
      <div className="flex justify-end gap-3">
        <OrganicButton variant="default" fullWidth={false} onClick={() => setOpen(false)}>
          Cancelar
        </OrganicButton>
        <OrganicButton variant="primary" fullWidth={false}>Guardar</OrganicButton>
      </div>
    }
  >
    <p className="text-sm">Configura tu espacio de trabajo sin salir de la vista actual.</p>
  </OrganicDrawer>
</>
```

---

## OrganicPopover

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `trigger` | `ReactElement` | `undefined` | Elemento que abre el popover (se clona y recibe `onClick`). |
| `children` | `ReactNode` | `undefined` | Contenido del popover. |
| `placement` | `string` | `"top"` | `top`, `bottom`, `left`, `right`. |
| `open` | `boolean` | `undefined` | Control externo (opcional). |
| `onOpenChange` | `function` | `undefined` | Notifica cambios de estado. |
| `width` | `number` | `260` | Ancho del popover. |

```jsx
<OrganicPopover
  placement="bottom"
  trigger={<OrganicButton fullWidth={false}>Opciones</OrganicButton>}
>
  <div className="space-y-1 text-sm">
    <p className="font-semibold">Acciones rápidas</p>
    <p>• Crear tablero</p>
    <p>• Importar datos</p>
  </div>
</OrganicPopover>
```

---

## OrganicTable

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `columns` | `{ label, accessor }[]` | `[]` | Definición de columnas. |
| `data` | `object[]` | `[]` | Filas de datos. |
| `renderRow` | `function` | `undefined` | Render personalizado por fila. |
| `strokeWidth` | `number` | `5` | Grosor del borde del contenedor. |

```jsx
<OrganicTable
  columns={[
    { label: 'Nombre', accessor: 'name' },
    { label: 'Rol', accessor: 'role' }
  ]}
  data={[
    { name: 'Ana', role: 'Diseño' },
    { name: 'Luis', role: 'Frontend' }
  ]}
/>
```

---

## OrganicStepper

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `steps` | `{ label }[]` | `[]` | Secuencia de etapas. |
| `current` | `number` | `0` | Índice del paso activo. |
| `variant` | `string` | `"linear"` | `linear` o `circular`. |

```jsx
const [step, setStep] = useState(1);
<OrganicStepper
  steps={[{ label: 'Cuenta' }, { label: 'Equipo' }, { label: 'Lanzamiento' }]}
  current={step}
/>

<OrganicStepper
  variant="circular"
  steps={[{ label: 'Preparar' }, { label: 'Diseñar' }, { label: 'Publicar' }]}
  current={step}
/>
```

---

## OrganicDivider

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `orientation` | `string` | `"horizontal"` | `horizontal` o `vertical`. |
| `color` | `string` | `#1e1e1e` | Color del trazo. |
| `thickness` | `number` | `6` | Grosor del stroke. |
| `length` | `string` | `"100%"` | Longitud del contenedor (puede ser `px`, `%`, etc.). |
| `className` | `string` | `""` | Clases adicionales. |

```jsx
// Ejemplo 1: Divisor horizontal
<OrganicDivider thickness={5} color="#0f172a" className="my-6" />

// Ejemplo 2: Divisor vertical dentro de un grid
<div className="flex items-center gap-4">
  <p>Panel A</p>
  <OrganicDivider orientation="vertical" length="80px" color="#2563eb" />
  <p>Panel B</p>
</div>
```

---

## Utilidades relevantes

- **Sombras:** disponibles en `brushShadows` (`soft`, `medium`). Importa desde `./utils` para mantener consistencia.
- **sizeConfigs:** mapea tamaños de botón (`small`, `medium`, `large`). Útil si necesitas alinear tipografías personalizadas.
- **generateOrganicPath:** función central que crea el path SVG. Ajusta `wobbleIntensity` y `cornerRadius` para customizar el estilo de stroke.

---

### Recomendaciones

- Reutiliza las constantes (`brushShadows`, `sizeConfigs`) para mantener la estética consistente.
- Usa las props `strokeWidth` y `strokeColor` para ajustes finos, sin modificar los componentes si no es necesario.
- Para layouts responsivos, combina las props con utilidades de Tailwind (`gap`, `grid`, `flex`, etc.) o `className` personalizados.
- Los componentes aceptan `className` y `style` para overrides puntuales, pero evita duplicar lógica. Mantén la configuración común en wrappers o hooks.
