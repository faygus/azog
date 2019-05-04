import { Host } from "./host";
import { OldLayout } from "./old-layout";
import { StructuralDirective } from "./directives/structural-directive";

export class Container {
	children: (Host | StructuralDirective)[] = []; // TODO structural directive
	layoutManager: OldLayout;

	constructor() {
		this.layoutManager = new OldLayout();
	}

	addChild(child: Host | StructuralDirective): void {
		this.children.push(child);
	}
}
