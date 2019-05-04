export function run(): void {
	const layout: ILayout = {
		direction: "column"
	};
	const container: IViewComposition<ILayout> = {
		parentView: layout,
		children: [
			"toto",
			"toto",
			"toto",
			"toto",
		]
	};
	const res = renderContainer(container);
	res.style.height = '100%';
	const root = document.getElementById('root');
	root!.appendChild(res);
}

function createChild(): HTMLElement {
	const child = document.createElement('div');
	child.style.backgroundColor = 'green';
	child.style.width = '100px';
	child.style.height = '100px';
	return child;
}

interface ILayout {
	direction: string;
}

interface IContentHolder {
	children: any[];
}

interface IViewComposition<T> extends IContentHolder {
	parentView: T;
}

function renderContainer(container: IViewComposition<ILayout>): HTMLElement {
	const layout = container.parentView;
	const res = document.createElement('div');
	res.style.backgroundColor = 'orange';
	res.style.display = 'flex';
	res.style.flexDirection = (layout.direction === 'row') ? 'row' : 'column';
	const space = '10px'; //layout.space + 'px';
	// children
	let index = 0;
	for (const child of container.children) {
		const childHtml = renderComponent(child);
		if (index > 0) { // apply margin
			if (layout.direction === 'row') {
				childHtml.style.marginLeft = space;		
			} else {
				childHtml.style.marginTop = space;	
			}
		}
		res.appendChild(childHtml);
		index++;
	}
	return res;
}

function renderComponent(component: any): HTMLElement {
	return createChild();
}

/*
	<container>
		<label>Hello</label>
		<label>world</label>
	</container>
*/
