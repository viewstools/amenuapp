let { app, nativeTheme, Menu, Tray, shell } = require('electron')
let { promises: fs } = require('fs')
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

              if (!space) space = ' '

              realLink = realLink.replace(
                marker,
                label.replace(/\s/g, space).toLowerCase()
              )
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

app.on('ready', async () => {
  let tray = new Tray(
    path.join(
      __dirname,
      nativeTheme.shouldUseDarkColors ? 'icon-white.png' : 'icon.png'
    )
  )
  let menu = makeMenu(
    JSON.parse(await fs.readFile(path.join(__dirname, 'menu.json'), 'utf8'))
  )
  let contextMenu = Menu.buildFromTemplate(menu)
  tray.setToolTip('A menu app')
  tray.setContextMenu(contextMenu)
})
