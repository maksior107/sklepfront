import * as React from "react";
import ProductListPage from "./ProductListPage";
import {Product, ProductRaw} from "./Product";
import {ProductCreateForm} from "./ProductCreateForm";
import {Category, CategoryRaw} from "./Category";
import Cookies from 'js-cookie';


export interface AppState {
    products: Product[];
    categories: Category[];
}

export class App extends React.Component<{}, AppState> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            products: [],
            categories: []
        };
    }

    componentDidMount(): void {
        const productUrl: string = "http://localhost:9000/productJson";
        const categoryUrl: string = "http://localhost:9000/categoryJson";

        fetch(productUrl, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Csrf-Token': Cookies.get()["PLAY_CSRF_TOKEN"]
            },
            credentials: 'include', // Needed to allow cookies with CORS, see above link
            method: 'GET',
        }).then((response: Response) => {
            return response.json();
        }).then(data => {
            let products = data.map((prod: ProductRaw) => Product.convert(prod));
            this.setState({products});
        })

        fetch(categoryUrl, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Csrf-Token': Cookies.get()["PLAY_CSRF_TOKEN"]
            },
            credentials: 'include', // Needed to allow cookies with CORS, see above link
            method: 'GET',
        }).then((response: Response) => {
            return response.json();
        }).then(data => {
            let categories = data.map((categ: CategoryRaw) => Category.convert(categ));
            this.setState({categories});
        })
    }

    private handleProductCreate(productRaw: ProductRaw): void {
        var url = "http://localhost:9000/product/createJson";

        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Csrf-Token': Cookies.get()["PLAY_CSRF_TOKEN"]
            },
            credentials: 'include', // Needed to allow cookies with CORS, see above link
            method: 'POST',
            body: JSON.stringify(productRaw)
        }).then((response: Response) => {
            return response.json();
        }).then(data => {
            const product: Product = Product.convert(data);
            this.setState({
                products: [...this.state.products, product]
            });
        })
    }

    render(): JSX.Element {
        return (
            <div>
                <ProductCreateForm
                    categories={this.state.categories}
                    onCreate={this.handleProductCreate.bind(this)}
                />
                <ProductListPage
                    categories={this.state.categories}
                    products={this.state.products}
                    onClick={product => console.log(product)}
                />
            </div>
        );
    }
}

export default App;