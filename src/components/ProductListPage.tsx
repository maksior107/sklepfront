import * as React from 'react';
import {Product} from 'entities/Product';
import {Category} from 'entities/Category';
import {Payment} from 'entities/Payment';
import {Order} from 'entities/Order';

export interface ProductListPageProps {
	categories: Category[];
	products: Product[];
	onCartCreate: (product: Product) => void;
	onPaymentSave: (bankAccount: string) => void;
	payment?: Payment;
	onOrderPlace: () => void;
	orders: Order[];
	findProduct: (cartId: number) => Product | undefined;
}

export function ProductListPage(props: ProductListPageProps): JSX.Element {
	const [selectedCategory, setSelectedCategory] = React.useState<Category | undefined>(undefined);
	const [bankAccount, setBankAccount] = React.useState<string | undefined>(undefined);

	function renderProduct(product: Product, index: number): JSX.Element {
		return (
			<tr key={index}>
				<th>{product.id}</th>
				<th>{product.name}</th>
				<th>{product.description}</th>
				<th>
					<button onClick={() => props.onCartCreate(product)}>ADD</button>
				</th>
			</tr>
		);
	}

	function renderCategory(category: Category, id: number): JSX.Element {
		return (
			<>
				<tr key={id} onClick={() => setSelectedCategory(selectedCategory === category ? undefined : category)}>
					<td>{category?.id}</td>
					<td>{category?.name}</td>
					<td>MOAR</td>
				</tr>
				{selectedCategory === category && <tr>
					<td colSpan={3}>
						<table>
							<tbody>
							{props.products
								.filter((p: Product): boolean => p.category === selectedCategory?.id)
								.map(renderProduct)
							}
							</tbody>
						</table>
					</td>
				</tr>}
			</>
		);
	}



	return (
		<>
			<table>
				<tbody>{props.categories.map(renderCategory)}</tbody>
			</table>
			<button onClick={() => setBankAccount(bankAccount === undefined ? '' : undefined)}>Checkout</button>
			<br />
			{bankAccount !== undefined && <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBankAccount(event.currentTarget.value)}/>}
			{bankAccount?.length === 26 && <button disabled={!!props.payment} onClick={() => props.onPaymentSave(bankAccount)}>SAVE PAYMENT</button>}
			{props.payment && <button onClick={props.onOrderPlace}>Place order</button>}
			{props.orders.length ? <>
				<hr/>
				{props.orders.map((order: Order): JSX.Element => <div>{props.findProduct(order.cart)?.name}</div>)}
			</>:<></>}
		</>
	);
}

export default ProductListPage;
