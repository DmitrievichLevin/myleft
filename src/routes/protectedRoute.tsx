import { ComponentType, ReactElement } from 'react';

export const Protected = ({ children }: { children: ReactElement }) => {
  return children;
};

export const ProtectedRoute = (Elem: ComponentType) => {
  return () => (
    <Protected>
      <Elem />
    </Protected>
  );
};
