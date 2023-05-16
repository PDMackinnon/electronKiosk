const { app, screen, BrowserWindow } = require('electron')

let menuWindow;

const createWindow = () => {

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  const win = new BrowserWindow({
    width,
    height,
    closable: true, // false prevents quitting too !
    // fullscreen: true,
    // kiosk: true,
  })

  menuWindow = win;

  win.loadFile('Index.html')


  win.webContents.on('will-navigate', function(e, url) {
    e.preventDefault();
    openSite(url);

  });

}

function openSite(url) {

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  const child = new BrowserWindow({ 
    parent: menuWindow ,
    // modal: true, 
    show: false ,
    width,
    height,
    closable: true,


  
  })
  child.loadURL(url)

  child.once('ready-to-show', () => {
    child.show()
  })

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})