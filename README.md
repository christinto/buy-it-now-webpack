# buy-it-now-webpack
Buy It Now is a Web3.0 Ethereum payments proxy based on React Webpack Babel Starter Kit.

Tired of complicated starters with 200MB of dependencies which are hard to understand and modify?


[React](https://facebook.github.io/react/),
[Webpack](http://webpack.github.io/)
[Babel](https://babeljs.io/)
[Web3JS](http://web3js.readthedocs.io/en/1.0/)

### To run

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.
* Fork and clone the project:

```
git clone https://github.com/destinatis/buy-it-now-webpack.git
```

* Then install the dependencies:

```
npm install
```

* Build webpack

```
npm run build
```

* Run development server:

```
npm start
```

* Or you can run development server with [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard):

```
npm run dev
```

Open the web browser to `http://localhost:8888/`

### To test
To run unit tests:

```
npm test
```

Tests come bundled with:

* Jest
* Enzyme
* React Test Utils
* React Test Renderer

### To build the production package

```
npm run build
```

### Eslint
There is a `.eslint.yaml` config for eslint ready with React plugin.

To run linting, run:

```
npm run lint
```

### Notes on importing css styles
* styles having /src/ in their absolute path considered part of the application and exported as local css modules.
* other styles considered global styles used by components and included in the css bundle directly.

### Contribute
Please contribute to the project if you know how to make it better, including this README :)

### Thanks
[react-webpack-babel](https://github.com/alicoding/react-webpack-babel.git):
