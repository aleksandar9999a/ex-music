import { type } from "./Types";
import { Container } from "inversify";
import { Router } from "./services/Router";
import { PlayerController } from "./controllers/PlayerCotroller";
import { StorageService } from "./services/Storage";
import { PlaylistsController } from "./controllers/PlaylistsController";


const container = new Container();

container.bind<PlaylistsController>(type.PlaylistsController).to(PlaylistsController);
container.bind<StorageService>(type.StorageService).to(StorageService);
container.bind<PlayerController>(type.PlayerController).to(PlayerController);
container.bind<Router>(type.Router).to(Router);

export const router = container.resolve(Router)