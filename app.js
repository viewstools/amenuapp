let { app, nativeTheme, Menu, Tray, shell } = require('electron')
let path = require('path')

let LINK_INTERPOLATION = /(\${label(.*)})/

function makeMenu(menu) {
  return menu
    .map(({ label, submenu, link, type }) => {
      if (submenu) {
        return {
          label,
          submenu: makeMenu(submenu),
        }
      } else if (link) {
        return {
          label,
          click: () => {
            let realLink = link

            if (LINK_INTERPOLATION.test(realLink)) {
              let [, marker, space] = realLink.match(LINK_INTERPOLATION)

              let linkLabel = label.toLowerCase()
              if (space) {
                linkLabel = linkLabel.replace(/\s/g, space)
              }

              realLink = realLink.replace(marker, linkLabel)
            }

            shell.openExternal(realLink)
          },
        }
      } else if (type) {
        return { type }
      } else if (label) {
        return { label }
      } else {
        return false
      }
    })
    .filter(Boolean)
}

app.dock.hide()

app.on('ready', async () => {
  let tray = new Tray(
    path.join(
      __dirname,
      nativeTheme.shouldUseDarkColors ? 'icon-white.png' : 'icon.png'
    )
  )
  let menu = makeMenu(require('./menu.json'))
  let contextMenu = Menu.buildFromTemplate([
    ...menu,
    { type: 'separator' },
    { role: 'quit', label: 'Quit' },
  ])
  tray.setToolTip('A menu app')
  tray.setContextMenu(contextMenu)
})

// Quit the app when the window is closed
app.on('window-all-closed', () => {
  app.quit()
})
