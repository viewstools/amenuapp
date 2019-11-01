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

Caveat, needed to use a local version of electron-notarize [based off this PR](https://github.com/electron/electron-notarize/pull/14) because the Apple service that does the notarization takes more than what the script expects it to take.

Somewhere outside this project's folder, do:

```
git clone git@github.com:dbkr/electron-notarize.git
yarn install
yarn link
```

Then come back to the project and run:
```
yarn link electron-notarize
```

Run:
```
yarn build
```
