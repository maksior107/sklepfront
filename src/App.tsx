import * as React from 'react';
import {Product, ProductRaw} from './entities/Product';
import {Category, CategoryRaw} from './entities/Category';
import Cookies from 'js-cookie';
import ProductListPage from './components/ProductListPage';
import {Cart, CartRaw} from './entities/Cart';
import {Payment, PaymentRaw} from './entities/Payment';
import {Order, OrderRaw} from './entities/Order';

export function App(): JSX.Element {
	const [products, setProducts] = React.useState<Product[]>([]);
	const [categories, setCategories] = React.useState<Category[]>([]);
	const [carts, setCarts] = React.useState<Cart[]>([]);
	const [payment, setPayment] = React.useState<Payment | undefined>(undefined);
	const [orders, setOrders] = React.useState<Order[]>([]);

	const uri: string = 'http://localhost:9000';
	const init: RequestInit = {
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Csrf-Token': Cookies.get()['PLAY_CSRF_TOKEN']
		},
		credentials: 'include',
		method: 'GET'
	};

	React.useEffect((): void => {
		fetch(`${uri}/productJson`, init)
			.then((response: Response) => response.json())
			.then(data => setProducts(data.map((prod: ProductRaw) => Product.convert(prod))));

		fetch(`${uri}/categoryJson`, init)
			.then((response: Response) => response.json())
			.then(data => setCategories(data.map((categ: CategoryRaw) => Category.convert(categ))));
	}, []);

	function handleCartCreate(product: Product): void {
		fetch(`${uri}/cart/createJson`, {
			...init,
			method: 'POST',
			body: JSON.stringify({id: 0, product: product.id, user: ''})
		})
			.then((response: Response) => response.json())
			.then((cartRaw: CartRaw): void => setCarts([...carts, Cart.convert(cartRaw)]));
	}

	function handlePaymentSave(bankAccount: string): void {
		fetch(`${uri}/payment/createJson`, {
			...init,
			method: 'POST',
			body: JSON.stringify({id: 0, amount: carts.length, accountNumber: bankAccount})
		})
			.then((response: Response) => response.json())
			.then((paymentRaw: PaymentRaw): void => setPayment(Payment.convert(paymentRaw)));
	}

	function handleOrderPlace(): void {
		fetch(`${uri}/order/createJson`, {
			...init,
			method: 'POST',
			body: JSON.stringify({id: 0, user: '', cart: 0, payment: payment?.id})
		})
			.then((response: Response) => response.json())
			.then((ordersRaw: OrderRaw[]): Order[] => ordersRaw
				.map((orderRaw: OrderRaw): Order => Order.convert(orderRaw)))
			.then(setOrders);
	}

	function findProduct(cartId: number): Product | undefined {
		return products.find((p: Product): boolean =>
			carts.find((cart: Cart): boolean =>
				cart.id === cartId)?.product === p.id);
	}

	return (
		<ProductListPage
			categories={categories}
			products={products}
			onCartCreate={handleCartCreate}
			onPaymentSave={handlePaymentSave}
			payment={payment}
			onOrderPlace={handleOrderPlace}
			orders={orders}
			findProduct={findProduct}
		/>
	);
}

export default App;
