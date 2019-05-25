import { ImageView } from "../entities/controls/image";
import { IconWFView } from "../entities/controls/wireframe/icon";
import { LabelWFView } from "../entities/controls/wireframe/label";
import { UniColorWFView } from "../entities/controls/wireframe/uniColor";
import { ForLoopView } from "../entities/for-loop";
import { ConditionalView } from "../entities/if";
import { LayoutView } from "../entities/layouts/layout";
import { RouterView } from "../entities/router";
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
import { LayersView } from "../entities/layers/layers";

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
		// ... TODO
	]);
	return map;
}
