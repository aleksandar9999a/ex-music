import React from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonLabel,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';

import { Router } from '../../services/Router';


const Segment = observer(({ router }: { router: Router }) => (
  <div className="app__segment">
    <IonSegment className="app__segment-inner">
      {router.menu.map(route => (
        <IonSegmentButton
          key={route.id}
          className={router.activeRoute === route.path ? 'segment-button-checked' : ''}
          onClick={() => router.changeRoute(route)}
        >
          <IonLabel>
            {route.title}
          </IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  </div>
))

export default Segment;
