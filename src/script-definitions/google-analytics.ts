import { ScriptDefinitionRegistry } from "../script-definition-registry";
import { IScriptDefinition } from "./script-definition";

class GoogleAnalytics implements IScriptDefinition {
  public isPresent(): boolean {
    const wnd = window as any;
    const ga = wnd[wnd.GoogleAnalyticsObject || "ga"];

    return Boolean(
      ga && ga.loaded && ga.answer === 42 && ga.getAll && ga.getAll().length > 0
    );
  }
}

ScriptDefinitionRegistry.register("ga", new GoogleAnalytics());
