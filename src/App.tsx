import { createBrowserHistory } from 'history';
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


export const history = createBrowserHistory();

const App = observer(({ router }: { router: Router }) => (
  <IonApp>
    <IonPage>
      <IonContent fullscreen>
        <IonReactRouter history={history}>
          <Sidebar routes={router.menu} />

          <IonRouterOutlet id="main">
            {router.routes.map(({ id, path, Component, props }) => (
              <Route key={id} path={path} component={() => <Component {...props}  />} exact={true} />
            ))}
          </IonRouterOutlet>
        </IonReactRouter>
      </IonContent>
    </IonPage>
  </IonApp>
))

export default App;
