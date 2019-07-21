import { IType } from "./i-type";

export interface IPipeInterface {
	name: string;
	argumentType: IType;
	resultType: IType;
}
