import * as React from "react";
import {Product} from "./Product";
import {Category} from "./Category";

export interface ProductListPageProps {
    categories: Category[];
    products: Product[];
    onClick?: (product: Product) => void;
}

export class ProductListPage extends React.Component<ProductListPageProps, {}> {
    render(): JSX.Element {
        return (
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>description</th>
                    <th>category</th>
                </tr>

                </thead>
                <tbody>
                {this.props.products.map((product, id) => this.renderProduct(product, id))}
                </tbody>
            </table>
        );
    }

    private renderProduct(product: Product, id: number): JSX.Element {
        return <tr key={id}
                   onClick={() => this.props.onClick?.(product)}>
            <td>{product?.id}</td>
            <td>{product?.name}</td>
            <td>{product?.description}</td>
            <td>{this.props.categories.find(cat => cat.id === product?.category)?.name}</td>
        </tr>
    }
}

export default ProductListPage;