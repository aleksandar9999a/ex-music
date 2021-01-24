import * as mm from 'music-metadata-browser';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import localforage from 'localforage';

// Interfaces
import {
  ICurrentAudio,
  IPlaylist,
  ITrack
} from '../interfaces/interfaces';


@injectable()
export class StorageService {
  playlists: Observable<IPlaylist[]> = new Observable(subscriber => {
    let lastData: any = null;
    let isFirstSubmit: boolean = true;

    const interval = setInterval(() => {
      return localforage.getItem('playlists')
        .then(data => {
          if (data !== lastData) {
            lastData = data;
            subscriber.next(JSON.parse(data as string || '[]'));
          }

          if (isFirstSubmit && !data) {
            isFirstSubmit = false
            subscriber.next([]);
          }
        })
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  })

  getCurrentAudio (): Promise<ICurrentAudio | null> {
    return localforage.getItem('currentAudio')
      .then(data => JSON.parse(data as string))
  }

  setCurrentAudio (track: ITrack) {
    const data = { id: track.id, playlist: track.playlist }

    return localforage.setItem('currentAudio', JSON.stringify(data))
      .then(_ => data)
  }

  getPlaylist (playlistId: string) {
    return this.getPlaylists()
      .then(playlists => {
        return playlists.find(({ id }) => id === playlistId);
      })
      .then(playlist => {
        if (!playlist) {
          return Promise.reject(new Error('Playlist is not found!'))
        }

        return this.getMusicFromStorage()
          .then(music => {
            playlist.values = music.filter(track => track.playlist === playlistId);
            return playlist;
          })
      })
  }

  getPlaylists (): Promise<IPlaylist[]> {
    return localforage.getItem('playlists')
      .then(data => JSON.parse(data as string || '[]'))
  }

  getMusicFromStorage (): Promise<ITrack[]> {
    return localforage.getItem('music')
      .then(data => {
        return JSON.parse(data as string || '[]');
      })
  }

  removePlaylist (removeId: string) {
    return this.getPlaylists()
      .then(playlists => {
        const newPlaylists = playlists.filter(({ id }) => id !== removeId);
        return localforage.setItem('playlists', JSON.stringify(newPlaylists));
      })
  }

  saveAudio (playlistId: string, blob: string, file: File) {
    return Promise.all([
      this.getMusicFromStorage(),
      mm.parseBlob(file)
    ])
      .then(data => {
        const audio = {
          ...data[1].common,
          url: blob,
          playlist: playlistId,
          id: uuidv4()
        }

        if (!audio.title) {
          audio.title = file.name;
        }

        return Promise.all([
          localforage.setItem('music', JSON.stringify([...data[0], audio])),
          audio
        ]);
      })
      .then(data => data[1])
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
          localforage.setItem('playlists', JSON.stringify([...playlists, playlist])),
          playlist
        ]);
      })
      .then(data => {
        return data[1];
      })
  }
}