// https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/

require('dotenv').config()
const { notarize } = require('electron-notarize')

exports.default = async function notarizing({
  electronPlatformName,
  appOutDir,
  packager,
}) {
  if (electronPlatformName !== 'darwin') {
    return
  }

  return await notarize({
    appBundleId: packager.appInfo.macBundleIdentifier,
    appPath: `${appOutDir}/${packager.appInfo.productFilename}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
  })
}
