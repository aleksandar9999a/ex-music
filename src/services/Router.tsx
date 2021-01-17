import { computed, observable } from 'mobx';

// Components
import { Folders } from '../pages/Folders/Folders';

// Interfaces
import { IRoute } from '../interfaces/interfaces';
import { PlayerView } from '../pages/Player/PlayerView';
import { injectable, inject } from 'inversify';
import { Player } from './Player';
import { container, type } from './Container';


@injectable()
export class Router {
  @observable
  routes: IRoute[] = [];

  @inject(type.Player) player!: Player;

  constructor () {
    this.routes = [
      { id: 1, path: '/', Component: PlayerView, type: 'menu', title: 'Listen', props: { player: this.player } },
      { id: 2, path: '/folders', Component: Folders, type: 'menu', title: 'Folders', props: {} }
    ]
  }

  @computed
  get menu () {
    return this.routes.filter(({ type }) => type === 'menu');
  }
}

container.bind<Router>(type.Router).to(Router);

export default container.resolve(Router);
