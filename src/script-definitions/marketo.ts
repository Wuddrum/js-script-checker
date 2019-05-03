import { ScriptDefinitionRegistry } from "../script-definition-registry";
import { IScriptDefinition } from "./script-definition";

class Marketo implements IScriptDefinition {
  public isPresent(): boolean {
    const wnd = window as any;

    return Boolean(wnd.Munchkin && wnd.MunchkinTracker);
  }
}

ScriptDefinitionRegistry.register("marketo", new Marketo());
