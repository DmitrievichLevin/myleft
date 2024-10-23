import { ComponentType } from 'react';
type BRoute = {
    name: string;
    path: string;
    component: ComponentType;
};
declare const bRoutes: BRoute[];
export default bRoutes;
