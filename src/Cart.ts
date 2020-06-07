export class Cart {
    private readonly _id: number;
    private readonly _product: number;
    private readonly _user: string;

    constructor(id: number, product: number, user: string) {
        this._id = id;
        this._product = product;
        this._user = user;
    }

    get id(): number {
        return this._id;
    }


    get product(): number {
        return this._product;
    }

    get user(): string {
        return this._user;
    }

    static convert(cartRaw: CartRaw): Cart {
        return new Cart(cartRaw.id, cartRaw.product, cartRaw.user);
    }
}

export interface CartRaw {
    id: number;
    product: number;
    user: string;
}