import * as React from "react";
import {Product} from "./Product";

export interface ProductListPageProps {
    products: Product[];
    onClick: (product: Product) => void;
}

export class ProductListPage extends React.Component<ProductListPageProps, {}> {
    render(): JSX.Element {
        return (
            <div>
                {this.props.products.map((product, id) => this.renderProduct(product, id))}
            </div>
        );
    }

    private renderProduct(product: Product, id: number): JSX.Element {
        return <div key={id}
                    onClick={() => this.props.onClick(product)}>
            {product?.id}<br/>{product?.name}<br/>{product?.description}<br/>{product?.category}
        </div>
    }
}

export default ProductListPage;