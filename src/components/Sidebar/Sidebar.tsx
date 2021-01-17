import React from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonMenu,
  IonContent,
  IonList,
  IonItem
} from '@ionic/react';

export const Sidebar = observer(({ routes }: { routes: any[] }) => (
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