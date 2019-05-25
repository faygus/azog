import { IComponentInfos } from "../../parser/entities/composition/i-component-infos";
import { Component } from "../../parser/entities/component";
import { IComponentRefs } from "../../parser/entities/view-composition";

export function resolveComponent(componentInfos: IComponentInfos, refs: IComponentRefs): Component<any> {
	let childComponent: Component<any>;
	if (typeof componentInfos === 'string') {
		childComponent = refs[componentInfos];
	} else {
		childComponent = componentInfos;
	}
	return childComponent;
}
