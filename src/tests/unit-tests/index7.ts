/**
 * Layout with constant space between children
 */
export function run(): void {

	const layoutData: ILayout = {
		direction: 'column',
		childTemplate: {
			spaceWithPrevious: 30
		}
	};

	const viewCompositionData = {
		parentView: layoutData,
		children: [
			"toto",
			"toto",
			"toto",
			"toto",
			"toto",
			"toto",
			"toto",
			"toto",
			"toto",
			"toto",
			"toto",
			"toto",
		]
	};

	const res = render(viewCompositionData);
	res.style.backgroundColor = 'orange';
	res.style.height = '100%';
	const root = document.getElementById('root');
	if (root) {
		root.appendChild(res);
	}
}

interface ILayout {
	direction: 'row' | 'column';
	childTemplate: {
		spaceWithPrevious: number
	}
}

interface IViewComposition<T> {
	parentView: T;
	children: any[];
}

function render(data: IViewComposition<ILayout>): HTMLElement {
	const layout = data.parentView;
	const divHtml = document.createElement('div');
	divHtml.style.overflow = 'hidden';
	divHtml.style.display = 'flex';
	divHtml.style.flexDirection = (layout.direction === 'row') ? 'row' : 'column';
	// children
	const DEFAULT_SIZE = '100px';
	const SPACE = layout.childTemplate.spaceWithPrevious + 'px';
	let index = 0;
	for (const child of data.children) {
		const childHtml = document.createElement('div');
		if (layout.direction === 'row') {
			childHtml.style.width = DEFAULT_SIZE;
			childHtml.style.minWidth = DEFAULT_SIZE;
		} else {
			childHtml.style.height = DEFAULT_SIZE;
			childHtml.style.minHeight = DEFAULT_SIZE;
		}
		childHtml.style.backgroundColor = 'blue';
		if (index > 0) { // apply space
			if (layout.direction === 'row') {
				childHtml.style.marginLeft = SPACE;
			} else {
				childHtml.style.marginTop = SPACE;
			}
		}
		divHtml.appendChild(childHtml);
		index++;
	}
	return divHtml;
}
