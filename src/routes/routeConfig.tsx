import React, { ComponentType } from 'react';
import { Homepage } from '../pages/home/homepage';
import { COMPLETE_ORDER, HOME, PRIVACY_POLICY } from '../constants';
import Privacypolicy from '../pages/privacypolicy/privacypolicy';
import { OrderComplete } from '../pages/orderComplete/orderComplete';

type BRoute = { name: string; path: string; component: ComponentType };

const bRoutes: BRoute[] = [
  {
    name: 'Home',
    path: HOME,
    component: Homepage,
  },
  {
    name: 'Order Complete',
    path: COMPLETE_ORDER,
    component: OrderComplete,
  },

  {
    name: 'Privacy Policy',
    path: PRIVACY_POLICY,
    component: Privacypolicy,
  },
];

export default bRoutes;
