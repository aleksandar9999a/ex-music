import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { type } from '../Types';
import { StorageService } from '../services/Storage';


@injectable()
export class PlaylistsController {
  @inject(type.StorageService) private storageService!: StorageService

  @observable
  isOpenPopover: boolean = false;

  constructor () {
    makeObservable(this);
  }
  
  @action
  addPlaylist () {
    console.debug('add playlist')
  }

  @action
  openPopover () {
    this.isOpenPopover = true
  }

  @action
  closePopover () {
    this.isOpenPopover = false
  }
}