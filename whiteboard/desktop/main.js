const electron =require("electron") ;
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

  win.loadFile('index.html').then(function(){
    win.maximize() ;
    // win.webContents.openDevTools() ;
    win.removeMenu() ;  
  })
}

app.whenReady().then(createWindow)

//electron code end 