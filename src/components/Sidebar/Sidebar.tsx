import React from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonMenu,
  IonContent,
  IonList,
  IonItem
} from '@ionic/react';

// Interfaces
import { IRoute } from '../../interfaces/interfaces';

export const Sidebar = observer(({ routes }: { routes: IRoute[] }) => (
  <IonMenu side="start" contentId="main">
    <IonContent>
      <IonList>
        {routes.map(route => (
          <IonItem key={route.id} routerLink={route.path}>
            {route.title}
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  </IonMenu>
))