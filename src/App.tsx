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

import {
  Provider
} from 'react-keep-alive';

import { Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { Router } from './services/Router';
import Segment from './components/Segment/Segment';


export const history = createBrowserHistory();

const App = observer(({ router }: { router: Router }) => (
  <IonApp className="app">
    <Provider>
      <IonPage>
        <IonContent fullscreen>
          <IonReactRouter history={history}>
            <div className="app__content">
              <IonRouterOutlet id="main">
                {router.routes.map(({ id, path, Component, props }) => (
                  <Route key={id} path={path} component={() => <Component {...props}  />} exact={true} />
                ))}
              </IonRouterOutlet>
            </div>

            <Segment router={router} />
          </IonReactRouter>
        </IonContent>
      </IonPage>
    </Provider>
  </IonApp>
))

export default App;
