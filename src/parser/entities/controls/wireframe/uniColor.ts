import { WireframeColor } from "./enums/color";
import { ValueProvider } from "../binding";

export class UniColorWF {
	color?:  ValueProvider<WireframeColor>;
}
