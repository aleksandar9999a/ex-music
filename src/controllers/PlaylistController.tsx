import { history } from '../App';
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

// Types
import { type } from '../Types';

// Services
import { StorageService } from '../services/Storage';

// Interfaces
import { IPlaylist, ITrack } from '../interfaces/interfaces';

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
  actionLoadTrack (track: ITrack) {
    this.storageService.setCurrentAudio(track)
      .then(_ => {
        history.push('/');
      })
  }

  @action
  addAudio (file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.storageService.saveAudio(this.playlist.id, e.target.result, file)
    }

    reader.readAsDataURL(file);
  }

  @action
  setPlaylist = (playlist: IPlaylist) => {
    this.playlist = playlist;
  }

  @action
  loadPlaylist = (id: string) => {
    this.storageService.getPlaylist(id)
      .then(this.setPlaylist)
      .catch(console.debug)
  }
}