export default interface Consumer<T = any> {
    (arg: T): void;
};
