const electron =require("electron") ;
const ejse =require("ejs-electron") ;
const app = electron.app ;
const BrowserWindow = electron.BrowserWindow ;

//electron ka code 
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true      //node enabled
    }
  })

  win.loadFile('index.ejs').then(function(){
    win.maximize() ;
    win.webContents.openDevTools() ;
  })
}

app.whenReady().then(createWindow)

//electron code end 