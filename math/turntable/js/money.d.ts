declare var jQuery: (selector: string) => any;
interface Number {
    getPrefix(name?: boolean): number | string;
    getValidValue(full?: boolean): number;
}
interface Math {
    trunc(n: number): number;
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
declare var society: number;
declare let resetMoney: symbol;
declare class money {
    type: string;
    constructor(type: string);
    amount(): number;
    amountName(): string;
    recharge(m: number): number;
    cost(m: number): number | false;
    refreshMoney(query?: string | object): string | false;
    static getAmountName(amount: number): string;
    static amount(type: string, name?: boolean): number | string;
    static recharge(money: number, type: string): number;
    static cost(money: number, type: string): number;
    static refreshMoney(type?: string, el?: string): string | false;
    static create(type: string): object | false;
}
declare var cookie: {
    set: (name: string, value: any, days?: number) => void;
    get: (name: string) => any;
    text: () => string;
};
declare var urlState: {
    data: {};
    clear: () => void;
    reset: () => boolean;
    get: (name: string) => string | null;
    set: (name: string, value?: string | number | undefined) => true;
    burn: (obj?: object | undefined) => true;
    obj: () => object | null;
};
declare var rootCSS: {
    text: {};
    val: {};
    value: {};
    reset: () => void;
};
declare function Import(src: string, type?: string): void;
