# Project Structure
This project is divided into two main folders: backend and frontend.

# Server
The backend folder contains the backend code. To run the backend locally, follow these steps:

Open a terminal.
Navigate to the server directory using the cd command:
cd backend
Install the necessary dependencies using: npm install
Start the backend server using: npm run dev
This will run the server on http://localhost:5000.

# Frontend 
# React + TypeScript + Vite
The frontend folder contains the frontend code.

Open a terminal.
Navigate to the frontend directory using the cd command:
cd frontend
Start the frontend using: npm run dev
This will run the frontend on http://localhost:5173.

All Available Scripts For Frontend Code
In the frontend directory, you can run:

npm run dev
Runs the app in the development mode.
Open http://localhost:5173 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

npm run lint
When you run npm run lint, ESLint will analyze all TypeScript and TypeScript React files in the project directory, report any linting errors or warnings, and treat warnings as errors, thereby enforcing strict code quality standards.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
