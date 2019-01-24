const {app, BrowserWindow} = require('electron')

let mainWindow

function createMain() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    resizable: false,
    useContentSize: true,
    autoHideMenuBar: true
  })
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', () => {
    mainWindow = null
    docWindow = null
  })
}

app.on('ready', createMain)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createMain()
})
