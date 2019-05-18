import { Parser, HTMLRenderer } from "../lib/src";
import appJSON from './json/horizontal-layout';
import { createHtmlElement } from "./utils/utils";

const parser = new Parser(appJSON);
const view = parser.parse(1);
const rootHtml = createHtmlElement();
HTMLRenderer.render(view, rootHtml);

describe('HorizontalLayout', () => {
	let layoutHtml = rootHtml.firstElementChild;

	test('Layout should be created', () => {
		expect(layoutHtml).toBeDefined();
		expect(layoutHtml instanceof HTMLElement).toBeTruthy();
	});

	if (layoutHtml instanceof HTMLElement) {
		const htmlElement: HTMLElement = <HTMLElement>layoutHtml;
		test('Layout should be horizontal', () => {
			expect(htmlElement.style.display).toBe('flex');
			expect(htmlElement.style.flexDirection).toBe('row');
			expect(htmlElement.style.height).toBe('100%');
		});

		test('Children of layout should be rendered', () => {
			const children = htmlElement.children;
			expect(children.length).toBe(5);
			const expectedWidths = [100, 5, 100, 5, 100];
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				const width = (<HTMLElement>child).style.width;
				expect(width).toBe(expectedWidths[i] + 'px');
			}
		});
	}
});
