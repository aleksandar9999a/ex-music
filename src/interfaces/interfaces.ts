import { match } from "react-router";
import { PlaylistController } from "../controllers/PlaylistController";

export interface IRoute {
  id: string | number,
  path: string,
  Component: React.FC<any>,
  type?: 'menu' | string,
  title?: string,
  props: { [key: string]: any }
}

export interface ITrack {
  id: string,
  playlist: string,
  picture: string,
  artist: string,
  title: string,
  [key: string]: any
}

export interface IPlaylist {
  id: string,
  name: string,
  image?: string | Blob | File | undefined,
  values: ITrack[]
}

export interface IPlaylistViewProps {
  playlistController: PlaylistController,
  routeParams: {
    getParams: () => match<{ id: string }>
  }
}