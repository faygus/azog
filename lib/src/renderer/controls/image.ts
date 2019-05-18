import { ImageView } from "../../parser/entities/controls/image";
import { watchViewProperty } from "../binding-resolver";
import { DynamicViewModel } from "../dynamic-view-model";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IParentView } from "../interfaces/parent-view";
import { ImagesResources } from "../images-loader";

export class ImageRenderer implements IBaseRenderer2<ImageView> {
	build(label: ImageView, inserter: IParentView, viewModel?: DynamicViewModel): void {
		const htmlElement = document.createElement('img');
		htmlElement.style.height = '100%';
		htmlElement.style.width = '100%';
		const handler = (value: string) => {
			const src = ImagesResources.getImagePath(value);
			if (src) {
				htmlElement.src = src;
			}
		};
		watchViewProperty(label.src, viewModel, handler);
		// inserter.centerContent(true, true);
		inserter.add(htmlElement);
	}
}
