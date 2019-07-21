import { typeJSON } from "../type";

export interface IPipeInterfaceJSON {
	name: string;
	argumentType: typeJSON;
	resultType: typeJSON;
}
