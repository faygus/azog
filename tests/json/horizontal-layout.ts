import { IAppJSON } from "../../lib";

const dataJSON: IAppJSON = {
	views: {
		1: {
			type: 'layout',
			value: {
				direction: 'row',
				children: [
					{
						size: 100,
						componentId: 2
					},
					{
						size: 5
					},
					{
						size: 100,
						componentId: 3
					},
					{
						size: 5
					},
					{
						size: 100,
						componentId: 4
					}
				]
			}
		},
		2: {
			type: 'uniColorWF',
			value: {
				color: 0
			}
		},
		3: {
			type: 'uniColorWF',
			value: {
				color: 1
			}
		},
		4: {
			type: 'uniColorWF',
			value: {
				color: 2
			}
		}
	}
};

export default dataJSON;
