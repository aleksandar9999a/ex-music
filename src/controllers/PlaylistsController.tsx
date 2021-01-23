import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { type } from '../Types';
import { StorageService } from '../services/Storage';
import { IPlaylist } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';


@injectable()
export class PlaylistsController {
  @inject(type.StorageService) private storageService!: StorageService

  @observable
  playlists: IPlaylist[] = [];

  @observable
  isOpenPopover: boolean = false;

  @observable
  playlistName: string = '';

  @observable
  playlistImage: string = '';

  playlistImageFile?: string | null;

  playlistSubscriber!: Subscription;

  constructor () {
    makeObservable(this);
  }

  @action
  setPlaylistImage = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.playlistImageFile = e.target.result;
    }
    
    const url = URL.createObjectURL(file);
    this.playlistImage = url;

    reader.readAsDataURL(file);
  }

  @action
  setPlaylist = (data: IPlaylist[]) => {
    this.playlists = data
  }

  @action
  subscribeForPlaylists () {
    this.playlistSubscriber = this.storageService.playlists.subscribe(this.setPlaylist);
  }

  @action
  unsubscribeForPlaylists () {
    this.playlistSubscriber.unsubscribe();
  }

  @action
  handlePlaylistName = (e: any) => {
    this.playlistName = e.target.value;
  }
  
  @action
  addPlaylist = () => {
    if (!this.playlistName) {
      return;
    }

    return this.storageService.savePlaylist(this.playlistName, this.playlistImageFile)
      .then(data => {
        this.playlistName = ''
        this.playlistImage = '';
        this.playlistImageFile = null;
        this.closePopover();
      })
  }

  @action
  openPopover = () => {
    this.isOpenPopover = true
  }

  @action
  closePopover = () => {
    this.isOpenPopover = false
    this.playlistName = ''
  }
}