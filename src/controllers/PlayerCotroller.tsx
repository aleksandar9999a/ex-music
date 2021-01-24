import { history } from '../App';
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { IPlaylist, ITrack } from '../interfaces/interfaces';
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
    id: '',
    playlist: '',
    picture: '',
    artist: '',
    title: ''
  };

  @observable
  tracks: ITrack[] = [];

  @observable
  playlist: IPlaylist = {
    id: '',
    name: '',
    values: []
  };

  @observable
  tabIndex: number = 0;

  @inject(type.StorageService) private storageService!: StorageService

  constructor () {
    makeObservable(this);
  }

  @action
  setParams = (data: [string, IPlaylist]) => {
    const index = data[1].values.findIndex(track => track.id === data[0]);
    this.tabIndex = index;
    this.track = data[1].values[index]
    this.playlist = data[1];
    this.tracks = this.playlist.values;
    console.debug(this.tracks)
  }

  @action
  loadTracks () {
    return this.storageService.getCurrentAudio()
      .then(data => {
        if (!data) {
          return Promise.reject(new Error('No music!'))
        }

        return Promise.all([
          data.id,
          this.storageService.getPlaylist(data.playlist)
        ])
      })
      .then(this.setParams)
      .catch(err => {
        history.push('/playlists')
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
  handleSlideChange (index: number) {
    this.track = this.tracks[index];
  }
}