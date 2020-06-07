export class Order {
    private readonly _id: number;
    private readonly _user: string;
    private readonly _cart: number;
    private readonly _payment: number;

    constructor(id: number, user: string, cart: number, payment: number) {
        this._id = id;
        this._user = user;
        this._cart = cart;
        this._payment = payment;
    }

    get id(): number {
        return this._id;
    }

    get user(): string {
        return this._user;
    }

    get cart(): number {
        return this._cart;
    }

    get payment(): number {
        return this._payment;
    }

    static convert(orderRaw: OrderRaw): Order {
        return new Order(orderRaw.id, orderRaw.user, orderRaw.cart, orderRaw.payment);
    }
}

export interface OrderRaw {
    id: number;
    user: string;
    cart: number;
    payment: number;
}