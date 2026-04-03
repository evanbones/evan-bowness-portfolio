export declare function removeNode<T extends {
    parentNode?: {
        removeChild: (child: T) => void;
    } | null | false;
}>(node: T): void;
//# sourceMappingURL=util.d.ts.map