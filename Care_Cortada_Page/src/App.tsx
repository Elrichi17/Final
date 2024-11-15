import { Auth0Provider } from '@auth0/auth0-react';
import { authConfig } from './auth0-config';
import AppRoutes from './routes';

function App() {
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={authConfig.authorizationParams}
    >
      <AppRoutes />
    </Auth0Provider>
  );
}

export default App;
