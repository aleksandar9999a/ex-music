import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonFabButton,
  IonIcon,
  IonSlide,
  IonSlides
} from '@ionic/react';

// Icons
import {
  play,
  pause,
  chevronBack,
  chevronForward
} from 'ionicons/icons';

// Controllers
import { PlayerController } from '../../controllers/PlayerCotroller';


export const PlayerView = observer(({ playerController }: { playerController: PlayerController }) => {
  const slidesRef = useRef(null)

  useEffect(() => {
    playerController.loadTracks()
  }, [])

  useEffect(() => {
    (slidesRef.current as any).slideTo(playerController.tabIndex);
  }, [playerController.tabIndex])

  function handleSlides() {
    (slidesRef.current as any).getActiveIndex()
      .then((index: number) => {
        playerController.handleSlideChange(index);
      })
  }

  return (
    <div className="p-2">
      <IonSlides
        ref={slidesRef}
        className="ion-margin-bottom"
        pager={false}
        style={{ maxHeight: '50vh' }}
        onIonSlideDidChange={handleSlides}
      >
        {playerController.tracks.map(track => (
          <IonSlide key={track.id}>
            <img src={track.picture || 'assets/images/unknown.png'}/>
          </IonSlide>
        ))}
      </IonSlides>
      
      <div className="ion-text-center ion-padding-top ion-padding-bottom">
        <h2>{playerController.track.title}</h2>
        
        <p>{playerController.track.artist || 'unknown'}</p>
      </div>

      <div className="ion-padding-start ion-padding-end">
        <div id="waveform"></div>
      </div>

      <div className="d-flex ion-align-items-center ion-justify-content-center ion-padding-top ion-padding-bottom">
        <IonFabButton
          className="ion-margin-end"
          color="light"
          onClick={() => playerController.handlePrev()}
        >
          <IonIcon icon={chevronBack} />
        </IonFabButton>

        <IonFabButton
          className="ion-margin-end dark"
          color="light"
          onClick={() => playerController.handlePlay()}
        >
          <IonIcon icon={playerController.isStarted ? pause : play} />
        </IonFabButton>

        <IonFabButton
          color="light"
          onClick={() => playerController.handleNext()}
        >
          <IonIcon icon={chevronForward} />
        </IonFabButton>
      </div>
    </div>
  )
})
