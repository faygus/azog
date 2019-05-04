export type IMockViewModelJSON = {
	[key: string]: {
		loop?: boolean,
		values: {
			timeout: number,
			value: any
		}[]
	}
};
