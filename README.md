# ISP MANAGER - Frontend (React + Vite)

Sistema integral de gestión de abonados, telemetría de red, asignación de planes comerciales y administración de soporte técnico para proveedores de servicios de Internet (ISP).

Proyecto desarrollado para el **Trabajo Práctico Nº 5** de la cátedra **Programación 4**.

---

## 👥 Integrantes - Grupo 16

* **Alexis Lencina** (`AlexisLencina-prog`)
* **Eduardo Albarracín** (`EduardoA10`)

---

## 📌 Estrategias de Metadatos y Optimización (`index.html`)

En cumplimiento con los requerimientos técnicos de la cátedra, el archivo `index.html` fue configurado siguiendo estándares de accesibilidad, indexación y consola limpia:

1. **Codificación y Renderizado Responsivo:**
   * `<meta charset="UTF-8" />`: Asegura la correcta visualización de caracteres especiales y acentos en español.
   * `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`: Configura el viewport dinámico adaptativo para visualización en dispositivos móviles y monitores de escritorio.

2. **SEO y Metadatos Descriptivos:**
   * `<meta name="description" ... />`: Resumen formal del propósito del sistema para motores de búsqueda y navegadores.
   * `<meta name="keywords" ... />`: Términos clave del dominio técnico (ISP, telecomunicaciones, fibra óptica, GPON, React).
   * `<meta name="author" content="Grupo 16 - Cátedra Programación 4" />`: Identificación formal de autoría del equipo de desarrollo.

---

## 🛠️ Tecnologías y Librerías

* **React 19:** Biblioteca principal para el desarrollo de la interfaz basada en componentes funcionales, props y hooks de estado (`useState`, `useEffect`).
* **Vite:** Entorno de compilación ultrarrápido y servidor de desarrollo local.
* **Bootstrap 5.3 & React-Bootstrap:** Maquetado responsivo, grillas (`row`, `col`) y componentes visuales oficiales.
* **Bootstrap Icons:** Iconografía vectorial técnica.
* **CSS Nativo Mínimo:** Utilización estricta de clases utilitarias de Bootstrap para evitar sobrecarga de hojas de estilo personalizadas.

---

## 📂 Estructura Modular del Proyecto

Siguiendo las pautas de arquitectura dadas en clase, la carpeta `Components` se organiza con mayúscula inicial conteniendo módulos desacoplados y reutilizables:

```text
manager-isp-frontend/
├── public/                  # Recursos estáticos y manifiestos
│   └── favicon.svg          # Identificador gráfico
├── src/
│   ├── assets/              # Multimedia del proyecto
│   ├── Components/          # Componentes modulares reutilizables
│   │   ├── ClientesView.jsx   # Nómina y aprovisionamiento de abonados
│   │   ├── DashboardView.jsx  # Monitoreo, saturación y enlaces de red
│   │   ├── KpiCard.jsx        # Tarjetas de telemetría con props y sparklines
│   │   ├── PlanesView.jsx     # Catálogo comercial con recálculo dinámico
│   │   ├── Sidebar.jsx        # Navegación lateral persistente por pestañas
│   │   ├── SoporteView.jsx    # Mesa de ayuda, cola de incidencias y métricas
│   │   └── Topbar.jsx         # Telemetría en vivo, guardia NOC y acciones
│   ├── App.jsx              # Ensamblador central y orquestador de estado
│   ├── index.css            # Estilos globales y microinteracciones de interfaz
│   └── main.jsx             # Punto de entrada e inyección de estilos Bootstrap
├── index.html               # Plantilla HTML con metadatos técnicos
├── package.json             # Manifiesto de dependencias y scripts
└── vite.config.js           # Configuración de compilación Vite