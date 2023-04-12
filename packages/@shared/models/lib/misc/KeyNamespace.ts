export interface INamespacedInterface {
    isKeyInNamespace(namespacedKey: string): boolean;
    getNamespacedKey(key: string): string;
    getUnnamespacedKey(namespacedKey: string): string;
}

/**
 * A class representing a namespace for keys in a key-value store.
 */
class KeyNamespace implements INamespacedInterface {
    private readonly _namespace: string;

    /**
     * Creates a new KeyNamespace instance with the specified namespace string.
     * @param namespace The namespace string to use for the keys.
     */
    constructor(namespace: string) {
        this._namespace = namespace;
    }

    /**
     * Checks whether the specified key belongs to this namespace.
     * @param key The key to check.
     * @returns `true` if the key belongs to this namespace, `false` otherwise.
     */
    public isKeyInNamespace = (key: string): boolean =>
        key.startsWith(this._namespace);

    /**
     * Returns a namespaced version of the specified key by appending this namespace to it.
     * @param key The key to namespace.
     * @returns The namespaced key.
     */
    public getNamespacedKey = (key: string): string =>
        `${this._namespace}${key}`;

    /**
     * Returns an un-namespaced version of the specified key by removing this namespace from it.
     * @param namespacedKey The namespaced key to un-namespace.
     * @returns The un-namespaced key.
     */
    public getUnnamespacedKey = (namespacedKey: string): string =>
        namespacedKey.slice(this._namespace.length);
}

export default KeyNamespace;
