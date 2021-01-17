import { computed, observable } from "mobx";
import { Folders } from "../pages/Folders/Folders";
import { Home } from "../pages/Home/Home";

export class Router {
  @observable
  routes = [
    { id: 1, path: '/', component: Home, type: 'menu', title: 'Listen' },
    { id: 2, path: '/folders', component: Folders, type: 'menu', title: 'Folders' }
  ]

  @computed
  get menu () {
    return this.routes.filter(({ type }) => type === 'menu');
  }
}