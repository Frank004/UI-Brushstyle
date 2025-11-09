# ⚡ Quick Start - UI Brushstyle

Guía rápida para empezar a usar UI Brushstyle en 5 minutos.

## 🚀 Instalación Rápida

```bash
# Con pnpm (recomendado)
pnpm add github:yourusername/ui-brushstyle

# Con npm
npm install github:yourusername/ui-brushstyle

# Con yarn
yarn add github:yourusername/ui-brushstyle
```

## 📦 Setup en tu Proyecto

### 1. Instalar Tailwind CSS (si no lo tienes)

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configurar Tailwind

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@brushstyle/organic-ui/**/*.{js,jsx}", // Importante!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Importar estilos de Tailwind

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎨 Uso Básico

### Ejemplo 1: Botón Simple

```jsx
import { OrganicButton } from '@brushstyle/organic-ui';

function App() {
  return (
    <OrganicButton 
      variant="primary" 
      onClick={() => alert('¡Hola!')}>
      Click me
    </OrganicButton>
  );
}
```

### Ejemplo 2: Formulario

```jsx
import { 
  OrganicInput, 
  OrganicButton, 
  OrganicCard 
} from '@brushstyle/organic-ui';
import { useState } from 'react';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <OrganicCard title="Contacto">
      <div className="space-y-4">
        <OrganicInput
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <OrganicInput
          multiline
          rows={4}
          placeholder="Tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        
        <OrganicButton variant="primary">
          Enviar
        </OrganicButton>
      </div>
    </OrganicCard>
  );
}
```

### Ejemplo 3: Modal

```jsx
import { 
  OrganicButton, 
  OrganicModal, 
  useModal 
} from '@brushstyle/organic-ui';

function MyComponent() {
  const modal = useModal();

  return (
    <>
      <OrganicButton onClick={modal.open}>
        Abrir Modal
      </OrganicButton>

      <OrganicModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="¡Hola!"
      >
        <p>Este es un modal orgánico</p>
      </OrganicModal>
    </>
  );
}
```

### Ejemplo 4: Formulario Completo

```jsx
import {
  OrganicBox,
  OrganicInput,
  OrganicSelect,
  OrganicCheckbox,
  OrganicRadioGroup,
  OrganicToggle,
  OrganicButton
} from '@brushstyle/organic-ui';
import { useState } from 'react';

function CompleteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    terms: false,
    notifications: true,
    theme: 'light'
  });

  const countries = [
    { value: 'mx', label: 'México' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' }
  ];

  return (
    <OrganicBox className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Registro</h2>
      
      <div className="space-y-4">
        <OrganicInput
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />

        <OrganicInput
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <OrganicSelect
          options={countries}
          value={formData.country}
          onChange={(e) => setFormData({...formData, country: e.target.value})}
          placeholder="Selecciona tu país"
        />

        <OrganicRadioGroup
          options={themeOptions}
          value={formData.theme}
          onChange={(e) => setFormData({...formData, theme: e.target.value})}
          name="theme"
        />

        <OrganicToggle
          checked={formData.notifications}
          onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
          label="Recibir notificaciones"
        />

        <OrganicCheckbox
          checked={formData.terms}
          onChange={(e) => setFormData({...formData, terms: e.target.checked})}
          label="Acepto los términos"
        />

        <OrganicButton variant="primary" type="submit">
          Registrarse
        </OrganicButton>
      </div>
    </OrganicBox>
  );
}
```

## 🎨 Variantes Disponibles

### Colores
```jsx
<OrganicButton variant="default">Default</OrganicButton>
<OrganicButton variant="primary">Primary</OrganicButton>
<OrganicButton variant="success">Success</OrganicButton>
<OrganicButton variant="danger">Danger</OrganicButton>
<OrganicButton variant="warning">Warning</OrganicButton>
<OrganicButton variant="gray">Gray</OrganicButton>
<OrganicButton variant="info">Info</OrganicButton>
```

### Tamaños
```jsx
<OrganicButton size="small">Small</OrganicButton>
<OrganicButton size="medium">Medium</OrganicButton>
<OrganicButton size="large">Large</OrganicButton>
```

## 🎯 Componentes Más Usados

| Componente | Uso |
|------------|-----|
| `OrganicButton` | Botones y acciones |
| `OrganicInput` | Campos de texto |
| `OrganicCard` | Contenedores con título |
| `OrganicModal` | Diálogos y popups |
| `OrganicSelect` | Dropdowns |
| `OrganicCheckbox` | Opciones múltiples |
| `OrganicToggle` | Switches on/off |

## 💡 Tips

### 1. Personalizar Colores

```jsx
<OrganicBox
  backgroundColor="#f0f9ff"
  strokeColor="#0284c7"
  strokeWidth={6}
>
  Contenido personalizado
</OrganicBox>
```

### 2. Ajustar Irregularidad

```jsx
<OrganicButton 
  wobbleIntensity={15}  // Más irregular
  cornerRadius={30}     // Esquinas más redondeadas
>
  Botón único
</OrganicButton>
```

### 3. Usar con Tailwind

```jsx
<OrganicCard className="shadow-xl hover:shadow-2xl transition-shadow">
  <p className="text-gray-600">
    Combina con clases de Tailwind
  </p>
</OrganicCard>
```

## 🐛 Problemas Comunes

### Los estilos no se aplican

**Solución**: Asegúrate de importar Tailwind CSS:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Los componentes se ven cuadrados

**Solución**: Verifica que la ruta de la librería esté en `tailwind.config.js`:

```javascript
content: [
  "./node_modules/@brushstyle/organic-ui/**/*.{js,jsx}",
]
```

### El modal no se cierra

**Solución**: Usa el hook `useModal`:

```jsx
const modal = useModal();
// Usa modal.open() y modal.close()
```

## 📚 Más Recursos

- 📖 [Documentación Completa](./README.md)
- 🤝 [Guía de Contribución](./CONTRIBUTING.md)
- 🚀 [Guía de Despliegue](./DEPLOYMENT.md)
- 📁 [Estructura del Proyecto](./PROJECT_STRUCTURE.md)

## 🎉 ¡Listo!

Ya puedes empezar a crear interfaces únicas con UI Brushstyle.

```jsx
import { OrganicButton } from '@brushstyle/organic-ui';

<OrganicButton variant="success">
  ¡Empecemos! 🎨
</OrganicButton>
```

---

**¿Necesitas ayuda?** Abre un [issue en GitHub](https://github.com/yourusername/ui-brushstyle/issues)

