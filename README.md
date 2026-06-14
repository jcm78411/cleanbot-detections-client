<div align="center">

# ♻️ CleanBot Detections Client

### Plataforma de monitoreo y visualización de detecciones para sistemas de clasificación inteligente de residuos

![Electron](https://img.shields.io/badge/Electron-Desktop_App-blue)
![SQLite](https://img.shields.io/badge/SQLite-Database-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Chart.js](https://img.shields.io/badge/Chart.js-Data_Visualization-orange)
![Estado](https://img.shields.io/badge/Estado-Finalizado-success)

*Aplicación de escritorio desarrollada para monitorear, almacenar y analizar en tiempo real las detecciones realizadas por un sistema automatizado de clasificación de materiales reciclables.*

</div>

---

## 📋 Tabla de Contenido

- [📖 Descripción](#-descripción)
- [✨ Características](#-características)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación](#-instalación)
- [▶️ Uso](#️-uso)
- [📊 Visualizaciones](#-visualizaciones)
- [💾 Persistencia de Datos](#-persistencia-de-datos)
- [🔮 Mejoras Futuras](#-mejoras-futuras)
- [🎓 Aprendizajes](#-aprendizajes)
- [👨‍💻 Autor](#-autor)

---

# 📖 Descripción

Este proyecto consiste en una aplicación de escritorio desarrollada con **Electron** para supervisar y registrar las detecciones generadas por un sistema inteligente de clasificación de residuos.

La aplicación se conecta periódicamente a un servicio externo encargado de realizar las detecciones, obtiene los datos generados por sensores o algoritmos de clasificación y los almacena localmente en una base de datos SQLite.

Además, proporciona herramientas de visualización que permiten analizar el comportamiento del sistema mediante gráficos interactivos y tablas de monitoreo.

---

# ✨ Características

✅ Aplicación de escritorio multiplataforma basada en Electron.

✅ Obtención automática de detecciones desde un servicio remoto.

✅ Almacenamiento local mediante SQLite.

✅ Historial persistente de detecciones.

✅ Visualización gráfica en tiempo real.

✅ Notificaciones automáticas cuando llegan nuevos registros.

✅ Tabla de monitoreo con los últimos eventos registrados.

✅ Estadísticas de materiales detectados.

✅ Seguimiento de frecuencias RGB capturadas por sensores.

✅ Arquitectura ligera y de fácil despliegue.

---

# 🛠️ Tecnologías Utilizadas

| Tecnología | Función |
|------------|----------|
| Electron | Aplicación de escritorio |
| JavaScript | Lógica del sistema |
| SQLite | Persistencia local |
| Chart.js | Visualización de datos |
| HTML5 | Interfaz de usuario |
| Tailwind CSS | Diseño visual |
| Node.js | Backend local |
| Electron Forge | Empaquetado y distribución |

---

# 🏗️ Arquitectura del Sistema

```text
Sistema de Detección
        │
        ▼
 API de Detecciones
        │
        ▼
 Cliente Electron
        │
 ┌──────┴──────┐
 ▼             ▼
SQLite      Dashboard
(Base de    (Gráficas y
 Datos)      Monitoreo)
```

---

# 📂 Estructura del Proyecto

```text
cleanbot-detections-client/
│
├── src/
│   ├── data/
│   │   └── data.db
│   │
│   ├── js/
│   │   ├── chart.js
│   │   └── cdn.tailwind.js
│   │
│   ├── index.js
│   ├── preload.js
│   ├── renderer.js
│   ├── index.html
│   └── index.css
│
├── forge.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

# 🚀 Instalación

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/jcm78411/cleanbot-detections-client.git
cd cleanbot-detections-client
```

## 2️⃣ Instalar dependencias

```bash
npm install
```

## 3️⃣ Ejecutar en modo desarrollo

```bash
npm start
```

---

# ▶️ Uso

Al iniciar la aplicación:

1. Se establece conexión con el servidor de detecciones.
2. Se descargan los registros disponibles.
3. Los datos son almacenados automáticamente en SQLite.
4. El panel actualiza las visualizaciones.
5. Se muestran alertas cuando se detectan nuevos eventos.

La aplicación funciona como una consola de monitoreo para supervisar el comportamiento del sistema de clasificación.

---

# 📊 Visualizaciones

## 🥧 Distribución de Materiales

Gráfico circular que muestra la cantidad de detecciones agrupadas por tipo de material.

Permite identificar:

- Materiales más frecuentes.
- Distribución general de residuos.
- Tendencias de clasificación.

---

## 📈 Frecuencias RGB

Gráfico de líneas que representa:

- Frecuencia Roja
- Frecuencia Verde
- Frecuencia Azul
- Frecuencia Promedio

Estas métricas permiten analizar el comportamiento de los sensores utilizados durante el proceso de identificación.

---

## 📋 Historial de Detecciones

La aplicación muestra los registros más recientes incluyendo:

| Campo |
|---------|
| ID |
| Material |
| Frecuencia |
| Frecuencia Roja |
| Frecuencia Verde |
| Frecuencia Azul |
| Fecha |
| Hora |

---

# 💾 Persistencia de Datos

Todas las detecciones recuperadas son almacenadas automáticamente en una base de datos SQLite local.

Tabla principal:

```sql
CREATE TABLE detecciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    material TEXT,
    frecuencia INTEGER,
    frec_roja INTEGER,
    frec_verde INTEGER,
    frec_azul INTEGER,
    fecha_hora TEXT
);
```

Esto permite conservar el historial incluso después de cerrar la aplicación.

---

# 🔔 Sistema de Notificaciones

Cuando el sistema detecta nuevos registros:

- Se actualizan automáticamente los gráficos.
- Se refresca la tabla de monitoreo.
- Se muestra una notificación visual al usuario.

Esto facilita la supervisión continua del sistema de clasificación.

---

# 🔮 Mejoras Futuras

- [ ] Exportación de reportes PDF.
- [ ] Filtros por fecha y material.
- [ ] Búsqueda avanzada.
- [ ] Dashboard web complementario.
- [ ] Conexión con múltiples dispositivos CleanBot.
- [ ] Estadísticas históricas avanzadas.
- [ ] Generación automática de alertas.
- [ ] Integración con servicios en la nube.

---

# 🎓 Aprendizajes

Durante el desarrollo de este proyecto se fortalecieron conocimientos relacionados con:

- Desarrollo de aplicaciones de escritorio.
- Electron y Node.js.
- Bases de datos SQLite.
- Visualización de datos.
- Comunicación cliente-servidor.
- Diseño de dashboards.
- Persistencia local de información.
- Monitoreo de sistemas IoT.

---

# 👨‍💻 Autor

**Juan Luis Cueto Morelo**

Ingeniero de Sistemas

Áreas de interés:

- Inteligencia Artificial
- Internet de las Cosas (IoT)
- Desarrollo de Software
- Ciencia de Datos
- Automatización Industrial

GitHub:

:contentReference[oaicite:0]{index=0}

---

<div align="center">

### ⭐ Este proyecto tiene dos partes, consulta la otra en: **[monitor_detecciones](https://github.com/jcm78411/cleanbot-detections)**.

♻️ Monitoreando residuos • 📊 Analizando detecciones • 🚀 Construyendo soluciones inteligentes

</div>
