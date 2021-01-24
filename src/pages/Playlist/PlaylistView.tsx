import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonAvatar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/react';

// Interfaces
import { IPlaylistViewProps } from '../../interfaces/interfaces';

// Icons
import { add } from 'ionicons/icons';


export const PlaylistView =  observer(({ playlistController, routeParams }: IPlaylistViewProps) => {
  useEffect(() => {
    const route = routeParams.getParams();
    playlistController.loadPlaylist(route.params.id);
  }, [])

  function handleImageError (e: any) {
    e.target.src = 'assets/images/unknown.png'
  }

  return (
    <div className="playlist">
      <div className="playlist__content">
        <img
          src={playlistController.playlist.image as string || 'assets/images/unknown.png'}
          onError={handleImageError}
        />

        <div className="playlist__head">
          <h3>{playlistController.playlist.name}</h3>
        </div>
      </div>

      <IonFab
        vertical="top"
        horizontal="end"
        slot="fixed"
        style={{ top: '36vh' }}
      >
        <IonFabButton className="position-relative">
          <IonIcon icon={add} />

          <input
            type="file"
            className="playlist__input"
            accept="audio/*"
            onChange={(e: any) => playlistController.addAudio(e.target.files[0])}
          />
        </IonFabButton>
      </IonFab>

      <IonList className="h-100 pt-3">
        {playlistController.playlist.values.map(track => (
          <IonItem
            key={track.id}
            className="border-bottom"
            onClick={() => playlistController.actionLoadTrack(track)}
          >
            <IonAvatar className="mr-3">
              <img src={track.picture as string || 'assets/images/unknown.png'} onError={handleImageError} />
            </IonAvatar>

            <IonLabel>
              {track.title} - <small>{track.artist || 'unknown'}</small>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </div>
  )
})
