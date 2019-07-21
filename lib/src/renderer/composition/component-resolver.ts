import { IComponentInfos } from "../../models/composition/i-component-infos";
import { IComponentRefs } from "../../models/view-composition";

export function resolveComponent(componentInfos: IComponentInfos, refs: IComponentRefs): IComponentInfos {
	let childComponent: IComponentInfos;
	if (typeof componentInfos === 'string') {
		childComponent = refs[componentInfos];
	} else {
		childComponent = componentInfos;
	}
	return childComponent;
}
