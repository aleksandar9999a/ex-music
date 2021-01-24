import { history } from '../App';
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { ITrack } from '../interfaces/interfaces';
import { type } from '../Types';
import { StorageService } from '../services/Storage';


@injectable()
export class PlayerController {
  @observable
  isStarted: boolean = false;

  @observable
  progres: number = 0;

  @observable
  track: ITrack = {
    picture: '',
    artist: '',
    title: '',
    url: ''
  };

  @observable
  tracks: ITrack[] = [];

  @inject(type.StorageService) private storageService!: StorageService

  constructor () {
    makeObservable(this);
  }

  @action
  loadTracks () {
    return this.storageService.getMusicFromStorage()
      .then(console.debug)
      .catch(err => {
        history.push('/playlists');
      })
  }

  @action
  handlePlay () {
    this.isStarted = !this.isStarted;
  }

  @action
  handleNext () {}

  @action
  handlePrev () {}

  @action
  handleSlideChange () {}
}