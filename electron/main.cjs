// StartCode Electron Main Process
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const log = require('electron-log');

// Configure logging
log.transports.file.level = 'info';
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// Auto-updater configuration
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow;
let updateCheckInterval;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs'),
        },
        icon: path.join(__dirname, '../public/favicon.svg'),
        titleBarStyle: 'hiddenInset',
        show: false,
    });

    // Load the app
    if (process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        // Check for updates on startup
        checkForUpdates();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Auto-updater events
function setupAutoUpdater() {
    autoUpdater.on('checking-for-update', () => {
        log.info('Checking for updates...');
        sendStatusToWindow('checking-for-update');
    });

    autoUpdater.on('update-available', (info) => {
        log.info('Update available:', info.version);
        sendStatusToWindow('update-available', info);

        // Show dialog to inform user
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Update Available',
            message: `A new version (${info.version}) is available and will be downloaded automatically.`,
            buttons: ['OK'],
        });
    });

    autoUpdater.on('update-not-available', (info) => {
        log.info('Update not available');
        sendStatusToWindow('update-not-available', info);
    });

    autoUpdater.on('error', (err) => {
        log.error('Auto-updater error:', err);
        sendStatusToWindow('error', err.message);
    });

    autoUpdater.on('download-progress', (progressObj) => {
        log.info(`Download progress: ${progressObj.percent.toFixed(1)}%`);
        sendStatusToWindow('download-progress', progressObj);
    });

    autoUpdater.on('update-downloaded', (info) => {
        log.info('Update downloaded:', info.version);
        sendStatusToWindow('update-downloaded', info);

        // Force update - show dialog and quit to install
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Update Ready',
            message: `Version ${info.version} has been downloaded. The application will restart to install the update.`,
            buttons: ['Restart Now'],
            defaultId: 0,
        }).then(() => {
            // Force quit and install
            autoUpdater.quitAndInstall(false, true);
        });
    });
}

function sendStatusToWindow(status, data = null) {
    if (mainWindow) {
        mainWindow.webContents.send('update-status', { status, data });
    }
}

function checkForUpdates() {
    if (!app.isPackaged) {
        log.info('Skipping update check in development mode');
        return;
    }

    autoUpdater.checkForUpdates().catch((err) => {
        log.error('Failed to check for updates:', err);
    });
}

// IPC handlers
ipcMain.handle('check-for-updates', async () => {
    checkForUpdates();
});

ipcMain.handle('get-app-version', async () => {
    return app.getVersion();
});

ipcMain.handle('quit-and-install', async () => {
    autoUpdater.quitAndInstall(false, true);
});

// App lifecycle
app.whenReady().then(() => {
    setupAutoUpdater();
    createWindow();

    // Check for updates every 30 minutes
    updateCheckInterval = setInterval(() => {
        checkForUpdates();
    }, 30 * 60 * 1000);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (updateCheckInterval) {
        clearInterval(updateCheckInterval);
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Security: Prevent navigation to external URLs
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);
        if (parsedUrl.origin !== 'file://' && !navigationUrl.startsWith('http://localhost')) {
            event.preventDefault();
        }
    });
});
