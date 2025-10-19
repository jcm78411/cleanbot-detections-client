const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const sqlite3 = require("sqlite3").verbose();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const db = new sqlite3.Database(path.join(__dirname, "data/data.db"));
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS detecciones (
id INTEGER PRIMARY KEY AUTOINCREMENT,
material TEXT,
frecuencia INTEGER,
frec_roja INTEGER,
frec_verde INTEGER,
frec_azul INTEGER,
fecha_hora TEXT
)`);
});

async function fetchAndStoreDetections() {
  try {
    const res = await fetch("http://192.168.0.100:5000/detecciones");
    const data = await res.json();

    db.serialize(() => {
      const stmt =
        db.prepare(`INSERT INTO detecciones (material, frecuencia, frec_roja, frec_verde, frec_azul, fecha_hora)
VALUES (?, ?, ?, ?, ?, ?)`);
      data.forEach((row) => {
        stmt.run(
          row.material,
          row.frecuencia,
          row.frec_roja,
          row.frec_verde,
          row.frec_azul,
          row.fecha_hora
        );
      });
      stmt.finalize();
    });

    return data;
  } catch (err) {
    console.error("Error al obtener datos:", err);
    return [];
  }
}

try {
  require("electron-reloader")(module, {
    // Opciones útiles durante el desarrollo
    watchRenderer: true,
    debug: true,
    // Ruta al binario de electron (ayuda en entornos Windows)
    electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
    // Excluir el archivo data.db en la carpeta src para que no dispare recargas
    ignore: [
      path.join(__dirname, "data", "data.db"),
      path.join(__dirname, "data", "data.db-journal"),
    ],
  });
} catch (err) {
  console.error("electron-reloader no pudo iniciarse:", err);
}
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.resizable = false;

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      console.log("✅ Servidor Electron iniciado");
    }
  });
});

ipcMain.handle("fetch-detections", async () => {
  const detections = await fetchAndStoreDetections();
  return detections;
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
