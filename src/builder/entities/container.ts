import { Host } from "./host";
import { Layout } from "./layout";
import { StructuralDirective } from "./directives/structural-directive";

export class Container {
	children: (Host | StructuralDirective)[] = []; // TODO structural directive
	layoutManager: Layout;

	constructor() {
		this.layoutManager = new Layout();
	}

	addChild(child: Host | StructuralDirective): void {
		this.children.push(child);
	}
}
