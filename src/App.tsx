import * as React from "react";
import ProductListPage from "./ProductListPage";
import Axios, {AxiosResponse} from "axios";
import {Product, ProductRow} from "./Product";

export interface AppState {
    products: Product[];
}

export class App extends React.Component<{}, AppState> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount(): void {
        var url = "http://localhost:9000/product"

        fetch(url, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        }).then(response => {
            console.log(response);
        })
        // Axios.get("localhost:9000/product", {
        //     headers: {
        //         'X-Requested-With': 'XMLHttpRequest'
        //     },
        // }).then((response: AxiosResponse<ProductRow[]>) => {
        //     return response.data.map(productRow => Product.convert(productRow));
        // }).then((response: Product[]) => {
        //     this.setState({products: response})
        // })

        // setInterval(() => {
        //     this.products.push(new Product(Date.now(), "what", "WHAT", 34213));
        //     this.forceUpdate();
        // }, 1000)
    }

    render(): JSX.Element {
        return (
            <div>
                <ProductListPage products={this.state.products} onClick={product => console.log(product)}/>
            </div>
        );
    }
}

export default App;