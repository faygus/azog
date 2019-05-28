import { ValueProvider } from "./binding";
import { IColorJSON } from "../../interfaces/utils/color";

export class UniColorView {
	color?: ValueProvider<IColorJSON>; // TODO do not use JSON interfaces
}
