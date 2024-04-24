# Frontend code project

This is a React project designed to show a list of games with their publishers and platforms.

It shows a list of video games that are filtered by the names of their publishers and the platforms they feature on.

Typing a publisher name or selecting a platform updates the query string parameters in the address bar, which is bookmarkable.

Filtering logic is applied to the view when the page is reloaded and can be updated in real time.

This project makes use of the following:

- [create-react-app](https://create-react-app.dev/) for initial set up.
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- The [History WebAPI](https://developer.mozilla.org/en-US/docs/Web/API/History_API) and [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) to manage bookmarking.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/) for testing.
- UI styling with [styled components](https://styled-components.com/)

## Install and run

You will need [NodeJS](https://nodejs.org/en) (used 18.17.0 here) and [yarn](https://yarnpkg.com/).

- open the project root directory
- `$> yarn` to install dependencies.
- `$> yarn start` to boot the server and the app itself.
- `$> yarn test:ci` to run all tests just once.
- `$> tarn test:coverage` to run all tests with coverage.
- `$> yarn test` to run tests in watch mode.
- `$> yarn nuke` to remove and reinstall all dependencies.

## What was learned

- Created generic components to render lists and list items without the need to repeat logic and hamper scalability.
- Abstracted mapping and filtering functionality and improved separation of concerns.
- [Redux Toolkit](https://redux-toolkit.js.org/) which removes a lot of the boilerplate for setting up Redux.

### Improvements roadmap

- Implement [debouncing](https://davidwalsh.name/javascript-debounce-function) for when filtering is applied by typing.
- Add tests for the search service and state and reach full test coverage.
- Responsive styling for the UI.
- Add [prettier](https://prettier.io/) and use single quotes insead of double quotes.
- Pass filtering logic to the server with query string parameters. This is all done client-side for now.
- Use a tool like [Lerna](https://lerna.js.org/) to run the client and server.
- Handle error scenarios such as a slow or non-existent connection. Right now it's the happy path.
- [Path aliases](https://hackernoon.com/how-to-configure-path-aliases-in-frontend-projects-in-the-native-way) to improve path imports.
