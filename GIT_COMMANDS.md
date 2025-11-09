# 🐙 Comandos Git para UI Brushstyle

Copia y pega estos comandos para subir tu proyecto a GitHub.

---

## 📝 Paso 1: Inicializar Git

```bash
cd "/Users/frank004/Documents/UI Brushstyle"
git init
```

---

## 📦 Paso 2: Agregar Archivos

```bash
git add .
```

---

## ✅ Paso 3: Primer Commit

```bash
git commit -m "Feat(initial): initial commit with all organic components

- Add 13 organic React components with brushstroke style
- Add OrganicBox, OrganicButton, OrganicInput, OrganicCard
- Add OrganicSelect, OrganicCheckbox, OrganicRadio, OrganicToggle
- Add OrganicModal, OrganicBadge, OrganicTooltip
- Add complete documentation (README, CONTRIBUTING, DEPLOYMENT)
- Add demo app with all components
- Configure Vite, Rollup, Tailwind CSS
- Add 7 color variants and 3 size options
- Implement SVG path generation with seeds
- Apply SOLID principles and performance optimizations"
```

---

## 🌿 Paso 4: Crear Rama Main

```bash
git branch -M main
```

---

## 🔗 Paso 5: Conectar con GitHub

**ANTES DE EJECUTAR:** Crea el repositorio en GitHub:
1. Ve a https://github.com/new
2. Nombre: `ui-brushstyle`
3. Descripción: "Componentes React con estilo orgánico tipo brushstroke"
4. Público o Privado (tu elección)
5. **NO** inicialices con README, .gitignore o licencia
6. Click en "Create repository"

Luego ejecuta (reemplaza `TU-USUARIO` con tu usuario de GitHub):

```bash
git remote add origin https://github.com/TU-USUARIO/ui-brushstyle.git
```

---

## 🚀 Paso 6: Push Inicial

```bash
git push -u origin main
```

---

## ✅ ¡Listo!

Tu proyecto ahora está en GitHub: `https://github.com/TU-USUARIO/ui-brushstyle`

---

## 📝 Comandos Adicionales Útiles

### Ver estado de Git
```bash
git status
```

### Ver historial de commits
```bash
git log --oneline
```

### Crear un nuevo commit
```bash
git add .
git commit -m "Feat(component): add new feature"
git push
```

### Crear una nueva rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### Volver a main
```bash
git checkout main
```

### Ver ramas
```bash
git branch -a
```

---

## 🏷️ Crear un Release en GitHub

1. Ve a tu repositorio en GitHub
2. Click en "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: `v1.0.0 - Initial Release`
5. Descripción:

```markdown
## 🎉 Initial Release - UI Brushstyle

Componentes React con estilo orgánico tipo "brushstroke"

### ✨ Componentes Incluidos (13)

**Base:**
- OrganicBox
- OrganicButton (6 variantes, 3 tamaños)
- OrganicInput (con soporte multiline)
- OrganicCard

**Formularios:**
- OrganicSelect
- OrganicCheckbox
- OrganicRadio & OrganicRadioGroup
- OrganicToggle

**UI:**
- OrganicModal (con hook useModal)
- OrganicBadge & OrganicBadgeCount
- OrganicTooltip

### 📦 Instalación

\`\`\`bash
pnpm add github:TU-USUARIO/ui-brushstyle
\`\`\`

### 🎨 Características

- ✅ Bordes orgánicos generados con SVG
- ✅ 7 variantes de color
- ✅ 3 tamaños (small, medium, large)
- ✅ Tree-shakeable
- ✅ Optimizado con memoización
- ✅ Accesible
- ✅ Documentación completa

### 📚 Documentación

- [README](./README.md)
- [Quick Start](./QUICKSTART.md)
- [Contributing](./CONTRIBUTING.md)
- [Deployment](./DEPLOYMENT.md)

### 🙏 Agradecimientos

Gracias por usar UI Brushstyle!
```

6. Click en "Publish release"

---

## 🌐 Configurar GitHub Pages (Demo)

### Opción 1: Manual

```bash
# Build del demo
pnpm build

# Instalar gh-pages
pnpm add -D gh-pages

# Agregar script en package.json
# "deploy": "pnpm build && gh-pages -d dist"

# Desplegar
pnpm deploy
```

Luego en GitHub:
- Settings → Pages → Source: `gh-pages` branch

### Opción 2: GitHub Actions

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
    
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Build
      run: pnpm build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

---

## 🔄 Workflow de Desarrollo

### Trabajar en una nueva feature

```bash
# 1. Crear rama
git checkout -b feat/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "Feat(component): add nueva funcionalidad"

# 3. Push de la rama
git push -u origin feat/nueva-funcionalidad

# 4. Crear Pull Request en GitHub

# 5. Después de merge, actualizar main
git checkout main
git pull origin main
```

### Actualizar versión

```bash
# Patch (1.0.0 → 1.0.1)
npm version patch

# Minor (1.0.0 → 1.1.0)
npm version minor

# Major (1.0.0 → 2.0.0)
npm version major

# Push con tags
git push --follow-tags
```

---

## 🎯 Checklist Pre-Push

- [ ] Todos los archivos están guardados
- [ ] `pnpm dev` funciona correctamente
- [ ] `pnpm build:lib` se ejecuta sin errores
- [ ] README.md está actualizado
- [ ] package.json tiene la información correcta
- [ ] .gitignore está configurado
- [ ] No hay archivos sensibles (API keys, etc.)

---

## 🆘 Solución de Problemas

### Error: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/ui-brushstyle.git
```

### Error: "failed to push some refs"

```bash
git pull origin main --rebase
git push -u origin main
```

### Deshacer último commit (sin perder cambios)

```bash
git reset --soft HEAD~1
```

### Deshacer cambios no commiteados

```bash
git checkout .
```

---

## 📞 Ayuda

Si tienes problemas:
1. Verifica que Git esté instalado: `git --version`
2. Verifica tu configuración: `git config --list`
3. Consulta la documentación: https://git-scm.com/doc

---

**¡Listo para compartir tu proyecto con el mundo! 🚀**

