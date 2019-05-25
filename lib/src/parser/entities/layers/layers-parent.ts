import { IComponentInfos } from "../composition/i-component-infos";
import { BaseLayersView, BaseLayerView, BaseMainLayerView } from "./base-layers";

export class LayersParentView extends BaseLayersView<IComponentInfos> {

}

export class LayerParentView extends BaseLayerView<IComponentInfos> {

}

export class MainLayerParentView extends BaseMainLayerView<IComponentInfos> {

}
