import { IComponentInfos } from "../../entities/composition/i-component-infos";
import { Component } from "../../entities/component";
import { IComponentRefs } from "../../entities/view-composition";

export function resolveComponent(componentInfos: IComponentInfos, refs: IComponentRefs): Component<any> {
	let childComponent: Component<any>;
	if (typeof componentInfos === 'string') {
		childComponent = refs[componentInfos];
	} else {
		childComponent = componentInfos;
	}
	return childComponent;
}
