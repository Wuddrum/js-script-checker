declare module 'dictionary' {
	export type Dictionary<TValue> = {
	    [key: string]: TValue;
	};

}
declare module 'script-definitions/script-definition' {
	export interface IScriptDefinition {
	    isPresent(): boolean;
	}

}
declare module 'script-definition-registry' {
	import { Dictionary } from 'dictionary';
	import { IScriptDefinition } from 'script-definitions/script-definition';
	export class ScriptDefinitionRegistry {
	    static register(name: string, definition: IScriptDefinition): void;
	    static get(name: string): IScriptDefinition;
	    static getAll(): Dictionary<IScriptDefinition>;
	    private static registry;
	}

}
declare module 'tracking-pixel' {
	export class TrackingPixel {
	    static setBaseUrl(url: string): void;
	    static create(name: string): void;
	    private static baseUrl;
	}

}
declare module 'index' {
	import { Dictionary } from 'dictionary';
	export function getPresences(names?: string | string[]): Dictionary<number> | undefined;
	export function reportPresences(presences: Dictionary<number>): void;
	export function getPresencesAndReport(names?: string | string[]): void;
	export let doAutoReport: boolean;

}
declare module 'script-definitions/adroll' {
	export {};

}
declare module 'script-definitions/google-analytics' {
	export {};

}
declare module 'script-definitions/google-tag-manager' {
	export {};

}
declare module 'script-definitions/marketo' {
	export {};

}
declare module 'script-definitions/pardot' {
	export {};

}
