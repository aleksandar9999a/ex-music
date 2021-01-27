import React from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToolbar
} from '@ionic/react';

import { Router } from '../../services/Router';


const Segment = observer(({ router }: { router: Router }) => (
  <div className="app__segment">
    <IonToolbar className="app__segment-inner" color="light">
      <IonSegment>
        {router.menu.map(route => (
          <IonSegmentButton
            key={route.id}
            className={router.activeRoute === route.path ? 'segment-button-checked border-none' : ''}
            onClick={() => router.changeRoute(route)}
          >
            <IonLabel>
              {route.title}
            </IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>
    </IonToolbar>
  </div>
))

export default Segment;
