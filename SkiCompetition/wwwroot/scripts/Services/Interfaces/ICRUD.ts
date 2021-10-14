interface ICRUD<T> {
    Create(elemet: T): Promise<number>;
    Read(id: number): Promise<T>;
    Update(id: number, element: T): Promise<void>;
    Delete(id: number): Promise<void>;
    ReadAll(): Promise<T[]>;
}