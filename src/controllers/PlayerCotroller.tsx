import { history } from '../App';
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import WaveSurfer from 'wavesurfer.js';

// Services
import { StorageService } from '../services/Storage';

// Types
import { type } from '../Types';

// Interfaces
import { IPlaylist, ITrack } from '../interfaces/interfaces';


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

  @observable
  wavesurfer!: WaveSurfer;

  @inject(type.StorageService) private storageService!: StorageService

  constructor () {
    makeObservable(this);
  }

  @action
  setParams = (data: [string, IPlaylist]) => {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      height: 70,
      barWidth: 3,
      barHeight: 1,
      cursorWidth: 1,
      barRadius: 3
    })

    this.wavesurfer.on('ready', () => {
      if (this.isStarted) {
        this.wavesurfer.play();
      }
    });

    const index = data[1].values.findIndex(track => track.id === data[0]);

    this.tabIndex = index;
    this.track = data[1].values[index]
    this.playlist = data[1];
    this.tracks = this.playlist.values;
    this.wavesurfer.load(this.track.url);
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
    this.wavesurfer.playPause();
  }

  @action
  handleNext () {
    let index = this.tracks.findIndex(track => track.id === this.track.id);

    if (index + 1 >= this.tracks.length) {
      index = 0;
    }

    this.handleSlideChange(index);
  }

  @action
  handlePrev () {
    let index = this.tracks.findIndex(track => track.id === this.track.id);

    if (index - 1 < 0) {
      index = this.tracks.length - 1;
    }

    this.handleSlideChange(index);
  }

  @action
  handleSlideChange (index: number) {
    if (!this.tracks[index]) {
      return;
    }

    this.track = this.tracks[index];
    this.wavesurfer.load(this.track.url);
  }
}