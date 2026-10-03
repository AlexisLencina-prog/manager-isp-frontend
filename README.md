# ISP MANAGER - Frontend (React 19 + Vite)

Sistema integral de gestión de abonados, telemetría de red, asignación de planes comerciales y administración de soporte técnico para proveedores de servicios de Internet (ISP).

Proyecto desarrollado para la cátedra **Programación 4** (UTN - FRT).

---

## 👥 Integrantes - Grupo 16

- **Alexis Lencina** (`AlexisLencina-prog`)
- **Eduardo Albarracín** (`EduardoA10`)

---

## 📋 Requerimientos y Novedades (Trabajo Práctico Nº 6)

En esta versión se reestructuró la aplicación para cumplir con los lineamientos del **TP6**:
- **Navegación SPA con React Router:** Migración del renderizado condicional anterior a una arquitectura de rutas cliente con `react-router-dom` (`Routes`, `Route`, `Navigate`).
- **Arquitectura Modular por Páginas:** Separación formal entre componentes de interfaz reutilizables (`src/Components/`) y vistas/pantallas principales (`src/Pages/`).
- **Renderizado Dinámico y Keys:** Iteración mediante `.map()` con identificadores unívocos (`key`) para la nómina de planes comerciales y la cola de tickets.
- **Paso de Props y Manejo de Estado:** Comunicación de propiedades y estado local desacoplado utilizando React Hooks (`useState`).
- **Diseño Responsivo:** Maquetado responsivo apoyado en el sistema de grillas y clases utilitarias de Bootstrap 5.

---

## 📌 Estrategias de Metadatos y Optimización (`index.html`)

El archivo `index.html` mantiene los estándares de accesibilidad, indexación y consola limpia:

1. **Codificación y Renderizado Responsivo:**
   * `<meta charset="UTF-8" />`: Garantiza la correcta codificación de caracteres especiales y acentos.
   * `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`: Configura el viewport dinámico adaptativo para dispositivos móviles, tablets y monitores de escritorio.

2. **SEO y Metadatos Descriptivos:**
   * `<meta name="description" ... />`: Resumen formal del propósito del sistema para motores de búsqueda.
   * `<meta name="keywords" ... />`: Términos clave del dominio técnico (ISP, telecomunicaciones, fibra óptica, GPON, React, Vite).
   * `<meta name="author" content="Grupo 16 - Cátedra Programación 4" />`: Identificación formal de autoría del equipo de desarrollo.

---

## 🛠️ Tecnologías y Librerías

- **React 19:** Biblioteca principal para el desarrollo de la interfaz de usuario basada en componentes funcionales.
- **Vite 5:** Entorno de compilación ultrarrápido y servidor de desarrollo local.
- **React Router DOM 6+:** Enrutamiento dinámico en el lado del cliente (SPA).
- **Bootstrap 5.3 & React-Bootstrap:** Maquetado responsivo, grillas y componentes de UI.
- **Bootstrap Icons 1.13:** Iconografía vectorial técnica.

---

## 📂 Estructura del Proyecto (`src/`)

```text
manager-isp-frontend/
├── public/                  # Recursos estáticos y manifiestos
│   └── favicon.svg          # Identificador gráfico
├── src/
│   ├── assets/              # Multimedia e imágenes del proyecto
│   ├── Components/          # Componentes reutilizables de UI
│   │   ├── AppRouter.jsx    # Configuración central de rutas (React Router)
│   │   ├── KpiCard.jsx      # Tarjetas de telemetría y métricas
│   │   ├── Sidebar.jsx      # Navegación lateral persistente con NavLink/Link
│   │   └── Topbar.jsx       # Telemetría en vivo, guardia NOC y estado
│   ├── Pages/               # Vistas principales de la aplicación
│   │   ├── ClientesPage.jsx # Nómina y aprovisionamiento de abonados
│   │   ├── DashboardPage.jsx# Monitoreo general y métricas NOC
│   │   ├── NotFoundPage.jsx # Control de errores y manejo de rutas 404
│   │   ├── PlanesPage.jsx   # Gestión de perfiles comerciales y tarifarios
│   │   └── SoportePage.jsx  # Mesa de ayuda, cola de incidencias y formulario
│   ├── App.jsx              # Contenedor raíz con layout principal
│   ├── index.css            # Estilos globales
│   └── main.jsx             # Punto de entrada e inyección del Router
├── index.html               # Plantilla HTML con metadatos técnicos
├── package.json             # Manifiesto de dependencias y scripts
└── vite.config.js           # Configuración del empaquetador Vite