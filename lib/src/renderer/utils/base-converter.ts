export abstract class Converter<T> {
	abstract convert(value: T): string;
}
