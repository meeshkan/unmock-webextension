# Chrome extension for labeling APIs

For labeling APIs.

## Development

Install dependencies:

```bash
$ yarn
```

Build to `build/` directory (running `utils/build.js`):

```bash
$ yarn build
```

Run webpack development server with hot reloading:

```bash
$ yarn start
```

## Usage

1. Open the Extension Management page by navigating to `chrome://extensions`.
1. Enable Developer Mode by clicking the toggle switch next to Developer mode.
1. Click the `LOAD UNPACKED` button and select the extension directory.

## Features

- Browser action pop-up for
  - initializing storage and setting active URL
  - export selections
  - opening explorer window showing selections in local storage
- Context menu for adding selections
- Content script for updating DOM and also notifying background script if page contains given content
