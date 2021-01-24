import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

// Types
import { type } from '../Types';

// Services
import { StorageService } from '../services/Storage';

// Interfaces
import { IPlaylist } from '../interfaces/interfaces';

@injectable()
export class PlaylistController {
  @inject(type.StorageService) private storageService!: StorageService;

  @observable
  playlist: IPlaylist = {
    id: '',
    name: '',
    values: []
  }

  constructor () {
    makeObservable(this);
  }

  @action
  addAudio (file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.storageService.saveAudio(this.playlist.id, e.target.result, file).then(console.debug)
    }

    reader.readAsDataURL(file);
  }

  @action
  setPlaylist = (playlist: IPlaylist) => {
    console.debug(playlist)
    this.playlist = playlist;
  }

  @action
  loadPlaylist = (id: string) => {
    this.storageService.getPlaylist(id)
      .then(this.setPlaylist)
      .catch(console.debug)
  }
}