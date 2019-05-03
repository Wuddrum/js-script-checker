import { ScriptDefinitionRegistry } from "../script-definition-registry";
import { IScriptDefinition } from "./script-definition";

class Pardot implements IScriptDefinition {
  public isPresent(): boolean {
    const wnd = window as any;

    return Boolean(wnd.getPardotUrl && wnd.pi && wnd.piTracker);
  }
}

ScriptDefinitionRegistry.register("pardot", new Pardot());
