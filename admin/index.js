const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Space Journey",
    width: 1920,
    height: 1080,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  mainWindow.webContents.openDevTools();

  // Function to load the URL with a retry mechanism
  const loadURLWithRetry = (url, retries = 5) => {
    mainWindow.loadURL(url).catch((err) => {
      if (retries > 0) {
        console.error(
          `Failed to load URL, retrying... (${retries} attempts left)`,
          err
        );
        setTimeout(() => loadURLWithRetry(url, retries - 1), 1000); // Retry after 1 second
      } else {
        console.error("Failed to load URL after multiple attempts", err);
      }
    });
  };

  loadURLWithRetry("http://localhost:3000"); // Adjust the URL as necessary
}

app.whenReady().then(createMainWindow);
