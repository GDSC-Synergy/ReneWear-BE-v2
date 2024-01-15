export default interface Predicate<T = any> {
    (arg: T): boolean;
};
