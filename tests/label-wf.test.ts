import { Parser, HTMLRenderer } from "../lib/src";
import appJSON from './json/label-wf';
import { createHtmlElement } from "./utils/utils";

const parser = new Parser(appJSON);
const view = parser.parse(1);
const rootHtml = createHtmlElement();
HTMLRenderer.render(view, rootHtml);

describe('Label wireframe', () => {
	const elements = rootHtml.getElementsByTagName('p');
	const text = elements.length ? elements[0] : undefined;

	test('Label should be created', () => {
		expect(elements.length).toBe(1);
		if (text) {
			expect(text.innerText).toBe('Hey man');
		}
	});

	if (text) {
		test('Label should be centered', () => {
			expect(rootHtml.style.display).toBe('flex');
			expect(rootHtml.style.justifyContent).toBe('center');
			expect(rootHtml.style.alignItems).toBe('center');
		});
	}
});
