import { ImageView } from "../models/views/controls/image";
import { IconWFView } from "../models/views/controls/wireframe/icon";
import { LabelWFView } from "../models/views/controls/wireframe/label";
import { UniColorWFView } from "../models/views/controls/wireframe/uniColor";
import { ForLoopView } from "../models/views/for-loop";
import { ConditionalView } from "../models/views/if";
import { LayoutView } from "../models/views/layouts/layout";
import { RouterView } from "../models/views/router";
import { ImageRenderer } from "./controls/image";
import { ForLoopRenderer } from "./for-loop";
import { ConditionalViewRenderer } from "./if";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { LayersRenderer } from "./layers";
import { LayoutRenderer } from "./layout";
import { RouterRenderer } from "./router";
import { IconWFRenderer } from "./wireframe/icon";
import { LabelWFRenderer } from "./wireframe/label";
import { UniColorWFRenderer } from "./wireframe/unicolor";
import { LayersView } from "../models/views/layers/layers";
import { ViewComposition } from "../models/view-composition";
import { ViewCompositionRenderer } from "./composition/view-composition";
import { UniColorView } from "../models/views/controls/uni-color";
import { UniColorRenderer } from "./controls/uni-color";

export function getRenderersMap(componentRenderer: IComponentRenderer2): Map<any, IBaseRenderer2<any>> {
	const map = new Map<any, IBaseRenderer2<any>>([
		[LabelWFView, new LabelWFRenderer()],
		[IconWFView, new IconWFRenderer()],
		[UniColorWFView, new UniColorWFRenderer()],
		[LayersView, new LayersRenderer(componentRenderer)],
		[RouterView, new RouterRenderer(componentRenderer)],
		[ForLoopView, new ForLoopRenderer(componentRenderer)],
		[LayoutView, new LayoutRenderer(componentRenderer)],
		[ImageView, new ImageRenderer()],
		[ConditionalView, new ConditionalViewRenderer(componentRenderer)],
		[ViewComposition, new ViewCompositionRenderer(componentRenderer)],
		[UniColorView, new UniColorRenderer()],
		// ... TODO
	]);
	return map;
}
