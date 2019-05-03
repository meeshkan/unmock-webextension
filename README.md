# Unmock browser extension

[![CircleCI](https://circleci.com/gh/unmock/unmock-webextension.svg?style=svg)](https://circleci.com/gh/unmock/unmock-webextension)

Easy-to-use in-browser tool for creating OpenAPI specification from written API documentation.

Made with ❤️ by [unmock](https://www.unmock.io/).

## Features

- Open Swagger editor from the extension pop-up for easy side-by-side generation of OpenAPI specifications from API documentation
- Automatically generates OpenAPI specification from page content. Note that this feature is pre-alpha and in active development.

## Development

Install dependencies:

```bash
$ yarn
```

Create bundle in `build/` directory:

```bash
$ yarn build
```

Run webpack development server with hot reloading:

```bash
$ yarn start
```

### Testing in Chrome

1. Open the Extension Management page by navigating to `chrome://extensions`.
1. Enable Developer Mode by clicking the toggle switch next to Developer mode.
1. Click the `Load unpacked` button and select `build/` directory.

### Testing in Firefox

Follow the instructions [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out), choosing `manifest.json` from `build/` directory.

## License

This project acknowledges code from the open-source projects below.

### [Swagger editor](https://github.com/swagger-api/swagger-editor)

Copyright 2018 SmartBear Software.

### [Chrome webextension boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)

Copyright (c) 2016 Samuel Simões.
