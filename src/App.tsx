import React from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet
} from '@ionic/react';

import { Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Router } from './services/Router';


const App = observer(({ router }: { router: Router }) => (
  <IonApp>
    <IonPage>
      <IonContent fullscreen>
        <IonReactRouter>
          <Sidebar routes={router.menu} />

          <IonRouterOutlet id="main">
            {router.routes.map(route => (
              <Route key={route.id} path={route.path} component={route.component} exact={true} />
            ))}
          </IonRouterOutlet>
        </IonReactRouter>
      </IonContent>
    </IonPage>
  </IonApp>
))

export default App;
