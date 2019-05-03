import { ScriptDefinitionRegistry } from "../script-definition-registry";
import { IScriptDefinition } from "./script-definition";

class AdRoll implements IScriptDefinition {
  public isPresent(): boolean {
    const wnd = window as any;

    return Boolean(wnd.__adroll && wnd.__adroll._loaded && wnd.__adroll.track);
  }
}

ScriptDefinitionRegistry.register("adroll", new AdRoll());
