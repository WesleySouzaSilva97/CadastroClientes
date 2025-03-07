console.log("Electron processo principal")

// Importação dos recursos do framework
// app se refere a aplicação 
// BrowserWindow (criação da janela)
// nativeTheme está relacionado ao tema claro ou escuro (definir) 
// Menu (definir um menu personalizado )
// shell (acessar links externos no navegador padrão)
const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron/main')

// Janela principal
let win
const createWindow = () => {
  // definindo tema da janela claro ou escuro
  nativeTheme.themeSource = 'dark'
  win = new BrowserWindow({
    width: 1010, // Largura
    height: 720, // Altura
    // frame: false
    resizable: false, // Maximizar
    // minimizable: false, // Minimizar
    closable: false, //fecheible
    // autoHideMenuBar: true // fesconder o menu
  })

  // Carregar o menu personalizado
  // Atenção!!!! Antes importar o recurso menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  // carregar o documento na janela
  win.loadFile('./src/views/index.html')
}

//janela sobre
let about
function aboutWindow() {
  nativeTheme.themeSource = 'light'
  // obter a janela principal 
  const mainWindow = BrowserWindow.getFocusedWindow()
  // validação (se existir a janela principal)
  if (mainWindow) {
    about = new BrowserWindow({
      width: 320,
      height: 290,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      parent: mainWindow,  // estabelecer uma relação hierárquica entre janelas 
      modal: true
    })
  }
  
  about.loadFile('./src/views/sobre.html')
}

// inicialização da aplicação 
app.whenReady().then(() => {
  createWindow()

  // só ativar a janela principal se nenhuma outra estiver ativa
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// se o sistema não for MAC encerrar a aplicação quando a janela for fechada
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// reduzir a verbosidade de logs não críticos  (devtools)
app.commandLine.appendSwitch('log-level', '3')

// template do menu  
const template = [
  {
    label: 'Cadastro',
    submenu: [
      {
        label: 'Sair',
        accelerator: 'Ctrl+N',
        click: () => app.quit()
      }
    ]
  },
  {
    label: 'Relatório',
    submenu: [
      {
        label: 'Clientes',
      }
    ]
  },
  {
    label: 'Ferramentas',
    submenu: [
      {
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir zoom',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar o zoom padrão',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'DevTools',
        role: 'toggleDevTools'
      }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Repositório',
        click: () => shell.openExternal('https://github.com/WesleySouzaSilva97')
      },
      {
        label: 'Sobre',
        click: () => aboutWindow()
      }
    ]
  }
]
