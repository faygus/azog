import { IComponentInfosJSON, IRefComponentJSON, IComponentWithInputsJSON } from "../../interfaces/utils/component-infos";

export function isRefComponentJSON(data: IComponentInfosJSON): data is IRefComponentJSON {
	return (<IRefComponentJSON>data).ref !== undefined;
}

export function isComponentWithInputsJSON(data: IComponentWithInputsJSON): data is IComponentWithInputsJSON {
	return (<IComponentWithInputsJSON>data).id !== undefined;
}
