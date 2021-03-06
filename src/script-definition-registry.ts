import { Dictionary } from "./dictionary";
import { IScriptDefinition } from "./script-definitions/script-definition";

export class ScriptDefinitionRegistry {
  public static register(name: string, definition: IScriptDefinition) {
    this.registry[name] = definition;
  }

  public static get(name: string): IScriptDefinition {
    return this.registry[name];
  }

  public static getAll(): Dictionary<IScriptDefinition> {
    return this.registry;
  }

  private static registry: Dictionary<IScriptDefinition> = {};
}
