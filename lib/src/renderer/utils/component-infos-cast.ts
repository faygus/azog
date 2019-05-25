import { Component } from "../../entities/component";
import { IComponentInfos } from "../../entities/composition/i-component-infos";

export function isRefComponent(data: IComponentInfos): data is string {
	return typeof data === 'string';
}

export function isComponentWithInputsJSON(data: IComponentInfos): data is Component<any> {
	return typeof data !== 'string';
}
