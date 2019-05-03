import { ScriptDefinitionRegistry } from "./script-definition-registry";
import { IScriptDefinition } from "./script-definitions/script-definition";
import { TrackingPixel } from "./tracking-pixel";

export function getPresences(names: string | string[] = "") {
  if (typeof names === "string") {
    if (names.length > 0) {
      const scriptDefinition = ScriptDefinitionRegistry.get(names);
      return { [names]: getPresenceNumber(scriptDefinition) };
    }

    names = Object.keys(ScriptDefinitionRegistry.getAll());
  }

  if (names instanceof Array) {
    const presences: any = {};
    for (const name of names) {
      if (typeof name !== "string") {
        return;
      }

      const scriptDefinition = ScriptDefinitionRegistry.get(name);
      presences[name] = getPresenceNumber(scriptDefinition);
    }

    return presences;
  }
}

export function reportPresences(presences: any) {
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

export function getPresencesAndReport(names: string | string[] = "") {
  const presences = getPresences();
  reportPresences(presences);
}

export let doAutoReport: boolean = true;

function getPresenceNumber(scriptDefinition: IScriptDefinition) {
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
