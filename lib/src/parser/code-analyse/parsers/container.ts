import { IContainerJSON, IIfDirectiveJSON } from "../../interfaces/container";
import { Container2, Direction, ContainerChildDirective, RepeatDirective, IfDirective } from "../../entities/container2";
import { ParsingUtils } from "../utils";
import { parseValueProvider } from "../value-provider";

export const containerParser = (componentJSON: IContainerJSON): Container2 => {
	const res = new Container2();
	if (componentJSON.direction === 'row') {
		res.direction = Direction.ROW;
	} else if (componentJSON.direction === 'column') {
		res.direction = Direction.COLUMN;
	}
	for (const childJSON of componentJSON.children) {
		const size = ParsingUtils.getSize(childJSON.size);
		const child = res.addChild(childJSON.spaceWithPrevious, size);
		if (childJSON.directive) {
			const directive = parseDirective(childJSON.directive);
			child.directive = directive;
		}
	}
	return res;
};

function parseDirective(directive: IIfDirectiveJSON | 'repeat'): ContainerChildDirective | undefined {
	if (typeof directive === 'string') {
		if (directive === 'repeat') {
			return new RepeatDirective();
		}
	} else if (directive.name === 'if') {
		const conditionProvider = parseValueProvider(directive.data.condition);
		return new IfDirective(conditionProvider);
	}
}
