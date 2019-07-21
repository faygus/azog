import { ImageView } from "../../models/views/controls/image";
import { IImageViewJSON } from "../../interfaces/image";
import { parseValueProvider } from "../value-provider";

export const imageParser = (viewJSON: IImageViewJSON): ImageView => {
	const src = parseValueProvider(viewJSON.src);
	const res = new ImageView(src);
	return res;
};
