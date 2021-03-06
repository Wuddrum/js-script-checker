import { Dictionary } from "./dictionary";
import { ScriptDefinitionRegistry } from "./script-definition-registry";
import { IScriptDefinition } from "./script-definitions/script-definition";
import { TrackingPixel } from "./tracking-pixel";

export function getPresences(
  names: string | string[] = []
): Dictionary<number> | undefined {
  const presences: Dictionary<number> = {};

  if (typeof names === "string") {
    const scriptDefinition = ScriptDefinitionRegistry.get(names);
    presences[names] = getPresenceNumber(scriptDefinition);
    return presences;
  }

  if (names instanceof Array) {
    const nameArray =
      names.length > 0 ? names : Object.keys(ScriptDefinitionRegistry.getAll());
    for (const name of nameArray) {
      if (typeof name !== "string") {
        return;
      }

      const scriptDefinition = ScriptDefinitionRegistry.get(name);
      presences[name] = getPresenceNumber(scriptDefinition);
    }

    return presences;
  }
}

export function reportPresences(presences: Dictionary<number>) {
  for (const presenceName in presences) {
    if (presences.hasOwnProperty(presenceName)) {
      const presenceValue = presences[presenceName];
      const reversedName = presenceName
        .split("")
        .reverse()
        .join("");
      const pixelName = `${reversedName}.gif?r=${presenceValue}`;

      TrackingPixel.create(pixelName);
    }
  }
}

export function getPresencesAndReport(names: string | string[] = []) {
  const presences = getPresences(names);
  if (presences !== undefined) {
    reportPresences(presences);
  }
}

export let doAutoReport: boolean = true;

function getPresenceNumber(scriptDefinition: IScriptDefinition): number {
  if (scriptDefinition) {
    return Number(scriptDefinition.isPresent());
  }

  return -1;
}

TrackingPixel.setBaseUrl("https://example.com");
window.addEventListener("load", () => {
  setTimeout(() => {
    if (!doAutoReport) {
      return;
    }
    getPresencesAndReport();
  }, 3000);
});
