import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

export const global = {
  navigate: null as any,
  location: null as any,
  query_client: null as any,
};

/**
 * Global Hook Init Component
 * @returns Insert into App to access hooks outside of function component.
 */
export const GlobalInit = () => {
  global.query_client = useQueryClient();
  global.navigate = useNavigate();
  global.location = useLocation();
  return <></>;
};
