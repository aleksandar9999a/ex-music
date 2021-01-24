import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { type } from '../Types';
import { StorageService } from '../services/Storage';
import { IPlaylist } from '../interfaces/interfaces';


@injectable()
export class PlaylistController {
  @inject(type.StorageService) private storageService!: StorageService

  constructor () {
    makeObservable(this);
  }

  @action
  loadPlaylist = () => {
  }
}