export abstract class Converter<T extends number> {
	protected _map: {[key: number]: string};

	constructor(map: {[key: number]: string}) {
		this._map = map;
	}

	convert(value: T): string {
		return this._map[value];
	}
}
