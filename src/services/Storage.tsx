import { injectable } from 'inversify';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@injectable()
export class StorageService {
  getPlaylists () {
    return Storage.get({ key: 'playlists' })
      .then(data => {
        return data.value || []
      })
  }

  getMusicFromStorage () {
    return Storage.get({ key: 'music' })
      .then(data => {
        return data.value
          ? Promise.resolve(data.value)
          : Promise.reject(new Error('No Music'))
      })
  }
}