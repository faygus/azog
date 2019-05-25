import { ImageView } from "../parser/entities/controls/image";
import { IconWFView } from "../parser/entities/controls/wireframe/icon";
import { LabelWFView } from "../parser/entities/controls/wireframe/label";
import { UniColorWFView } from "../parser/entities/controls/wireframe/uniColor";
import { ForLoopView } from "../parser/entities/for-loop";
import { ConditionalView } from "../parser/entities/if";
import { LayersParentView } from "../parser/entities/layers/layers-parent";
import { LayoutView } from "../parser/entities/layout";
import { RouterView } from "../parser/entities/router";
import { ImageRenderer } from "./controls/image";
import { ForLoopRenderer } from "./for-loop";
import { ConditionalViewRenderer } from "./if";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { LayersRenderer } from "./layers/layers";
import { LayoutRenderer } from "./layout";
import { RouterRenderer } from "./router";
import { IconWFRenderer } from "./wireframe/icon";
import { LabelWFRenderer } from "./wireframe/label";
import { UniColorWFRenderer } from "./wireframe/unicolor";

export function getRenderersMap(componentRenderer: IComponentRenderer2): Map<any, IBaseRenderer2<any>> {
	const map = new Map<any, IBaseRenderer2<any>>([
		[LabelWFView, new LabelWFRenderer()],
		[IconWFView, new IconWFRenderer()],
		[UniColorWFView, new UniColorWFRenderer()],
		[LayersParentView, new LayersRenderer(componentRenderer)],
		[RouterView, new RouterRenderer(componentRenderer)],
		[ForLoopView, new ForLoopRenderer(componentRenderer)],
		[LayoutView, new LayoutRenderer(componentRenderer)],
		[ImageView, new ImageRenderer()],
		[ConditionalView, new ConditionalViewRenderer(componentRenderer)],
		// ... TODO
	]);
	return map;
}
