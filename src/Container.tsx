import { type } from "./Types";
import { Container } from "inversify";
import { Router } from "./services/Router";
import { Player } from "./services/Player";


const container = new Container();

container.bind<Player>(type.Player).to(Player);
container.bind<Router>(type.Router).to(Router);

export const router = container.resolve(Router)