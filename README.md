# Portafolio - Hassler Enrique Isaac Acosta

Portafolio personal como Ingeniero Frontend & Full-Stack creando productos digitales escalables.

## 📁 Estructura del Proyecto

```
/
├── index.html              # HTML principal
├── css/
│   └── styles.css         # Estilos personalizados
├── js/
│   └── script.js          # JavaScript personalizado
├── README.md              # Este archivo
└── .gitignore             # Archivos ignorados por git
```

## 🚀 Características

- **Diseño Responsivo**: Adaptado para móviles, tablets y desktop
- **Performance Optimizado**: Tailwind CSS CDN + Font Awesome 6.0.0
- **Animaciones Suaves**: Scroll-based fade-in y efectos SVG
- **Dark Mode**: Diseño oscuro moderno con gradientes púrpura
- **Secciones Conectadas**: Conectores SVG dinámicos entre secciones

## 📋 Secciones

1. **Hero** - Presentación con foto, badge de experiencia y logos de empresas
2. **Experiencia** - 3 roles profesionales con descripción e impacto
3. **Proyectos Personales** - NestEgg, PerksRadar, LiveCanvas
4. **Stack Técnico** - Tecnologías: Angular, React, Laravel, FastAPI, etc.
5. **Contacto** - Enlaces a LinkedIn, GitHub y email

## 🛠️ Tecnologías

- **Frontend**: HTML5, Tailwind CSS, Font Awesome 6.0.0
- **Animaciones**: SVG + CSS @keyframes
- **CDN**: Clearbit Logo API, Simple Icons CDN
- **JavaScript**: Vanilla JS - IntersectionObserver para scroll animations

## 📱 Desplegar a GitHub Pages

### Opción 1: Usar la carpeta raíz (recomendado)

1. Pushea el código a tu repositorio GitHub:
```bash
git add .
git commit -m "Initial portfolio"
git push origin main
```

2. Ve a **Settings** → **Pages**
3. Selecciona **Deploy from a branch**
4. Elige **main** y **/ (root)**
5. Click en **Save**

Tu portafolio estará disponible en: `https://tuusuario.github.io/nombre-repo`

### Opción 2: Usar carpeta `/docs`

1. Copia todo el contenido a una carpeta `/docs`
2. En **Settings** → **Pages**
3. Selecciona **Deploy from a branch**
4. Elige **main** y **/docs**
5. Click en **Save**

## ✅ Verificación

- Abre tu URL en el navegador
- Verifica que los logos de empresas cargen correctamente (Clearbit API)
- Prueba las animaciones al hacer scroll
- Revisa en mobile view con DevTools

## 📝 Modificaciones Frecuentes

### Cambiar foto de perfil
Reemplaza la URL en `index.html` línea ~215:
```html
<img src="TU_URL_DE_FOTO" alt="Hassler" class="w-full h-full object-cover">
```

### Actualizar experiencia
Edita las secciones de experiencia en `index.html` (~línea 395)

### Cambiar tema de colores
Modifica variables de color en `css/styles.css`:
- `#a855f7` - Purple 500
- `#7c3aed` - Purple 600

## 🔗 Enlaces Útiles

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Simple Icons CDN](https://simpleicons.org/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de adaptarlo a tus necesidades.

---

**Última actualización:** Abril 2026
