export class LayersView {
	mainLayer?: LayerView;
	children: LayerView[] = [];
}

export class LayerView {
	positioner = new Positioner();
	child: any;

	constructor(public zIndex: number) {

	}
}

export class Positioner {
	padding: number = 0;
}
