# ISP MANAGER - Sistema de Gestión NOC y Telecomunicaciones

Plataforma SPA para monitoreo de infraestructura GPON, aprovisionamiento de abonados, telemetría en tiempo real y gestión de incidencias para proveedores de servicios de Internet (ISP).

Proyecto desarrollado para la cátedra **Programación 4** (UTN - FRT).

---

## 👥 Integrantes - Grupo 16

- **Alexis Lencina** (`AlexisLencina-prog`)
- **Eduardo Albarracín** (`EduardoA10`)

---

## 🚀 Novedades y Requerimientos - Trabajo Práctico N° 8

En esta entrega se consolidaron los siguientes módulos y requerimientos técnicos:

### 1. Consumo Asíncrono de API Pública (Axios)

- **Peticiones HTTP:** Consumo asíncrono desde endpoint REST externo mediante `axios.get()` en `src/Pages/ClientesPage.jsx`.
- **Ciclo de Vida:** Control de ejecución única al montar el componente utilizando `useEffect` con array de dependencias vacío (`[]`).
- **Manejo de Estados Reactivos:** Gestión de flujo con `useState` para datos (`clientes`), indicador de espera (`cargando`) y contingencia (`errorCarga`).
- **Feedback Visual:** Spinner nativo de Bootstrap durante la solicitud y botón de resincronización manual bajo demanda.

### 2. Gestión Segura de Variables de Entorno (`.env`)

- Configuración de endpoint base mediante `VITE_API_URL` consumida vía `import.meta.env.VITE_API_URL`.
- Resguardo de credenciales y rutas sensibles excluyendo `.env` y `.env.*` mediante `.gitignore`.
- Inclusión de plantilla `.env.example` para despliegues colaborativos.

### 3. Telemetría y Visualización Interactiva (Recharts)

- **Monitoreo Backbone:** Gráfico de área interactivo (`<AreaChart>`) en el Dashboard para supervisar Downstream y Upstream en vivo con simulación cíclica (`setInterval` / `clearInterval`).
- **Mesa de Ayuda:** Gráfico circular de distribución (`<PieChart>`) en `SoportePage.jsx` categorizando la tipología de incidencias (Fibra, WiFi, Enlace IP).

### 4. Diálogos y Modales Avanzados (SweetAlert2)

- Reemplazo de ventanas modales nativas del navegador por componentes estilizados con `Swal.fire`.
- Validaciones de formularios (expresiones regulares en DNI) con alertas de advertencia (`warning`).
- Confirmaciones de acciones críticas (suspensión/habilitación de servicios y resolución de tickets de soporte) con doble botón interactivo.

### 5. Modo Oscuro Global (Bootstrap 5.3)

- Alternancia dinámica de tema (`light` / `dark`) inyectando el atributo nativo `data-bs-theme` en el elemento raíz del DOM.
- Persistencia automática de la preferencia del operador mediante `localStorage`.
- Switch accesible sol/luna integrado en el `Topbar`.

### 6. Geolocalización y Cobertura NOC

- Mapa satelital interactivo embebido mediante `<iframe>` dinámico de Google Maps vinculado al estado del nodo GPON activo (`nodoActivo.lat`, `nodoActivo.lng`).

---

## 🛠️ Stack Tecnológico

- **React 19:** Biblioteca principal basada en componentes funcionales y hooks (`useState`, `useEffect`).
- **Vite:** Entorno de compilación ultrarrápido y empaquetado para producción.
- **React Router DOM 7:** Enrutamiento dinámico SPA en el cliente.
- **Bootstrap 5.3 & React-Bootstrap:** Sistema de diseño, grillas y compatibilidad nativa con modo oscuro.
- **Recharts 3:** Visualización interactiva de métricas y telemetría de red.
- **SweetAlert2 11:** Modales accesibles y confirmaciones de usuario.
- **Axios 1.20:** Cliente HTTP basado en promesas.
- **Bootstrap Icons 1.13:** Iconografía técnica vectorial.

---

