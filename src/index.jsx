// import React from 'react';
// import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
// import App from './views/app.jsx';
//
// render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));
//
// if (module && module.hot) {
//   module.hot.accept('./views/app', () => {
//     render(
//       <AppContainer>
//         <App/>
//       </AppContainer>,
//       document.querySelector("#app")
//     );
//   });
// }

import AppContainer from './containers/AppContainer';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<AppContainer />, document.getElementById('app'));
