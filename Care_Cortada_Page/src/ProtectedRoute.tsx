
import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Cargando...</div>,
  });

  return <Component />;
};

export default ProtectedRoute;
