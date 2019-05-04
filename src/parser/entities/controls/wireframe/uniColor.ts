import { WireframeColor } from "./enums/color";
import { ValueProvider } from "../binding";

export class UniColorWFView {
	color?:  ValueProvider<WireframeColor>;
}
