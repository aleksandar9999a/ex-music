import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { PlaylistController } from '../../controllers/PlaylistController';


export const PlaylistView =  observer(({ playlistController }: { playlistController: PlaylistController }) => {
  useEffect(() => {
    playlistController.loadPlaylist();
  })

  return (
    <div className="h-100">
    </div>
  )
})
