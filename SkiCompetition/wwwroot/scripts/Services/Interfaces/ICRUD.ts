interface ICRUD<T> {
    create(elemet: T): Promise<number>;
    read(id: number): Promise<T>;
    update(id: number, element: T): Promise<void>;
    delete(id: number): Promise<void>;
    readAll(): Promise<T[]>;
}