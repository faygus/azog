const image1 = require("../../../assets/images/nadal.jpg");
const image2 = require("../../../assets/images/federer.jpg");

export class ImagesResources {
	private static _images: { [key: string]: string } = {
		'nadal': image1,
		'federer': image2,
	};

	static getImagePath(name: string): string | undefined {
		const res = ImagesResources._images[name];
		return res;
	}
}
