# Front-end challenge

You can preview the app [here](https://friendly-babbage-6107de.netlify.com/) (Netlify)

This project was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app)

## Considerations

There are no tests in this project apart from the default test created by CRA

## Technologies used

- [TypeScript](https://github.com/microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/redux)
- [React-Redux](https://github.com/reduxjs/react-redux)
- [SWR](https://github.com/zeit/swr)
- [styled-components (CSS-in-JS)](https://github.com/styled-components/styled-components)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [Framer/Motion](https://github.com/framer/motion)

## Features

- Pagination support (page size = 50)
- Indicator of unread/read post
- Dismiss post button
- Dismiss all button
- Split layout
- Responsive design (might not be 100% responsive on all devices)
- Auto-scroll to latest post when loading more
- Auto-scroll to post details when loading more on mobile devices
- Content preview for a variety of formats (though not all of them, specially videos)

## Potential improvements

- Add SSR (using Next or similar)
- Fix post details scrolling behavior on mobile so it waits for the post to load
- UX/UI
- Display some comments in the detail section
