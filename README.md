# Getting Started with Invitation App

## How to start app

1. run `yarn install`
2. run `yarn start`

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<b>Dark theme</b>\
Open [http://localhost:3000/?theme=dark](http://localhost:3000/?theme=dark) to view app in dark mode in the browser.

<b>Locale support</b>\
Currently, the app only supports English.
You can add other languages in <i>src/i18n/messages.ts</i>. The language will change based on url params (locale), if locale is not passed in the url then the locale will be read from your browser setting.\
Open http://localhost:3000/?locale={locale} to view app in different languages.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn dev:analyze`

Shows size of individual packages in the bundle with an interactive zoomable treemap

### `yarn prod:analyze`

Shows size of individual built packages in the bundle with an interactive zoomable treemap

