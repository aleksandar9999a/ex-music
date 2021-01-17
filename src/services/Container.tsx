import { Container } from "inversify";

export const type = {
  Player: Symbol.for("Player"),
  Router: Symbol.for("Router")
};

export const container = new Container();

