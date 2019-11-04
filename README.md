# A menu app

## Install dependencies
```
yarn install
```

## Run it in dev mode
```
yarn start
```

## Change the menu
The menu content is in `menu.json`. Tweak that file, stop the app and run it
again to test your changes.

## Build it
Setup your `.env` file:
```
APPLE_ID=user@email.com
APPLE_ID_PASSWORD=secret
```
Use your Apple ID and generate an app-specific password to go along with it (so don’t use your regular password!). You can generate one at appleid.apple.com.
https://github.com/electron-userland/electron-notarizeOThis is your Apple ID, but you need to generate an app-specific password to go along with it (so don’t use your regular password!) You can generate one at appleid.apple.com.#safety-when-using-appleidpassword
https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/

Run:
```
yarn build
```

To release it:
```
cd dist
mkdir now
cp your-higher-power-*-mac.dmg now/your-higher-power-mac.dmg
cd now
now --name your-higher-power --prod
cd ../..
rm -rf dist
```
