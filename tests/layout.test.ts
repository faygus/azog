import { Parser, HTMLRenderer } from "../lib/src";
import appJSON from './json/layout';
import { createHtmlElement } from "./utils/utils";

const parser = new Parser(appJSON);
const view = parser.parse(1);
const rootHtml = createHtmlElement();
HTMLRenderer.render(view, rootHtml);

describe('Layout', () => {
	let layoutHtml = rootHtml.firstElementChild;

	test('Layout should be created', () => {
		expect(layoutHtml).toBeDefined();
		expect(layoutHtml instanceof HTMLElement).toBeTruthy();
	});

	if (layoutHtml instanceof HTMLElement) {
		const htmlElement: HTMLElement = <HTMLElement>layoutHtml;
		test('Layout should be vertical', () => {
			expect(htmlElement.style.display).toBe('flex');
			expect(htmlElement.style.flexDirection).toBe('column');
		});

		test('Children of layout should be rendered', () => {
			const children = htmlElement.children;
			expect(children.length).toBe(5);
			const expectedHeights = [100, 5, 100, 5, 100];
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				const height = (<HTMLElement>child).style.height;
				expect(height).toBe(expectedHeights[i] + 'px');
			}
		});
	}
});
