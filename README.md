# Chrome extension for labeling APIs

[![CircleCI](https://circleci.com/gh/unmock/unmock-chrome-extension.svg?style=svg)](https://circleci.com/gh/unmock/unmock-chrome-extension)

For labeling APIs.

## Development

Install dependencies:

```bash
$ yarn
```

Create bundle in `build/` directory (running `utils/build.js`):

```bash
$ yarn build
```

Run webpack development server with hot reloading:

```bash
$ yarn start
```

Run [Storybook](https://github.com/storybooks/storybook):

```bash
$ yarn storybook
```

## Usage

1. Run `yarn start` or `yarn build` to create bundle
1. Open the Extension Management page by navigating to `chrome://extensions`.
1. Enable Developer Mode by clicking the toggle switch next to Developer mode.
1. Click the `Load unpacked` button and select `build/` directory.

## Features

- Browser action pop-up for
  - initializing storage and setting active URL
  - exporting selections
  - opening explorer window showing selections in local storage
- Context menu for adding selections
- Content script for updating DOM and also notifying background script if page contains given content

## License

This project uses code from the open-source projects below with their licenses.

### [Chrome webextension boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)

Copyright (c) 2016 Samuel Simões.

### [Swagger editor](https://github.com/swagger-api/swagger-editor)

Copyright 2018 SmartBear Software.
