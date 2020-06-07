export class Category {
    private readonly _id: number;
    private readonly _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    static convert(categoryRaw: CategoryRaw): Category {
        return new Category(categoryRaw.id, categoryRaw.name);
    }
}

export interface CategoryRaw {
    id: number;
    name: string;
}