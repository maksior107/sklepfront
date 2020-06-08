export class Payment {
	private readonly _id: number;
	private readonly _amount: number;
	private readonly _accountNumber: string;

	constructor(id: number, amount: number, accountNumber: string) {
		this._id = id;
		this._amount = amount;
		this._accountNumber = accountNumber;
	}

	get id(): number {
		return this._id;
	}

	get amount(): number {
		return this._amount;
	}

	get accountNumber(): string {
		return this._accountNumber;
	}

	static convert(paymentRaw: PaymentRaw): Payment {
		return new Payment(paymentRaw.id, paymentRaw.amount, paymentRaw.accountNumber);
	}
}

export interface PaymentRaw {
	id: number;
	amount: number;
	accountNumber: string;
}
