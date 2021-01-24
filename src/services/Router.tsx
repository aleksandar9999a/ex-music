import { computed, makeObservable, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import { matchPath } from 'react-router';

// Controllers
import { PlayerController } from '../controllers/PlayerCotroller';
import { PlaylistsController } from '../controllers/PlaylistsController';
import { PlaylistController } from '../controllers/PlaylistController';

// Interfaces
import { IRoute } from '../interfaces/interfaces';

// Types
import { type } from '../Types';


@injectable()
export class Router {
  @observable
  routes: IRoute[] = [];

  @inject(type.PlayerController) private playerController!: PlayerController;
  @inject(type.PlaylistsController) private playlistsController!: PlaylistsController;
  @inject(type.PlaylistController) private playlistController!: PlaylistController;

  constructor () {
    makeObservable(this);
  }
  
  setRoutes (components: any) {
    const {
      PlayerView,
      PlaylistsView,
      PlaylistView
    } = components;

    const {
      playerController,
      playlistsController,
      playlistController
    } = this;

    this.routes = [
      {
        id: 1,
        path: '/',
        Component: PlayerView,
        type: 'menu',
        title: 'Listen',
        props: { playerController }
      },
      {
        id: 2,
        path: '/playlists',
        Component: PlaylistsView,
        type: 'menu',
        title: 'Playlists',
        props: { playlistsController }
      },
      {
        id: 3,
        path: '/playlist/:id',
        Component: PlaylistView,
        props: {
          playlistController,
          routeParams: {
            getParams () {
              return matchPath(window.location.pathname, '/playlist/:id')
            }
          }
        }
      }
    ]
  }

  @computed
  get menu () {
    return this.routes.filter(({ type }) => type === 'menu');
  }
}
