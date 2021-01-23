import { computed, makeObservable, observable } from 'mobx';

// Components
import { PlaylistsView } from '../pages/Playlists/PlaylistsView';

// Interfaces
import { IRoute } from '../interfaces/interfaces';
import { inject, injectable } from 'inversify';
import { PlayerView } from '../pages/Player/PlayerView';
import { PlayerController } from '../controllers/PlayerCotroller';
import { PlaylistsController } from '../controllers/PlaylistsController';
import { type } from '../Types';


@injectable()
export class Router {
  @observable
  routes: IRoute[] = [];

  @inject(type.PlayerController) private playerController!: PlayerController;
  @inject(type.PlaylistsController) private playlistsController!: PlaylistsController;

  constructor () {
    makeObservable(this);
  }
  
  setRoutes () {
    this.routes = [
      {
        id: 1,
        path: '/',
        Component: PlayerView,
        type: 'menu',
        title: 'Listen',
        props: {
          playerController: this.playerController
        }
      },
      {
        id: 2,
        path: '/playlists',
        Component: PlaylistsView,
        type: 'menu',
        title: 'Playlists',
        props: {
          playlistsController: this.playlistsController
        }
      }
    ]
  }

  @computed
  get menu () {
    return this.routes.filter(({ type }) => type === 'menu');
  }
}
