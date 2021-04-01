declare var jQuery: (selector: string) => any;
interface Number {
    getPrefix(name?: boolean): number | string;
    getValidValue(full?: boolean): number;
}
interface Math {
    social(n: number): number;
}
interface CSSRule {
    style: any;
    selectorText: any;
}
interface String {
    hyphenToCamelCase(): string;
    i(index: number, character?: string | number): string;
    replaces(stra: string | string[], strb?: string | string[], sep?: string, caseInsensitive?: boolean): string;
}
interface Document {
    Import(src: string, type?: string): void;
}
declare var society: number;
declare var money: any;
declare var cookie: {
    set: (name: string, value: any, days?: number) => void;
    get: (name: string) => any;
    text: () => string;
};
declare var urlState: {
    data: {};
    clear: () => true;
    reset: () => boolean;
    get: (name: string) => string | null;
    set: (name: string, value?: string | number | undefined) => boolean;
    burn: (obj?: object | undefined) => boolean;
    obj: () => object | null;
};
declare var rootCSS: {
    text: {};
    val: {};
    value: {};
    reset: () => void;
};
