import React from 'react';

// Cotrollers
import { PlaylistsController } from '../../controllers/PlaylistsController';

// Components
import {
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/react';

// Icons
import { add } from 'ionicons/icons';
import { observer } from 'mobx-react';


export const PlaylistsView =  observer(({ playlistsController }: { playlistsController: PlaylistsController }) => (
  <div>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="text-center">Playlists</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonFab vertical="top" horizontal="end" slot="fixed" style={{ top: '26px' }}>
      <IonFabButton onClick={playlistsController.addPlaylist}>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  </div>
))
