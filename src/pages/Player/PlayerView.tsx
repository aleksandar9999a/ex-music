import React from 'react';

// Components
import {
  IonCol,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonRange,
  IonRow,
  IonSlide,
  IonSlides
} from '@ionic/react';

// Icons
import {
  play,
  chevronBack,
  chevronForward
} from 'ionicons/icons';

import { observer } from 'mobx-react';
import { Player } from '../../services/Player';


export const PlayerView = observer(({ player }: { player: Player }) => {
  console.debug(player)

  return (
    <IonGrid>
      <IonRow>
        {window.innerWidth > 700 && (
          <IonCol sizeLg="6">
            Playlist
            </IonCol>
        )}
  
        <IonCol sizeLg="6">
          <IonSlides className="ion-margin-bottom" pager={false} style={{ maxHeight: '50vh' }}>
            <IonSlide>
              <IonImg src="assets/images/unknown.png" />
            </IonSlide>
          </IonSlides>
          
          <div className="ion-text-center ion-padding-top">
            <h2>Track Name</h2>
            
            <p>Track Artist</p>
          </div>
  
          <div className="ion-padding-start ion-padding-end ion-margin-bottom">
            <IonRange
              max={100}
              color="success"
            >
            </IonRange>
          </div>
  
          <div className="d-flex ion-align-items-center ion-justify-content-center ion-padding-top ion-padding-bottom">
            <IonFabButton
              className="ion-margin-end"
              color="light"
            >
              <IonIcon icon={chevronBack} />
            </IonFabButton>
  
            <IonFabButton
              className="ion-margin-end dark"
              color="light"
            >
              <IonIcon icon={play} />
            </IonFabButton>
  
            <IonFabButton color="light">
              <IonIcon icon={chevronForward} />
            </IonFabButton>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
})
