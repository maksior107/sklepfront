export class Product {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _category: number;

    constructor(id: number, name: string, description: string, category: number) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._category = category;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get category(): number {
        return this._category;
    }

    static convert(productRaw: ProductRaw): Product {
        return new Product(productRaw.id, productRaw.name, productRaw.description, productRaw.category);
    }
}

export interface ProductRaw {
    id: number;
    name: string;
    description: string;
    category: number;
}