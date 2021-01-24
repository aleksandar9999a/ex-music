import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

// Cotrollers
import { PlaylistsController } from '../../controllers/PlaylistsController';

// Components
import {
  IonAvatar,
  IonButton,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { ImageUpload } from '../../components/ImageUploader/ImageUploader';

// Icons
import {
  add,
  checkmarkOutline
} from 'ionicons/icons';


export const PlaylistsView =  observer(({ playlistsController }: { playlistsController: PlaylistsController }) => {
  useEffect(() => {
    playlistsController.subscribeForPlaylists();

    return () => {
      playlistsController.unsubscribeForPlaylists();
    }
  })

  function handleImageError (e: any) {
    e.target.src = 'assets/images/unknown.png'
  }

  return (
    <div className="h-100">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-center">Playlists</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonFab
        vertical="top"
        horizontal="end"
        slot="fixed" style={{ top: '26px' }}
      >
        <IonFabButton onClick={playlistsController.openPopover}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <IonList className="h-100">
        {playlistsController.playlists.map(playlist => (
          <IonItem key={playlist.id} onClick={() => { playlistsController.handlePlaylistClick(playlist); }}>
            <IonAvatar className="mr-3">
              <img src={playlist.image as string || 'assets/images/unknown.png'} onError={handleImageError} />
            </IonAvatar>

            <IonLabel>{playlist.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>

      <IonPopover
        isOpen={playlistsController.isOpenPopover}
        onDidDismiss={playlistsController.closePopover}
      >
        <div>
          <ImageUpload
            src={playlistsController.playlistImage}
            onChange={playlistsController.setPlaylistImage}
          />
        </div>

        <div className="d-flex align-items-center">
          <IonItem>
            <IonLabel position="floating">Playlist Name</IonLabel>

            <IonInput
              value={playlistsController.playlistName}
              onIonChange={playlistsController.handlePlaylistName}
            />
          </IonItem>

          <IonButton
            className="ml-2 mr-2 text-success"
            fill="clear"
            onClick={playlistsController.addPlaylist}
          >
            <IonIcon icon={checkmarkOutline} />
          </IonButton>
        </div>
      </IonPopover>
    </div>
  )
})
