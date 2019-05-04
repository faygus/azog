export interface IMockDataSource {
	properties: IMockData[];
}

export interface IMockData {
	name: string;
	values: {
		timeout: number,
		value: any,
	}[];
	loop: boolean;
}
