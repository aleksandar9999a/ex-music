import { injectable } from "inversify";
import { type, container } from "./Container";


@injectable()
export class Player {
}

container.bind<Player>(type.Player).to(Player);

export default container.resolve(Player);
