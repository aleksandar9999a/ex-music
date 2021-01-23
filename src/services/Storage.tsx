import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { IPlaylist } from '../interfaces/interfaces';
const { Storage } = Plugins;

@injectable()
export class StorageService {
  lastData: any = null;
  isFirstSubmit: boolean = true;

  playlists: Observable<IPlaylist[]> = new Observable(subscriber => {
    const interval = setInterval(() => {
      return Storage.get({ key: 'playlists' })
        .then(data => {
          if (data.value !== this.lastData) {
            this.lastData = data.value;
            subscriber.next(JSON.parse(data.value || '[]'));
          }

          if (this.isFirstSubmit && !data.value) {
            this.isFirstSubmit = false
            subscriber.next([]);
          }
        })
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  })

  getPlaylists (): Promise<IPlaylist[]> {
    return Storage.get({ key: 'playlists' })
      .then(data => {
        return data.value
          ? JSON.parse(data.value)
          : []
      })
  }

  getMusicFromStorage () {
    return Storage.get({ key: 'music' })
      .then(data => {
        return data.value
          ? Promise.resolve(JSON.parse(data.value))
          : Promise.reject(new Error('No Music'))
      })
  }

  removePlaylist (removeId: string) {
    return this.getPlaylists()
      .then(playlists => {
        const newPlaylists = playlists.filter(({ id }) => id !== removeId);
        return Storage.set({
          key: 'playlists',
          value: JSON.stringify(newPlaylists)
        })
      })
  }

  savePlaylist (name: string, image?: string | Blob | File | null) {
    return this.getPlaylists()
      .then((playlists) => {
        const playlist = {
          id: uuidv4(),
          name,
          image,
          values: []
        };

        return Promise.all([
          Storage.set({ key: 'playlists', value: JSON.stringify([...playlists, playlist]) }),
          playlist
        ]);
      })
      .then(data => {
        return data[1];
      })
  }
}