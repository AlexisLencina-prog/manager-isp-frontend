# ISP MANAGER - Sistema de Gestión NOC y Telecomunicaciones

Plataforma SPA desarrollada en React para el monitoreo de infraestructura de red GPON, administración del padrón de abonados, catálogo de planes comerciales y gestión de reclamos técnicos para proveedores de servicios de Internet (ISP).

Proyecto desarrollado para la cátedra **Programación 4** (UTN - FRT).

## Integrantes - Grupo 16

- **Alexis Lencina** (`AlexisLencina-prog`)
- **Eduardo Albarracín** (`EduardoA10`)

---

## Estrategias SEO y Accesibilidad Implementadas

Para optimizar la indexación en motores de búsqueda (SEO) y cumplir con los estándares de accesibilidad web evaluados en Lighthouse, se aplicaron las siguientes estrategias técnicas:

1. **Metadatos Semánticos en `index.html`:**
   - Configuración del idioma mediante el atributo `lang="es"` en la etiqueta raíz `<html>`.
   - Definición de `<title>` descriptivo y actualización dinámica de `document.title` mediante `useEffect` en la vista de soporte para reflejar en tiempo real la cantidad de tickets abiertos.
   - Inclusión de metaetiquetas `description`, `keywords`, `author` y `robots="index, follow"` para guiar a los rastreadores web.
   - Etiqueta `viewport` (`width=device-width, initial-scale=1.0`) para garantizar adaptabilidad Mobile-First.

2. **Estructura HTML5 Semántica y Jerarquía de Encabezados:**
   - Uso de etiquetas estructurales `<header>`, `<aside>`, `<nav>`, `<main>`, `<section>` y `<footer>` para delimitar las áreas del sistema.
   - Jerarquía ordenada de títulos con un único encabezado principal `<h1>` por vista acompañado de subtítulos `<h2>` y `<h3>`.

3. **Accesibilidad (WAI-ARIA) y Contraste:**
   - Implementación de atributos `aria-label`, `role="search"` y `role="progressbar"` en formularios, tablas, barras de capacidad y controles de navegación.
   - Asociación explícita `<label htmlFor="...">` en todos los campos de entrada.
   - Soporte nativo de Modo Claro y Modo Oscuro mediante `data-bs-theme` de Bootstrap 5.3 asegurando relaciones de contraste legibles.

4. **Optimización de Recursos y Rendimiento:**
   - Carga diferida (`loading="lazy"`) en el `<iframe>` cartográfico de Google Maps para no bloquear el hilo principal durante el renderizado inicial.
   - Icono de aplicación (`public/favicon.svg`) personalizado en formato vectorial liviano.

---

## Requerimientos Implementados - Trabajo Práctico N° 8

### 1. Consumo Asíncrono de API Pública (Axios)

- Petición HTTP `GET` mediante `axios.get()` en `src/Pages/ClientesPage.jsx` controlada al montar el componente con `useEffect`.
- Manejo de estados con `useState` para la nómina (`clientes`), indicador de espera (`cargando`) y control de fallos (`errorCarga`).
- Sincronización con el buscador global de la barra superior mediante parámetros de URL (`useSearchParams`).

### 2. Gestión de Variables de Entorno (`.env`)

- Configuración de la ruta base mediante `import.meta.env.VITE_API_URL`.
- Resguardo del archivo local `.env` excluyéndolo del control de versiones a través de `.gitignore`.

### 3. Visualización Técnica con Recharts

- **Monitor de Red (`DashboardPage.jsx`):** Gráfico de área (`AreaChart`) con línea de umbral crítico (4.5 Gbps), tabla estadística de valores mínimos, máximos y promedios (RX/TX), y gráfico de barras (`BarChart`) de latencia ICMP por nodo.
- **Padrón de Clientes (`ClientesPage.jsx`):** Gráfico de barras apiladas por plan comercial y gráfico de anillo (`PieChart`) de tasa de servicio activo.
- **Catálogo de Planes (`PlanesPage.jsx`):** Gráfico combinado (`ComposedChart`) de caudal/ráfaga, gráfico radar (`RadarChart`) de prestaciones técnicas e indicador radial (`RadialBarChart`).
- **Mesa de Reclamos (`SoportePage.jsx`):** Distribución porcentual por tipo de falla, evolución de tiempos de respuesta SLA y volumen de tickets por severidad.

### 4. Diálogos Interactivos (SweetAlert2) y Modo Oscuro

- Validaciones de formularios, diagnósticos remotos de nodos/ONT, baja de clientes y confirmación de cierre/reapertura de tickets mediante `Swal.fire`.
- Selector de tema (`light` / `dark`) en `Topbar.jsx` con persistencia en `localStorage`.

---

## Stack Tecnológico

- **React 19** & **Vite 8**
- **React Router DOM 7**
- **Bootstrap 5.3** & **React-Bootstrap**
- **Recharts 3**
- **SweetAlert2 11**
- **Axios 1.20**
- **Bootstrap Icons 1.13**

---
