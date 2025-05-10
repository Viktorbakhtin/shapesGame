export abstract class BaseMediator<TView = any> {
    constructor(public readonly view: TView) {}

    abstract register(): void;
    abstract unregister(): void;
}