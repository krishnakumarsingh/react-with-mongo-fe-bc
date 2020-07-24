This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

Help full link: https://youtu.be/MIByvzueqHQ?list=PLmP_TCZ-a3ZMyp5Ept2XMB_5qt7dkmuLu
## Install mongod
Download: https://www.mongodb.com/try/download/community<br />
In terminal: <br />
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"<br />
brew install node<br />
node -v (It should be show version of node)<br />


brew tap mongodb/brew<br />
brew install mongodb-community<br />
brew services start mongodb-community<br />

Links:<br />
1] https://stackoverflow.com/questions/57856809/installing-mongodb-with-homebrew<br />
2] https://github.com/mongodb/homebrew-brew<br />
<br />
In Terminal:<br />
mongod<br />
sudo -P /data/db<br />
sudo mkdir -p /data/db<br />
whoami<br />
<system-name><br />
sudo chown  -Rv <system-name> /data/db<br />
mongod --dbpath=/Users/user/data/db<br />
mongod<br />
===============================================================================<br />
Check here: https://youtu.be/MIByvzueqHQ?list=PLmP_TCZ-a3ZMyp5Ept2XMB_5qt7dkmuLu&t=327 <br />
[initandlisten] MongoDB starting : pid=90153 port=27017 dbpath=/data/db 64-bit host=AMAC02ZR7FPMD6N<br />
===============================================================================<br />
mongo<br />
.......<br />
.......<br />
\>
<br />

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
