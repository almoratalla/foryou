declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module "*.png" {
    const _default: any | string;
    export = _default;
}

declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

// eslint-disable-next-line id-denylist
declare interface String {
    prefix(pre: string): string;
    capitalize(): string;
    saneDateFormat(format?: string): string | undefined;
}

// eslint-disable-next-line id-denylist
declare interface Array<T> {
    chunk(size: number): T[][];
    remove(element: T): T[];
}

// eslint-disable-next-line id-denylist
declare interface Number {
    metrix(abbr?: boolean): string | number;
    saneDateFormat(format?: string): string | undefined;
}

// eslint-disable-next-line id-denylist
declare interface Date {
    saneDateFormat(format?: string): string | undefined;
}
