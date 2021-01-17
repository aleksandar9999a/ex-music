import { computed, observable } from 'mobx';

// Components
import { Folders } from '../pages/Folders/Folders';
import { Listen } from '../pages/Listen/Listen';

// Interfaces
import { IRoute } from '../interfaces/interfaces';


export class Router {
  @observable
  routes: IRoute[] = [
    { id: 1, path: '/', component: Listen, type: 'menu', title: 'Listen' },
    { id: 2, path: '/folders', component: Folders, type: 'menu', title: 'Folders' }
  ]

  @computed
  get menu () {
    return this.routes.filter(({ type }) => type === 'menu');
  }
}