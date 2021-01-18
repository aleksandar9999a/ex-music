import { history } from './../App';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { ITrack } from '../interfaces/interfaces';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@injectable()
export class Player {
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

  constructor () {
    makeObservable(this);
  }

  @action
  loadTracks () {
    Storage.get({ key: 'music' }).then(data => {
      if (!data.value) {
        history.push('/folders');
      }
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