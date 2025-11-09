# 🚀 Guía de Despliegue

Esta guía te ayudará a publicar UI Brushstyle en GitHub y opcionalmente en npm.

## 📦 Preparación

### 1. Verificar que todo funcione

```bash
# Instalar dependencias
pnpm install

# Probar en desarrollo
pnpm dev

# Build de la librería
pnpm build:lib

# Verificar que se creó la carpeta dist/
ls -la dist/
```

### 2. Actualizar información del proyecto

Edita `package.json`:

```json
{
  "name": "@tu-usuario/organic-ui",
  "author": "Tu Nombre <tu@email.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/tu-usuario/ui-brushstyle.git"
  }
}
```

## 🐙 Publicar en GitHub

### Paso 1: Inicializar Git

```bash
git init
git add .
git commit -m "Feat(initial): initial commit with all components"
```

### Paso 2: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre: `ui-brushstyle`
3. Descripción: "Componentes React con estilo orgánico tipo brushstroke"
4. Público o Privado (tu elección)
5. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)

### Paso 3: Conectar y subir

```bash
git remote add origin https://github.com/tu-usuario/ui-brushstyle.git
git branch -M main
git push -u origin main
```

### Paso 4: Configurar GitHub Pages (opcional)

Para el demo en vivo:

```bash
# Build del demo
pnpm build

# Subir a gh-pages
pnpm add -D gh-pages

# Agregar script en package.json
"deploy": "pnpm build && gh-pages -d dist"

# Desplegar
pnpm deploy
```

Luego en GitHub:
- Settings → Pages → Source: `gh-pages` branch

## 📦 Usar desde GitHub

Otros proyectos pueden instalar directamente desde GitHub:

```bash
# Con pnpm
pnpm add github:tu-usuario/ui-brushstyle

# Con npm
npm install github:tu-usuario/ui-brushstyle

# Con yarn
yarn add github:tu-usuario/ui-brushstyle
```

## 🔄 Desarrollo Local (Link)

Para desarrollar y probar localmente:

```bash
# En el proyecto ui-brushstyle
cd ui-brushstyle
pnpm link --global

# En tu proyecto que usa la librería
cd mi-proyecto
pnpm link --global @brushstyle/organic-ui
```

## 📝 npm Registry (Opcional)

### Requisitos

- Cuenta en https://www.npmjs.com/
- Nombre de paquete disponible

### Pasos

```bash
# Login en npm
npm login

# Publicar (asegúrate de que el nombre esté disponible)
pnpm publish --access public
```

### Actualizar versión

Sigue [Semantic Versioning](https://semver.org/):

```bash
# Patch (1.0.0 → 1.0.1) - Bug fixes
pnpm version patch

# Minor (1.0.0 → 1.1.0) - Nuevas features
pnpm version minor

# Major (1.0.0 → 2.0.0) - Breaking changes
pnpm version major

# Publicar nueva versión
pnpm publish
```

## 🏷️ Releases en GitHub

### Crear un Release

1. Ve a tu repo → Releases → Create a new release
2. Tag: `v1.0.0`
3. Title: `v1.0.0 - Initial Release`
4. Descripción:

```markdown
## 🎉 Initial Release

### ✨ Componentes Incluidos

- OrganicBox
- OrganicButton (6 variantes, 3 tamaños)
- OrganicInput (con soporte multiline)
- OrganicCard
- OrganicSelect
- OrganicCheckbox
- OrganicRadio & OrganicRadioGroup
- OrganicToggle
- OrganicModal (con hook useModal)
- OrganicBadge & OrganicBadgeCount
- OrganicTooltip

### 📦 Instalación

\`\`\`bash
pnpm add github:tu-usuario/ui-brushstyle
\`\`\`

### 📚 Documentación

Ver [README.md](./README.md) para ejemplos de uso.
```

## 🔒 Configuración de Seguridad

### .npmignore (si publicas en npm)

Crea `.npmignore`:

```
# Archivos de desarrollo
src/
public/
*.md
!README.md
.gitignore
.babelrc
vite.config.js
tailwind.config.js
postcss.config.js
rollup.config.js

# Archivos del demo
index.html
src/App.jsx
src/main.jsx
src/index.css
```

## 📊 GitHub Actions (CI/CD)

Crea `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Build library
      run: pnpm build:lib
    
    - name: Build demo
      run: pnpm build
```

## 🎯 Checklist Pre-Publicación

- [ ] Todas las dependencias instaladas
- [ ] `pnpm build:lib` funciona sin errores
- [ ] `pnpm dev` muestra el demo correctamente
- [ ] README.md completo y actualizado
- [ ] package.json con información correcta
- [ ] LICENSE incluida
- [ ] .gitignore configurado
- [ ] Todos los componentes exportados en index.js
- [ ] Commits siguen la convención establecida

## 📞 Soporte

Si tienes problemas:

1. Revisa los [Issues](https://github.com/tu-usuario/ui-brushstyle/issues)
2. Abre un nuevo issue con detalles
3. Únete a las [Discussions](https://github.com/tu-usuario/ui-brushstyle/discussions)

---

**¡Listo para compartir tu librería con el mundo! 🎨✨**

