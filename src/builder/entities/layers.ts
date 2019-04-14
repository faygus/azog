export class Layers {
	mainLayer?: Layer;
	children: Layer[] = [];
}

export class Layer {
	zIndex?: number;
	positioner = new Positioner();
	child: any;
}

export class Positioner {
	padding: number = 0;
}
