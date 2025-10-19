const ctxMateriales = document.getElementById("chartMateriales");
const ctxFrecuencia = document.getElementById("chartFrecuencia");
let chartMateriales, chartFrecuencia;
let lastDataCount = 0;

async function cargarDatos(showNotification = true) {
  document.getElementById("status").innerText = "Cargando...";
  const data = await window.cleanbot.fetchDetections();
//   deteccionesOriginal = data;
//   llenarSelectMateriales(data);

  document.getElementById("status").innerText =
    `Datos cargados (${data.length})`;

  // Notificación si hay nuevos datos
  if (showNotification && data.length > lastDataCount) {
    mostrarNotificacion();
  }
  lastDataCount = data.length;

  // Render tabla
  const tbody = document.getElementById("tablaDetecciones");
  tbody.innerHTML = data
    .slice(-10)
    .reverse()
    .map(
      (d) => `
      <tr class='border-b hover:bg-gray-50'>
        <td>${d.id}</td>
        <td>${d.material}</td>
        <td>${d.frecuencia}</td>
        <td>${d.frec_roja}</td>
        <td>${d.frec_verde}</td>
        <td>${d.frec_azul}</td>
        <td>${d.fecha_hora}</td>
      </tr>`
    )
    .join("");

  // Agrupar por material
  const conteo = {};
  data.forEach((d) => {
    conteo[d.material] = (conteo[d.material] || 0) + 1;
  });

  const materiales = Object.keys(conteo);
  const cantidades = Object.values(conteo);

  // Promedios de frecuencia
  const labels = data.map((d) => {
    const fecha = d.fecha_hora; // "YYYY-MM-DD HH:MM:SS"
    const horaCompleta = fecha.split(" ")[1]; // "HH:MM:SS"
    return horaCompleta.slice(0, 5); // "HH:MM"
  });
  const frec = data.map((d) => d.frecuencia);

  // Chart materiales
  if (chartMateriales) chartMateriales.destroy();
  chartMateriales = new Chart(ctxMateriales, {
    type: "pie",
    data: {
      labels: materiales,
      datasets: [
        {
          data: cantidades,
          backgroundColor: [
            "#16a34a",
            "#0ea5e9",
            "#facc15",
            "#ef4444",
            "#9333ea",
          ],
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
    },
  });

  // Chart frecuencia (R, G, B y promedio)
  if (chartFrecuencia) chartFrecuencia.destroy();

  const frecR = data.map((d) => d.frec_roja);
  const frecG = data.map((d) => d.frec_verde);
  const frecB = data.map((d) => d.frec_azul);
  const frecProm = data.map(
    (d) =>
      (Number(d.frec_roja) + Number(d.frec_verde) + Number(d.frec_azul)) / 3
  );

  chartFrecuencia = new Chart(ctxFrecuencia, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "frec_roja",
          data: frecR,
          borderColor: "#ef4444",
          fill: false,
        },
        {
          label: "frec_verde",
          data: frecG,
          borderColor: "#22c55e",
          fill: false,
        },
        {
          label: "frec_azul",
          data: frecB,
          borderColor: "#3b82f6",
          fill: false,
        },
        {
          label: "frec_prom",
          data: frecProm,
          borderColor: "#facc15",
          borderDash: [5, 5],
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Frecuencia (Hz)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Fecha y hora",
          },
        },
      },
    },
  });
}

function mostrarNotificacion() {
  const notif = document.getElementById("notification");

  notif.style.position = "fixed";
  notif.style.bottom = "20px";
  notif.style.right = "20px";
  notif.style.background = "#16a34a";
  notif.style.color = "white";
  notif.style.padding = "12px 18px";
  notif.style.borderRadius = "8px";
  notif.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  notif.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  notif.style.transform = "translateX(120%)";
  notif.classList.remove("hidden");

  requestAnimationFrame(() => {
    notif.style.opacity = 1;
    notif.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    notif.style.opacity = 0;
    notif.style.transform = "translateX(120%)";
    setTimeout(() => notif.classList.add("hidden"), 500);
  }, 3000);
}

document
  .getElementById("refreshBtn")
  .addEventListener("click", () => cargarDatos(false));

setInterval(() => cargarDatos(), 30000);

cargarDatos(false);
