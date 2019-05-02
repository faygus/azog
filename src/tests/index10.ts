/**
 * Layout with if directive
 */
export function run(): void {

	const layoutData: ILayout = {
		direction: 'column',
		children: [
			{
				spaceWithPrevious: 10
			},
			{
				spaceWithPrevious: 10,
				if: {
					condition: true
				}
			},
			{
				spaceWithPrevious: 10
			},
			{
				spaceWithPrevious: 10
			},
		]
	};

	const viewCompositionData: IViewComposition<ILayout> = {
		parentView: layoutData,
		children: [
			"1",
			"2",
			"3",
			"4"
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
	children: IlayouChild[]
}

interface IlayouChild {
	spaceWithPrevious: number;
	if?: IIfDirective;
}

type Binding<T> = T | { propertyName: string };

interface IIfDirective {
	condition: Binding<boolean>;
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
	let index = 0;
	for (const child of data.children) {
		let show = true;
		const childHtml = createComponent(child);
		if (layout.direction === 'row') {
			childHtml.style.width = DEFAULT_SIZE;
			childHtml.style.minWidth = DEFAULT_SIZE;
		} else {
			childHtml.style.height = DEFAULT_SIZE;
			childHtml.style.minHeight = DEFAULT_SIZE;
		}
		const template = data.parentView.children[index];
		if (index > 0) { // apply space
			const space = template.spaceWithPrevious + 'px';
			if (layout.direction === 'row') {
				childHtml.style.marginLeft = space;
			} else {
				childHtml.style.marginTop = space;
			}
		}
		if (template.if) {
			if (!template.if.condition) {
				show = false;
			}
		}
		if (show) {
			divHtml.appendChild(childHtml);
		}
		index++;
	}
	return divHtml;
}

function createComponent(component: any): HTMLElement {
	const res = document.createElement('div');
	let color: string;
	switch (component) {
		case "1":
			color = 'red';
			break;
		case "2":
			color = 'green';
			break;
		case "3":
			color = 'blue';
			break;
		default:
			color = 'yellow';
	}
	res.style.backgroundColor = color;
	return res;
}
