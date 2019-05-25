import { Size } from "./size";

/**
 * definition of a layout, not looking at the content
 */
export class ExtensibleContainer {
	constructor(
		public direction: 'row' | 'column',
		public margin: number,
		public size: Size
	) {
	}
}
