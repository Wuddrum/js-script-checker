import { ScriptDefinitionRegistry } from "../script-definition-registry";
import { IScriptDefinition } from "./script-definition";

class GoogleTagManager implements IScriptDefinition {
  public isPresent(): boolean {
    const wnd = window as any;

    return Boolean(wnd.google_tag_manager && wnd.google_tag_data);
  }
}

ScriptDefinitionRegistry.register("gtm", new GoogleTagManager());
