export class ImagesResources {
	private static _images: { [key: string]: string } = {};

	static getImagePath(name: string): string | undefined {
		const res = ImagesResources._images[name];
		return res;
	}

	static registerImage(name: string, path: string): void {
		ImagesResources._images[name] = path;
	}

	static registerImages(images: { [key: string]: string }): void {
		for (const imageName in images) {
			ImagesResources._images[imageName] = images[imageName];
		}
	}
}
