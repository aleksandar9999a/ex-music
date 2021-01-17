import { computed, observable } from 'mobx';

// Components
import { Folders } from '../pages/Folders/Folders';

// Interfaces
import { IRoute } from '../interfaces/interfaces';
import { inject, injectable } from 'inversify';
import { PlayerView } from '../pages/Player/PlayerView';
import { Player } from './Player';
import { type } from '../Types';


@injectable()
export class Router {
  @observable
  routes: IRoute[] = [];

  @inject(type.Player) private player!: Player
  
  setRoutes () {
    this.routes = [
      {
        id: 1,
        path: '/',
        Component: PlayerView,
        type: 'menu',
        title: 'Listen',
        props: {
          player: this.player
        }
      },
      {
        id: 2,
        path: '/folders',
        Component: Folders,
        type: 'menu',
        title: 'Folders',
        props: {}
      }
    ]
  }

  @computed
  get menu () {
    return this.routes.filter(({ type }) => type === 'menu');
  }
}
