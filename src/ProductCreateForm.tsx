import * as React from "react";
import {ProductRaw} from "./Product";
import {Category} from "./Category";

export interface ProductCreateFormState {
    productRaw: ProductRaw;
}

export interface ProductCreateFormProps {
    categories: Category[];
    onCreate:(productRaw: ProductRaw) => void;
}

export class ProductCreateForm extends React.Component<ProductCreateFormProps, ProductCreateFormState> {

    constructor(props: Readonly<ProductCreateFormProps>) {
        super(props);
        this.state = {
            productRaw: {id: 0, name: "", description: "", category: 0}
        };
    }

    render(): JSX.Element {
        return (
            <div>
                <input placeholder="name" onChange={this.handleNameChange.bind(this)} defaultValue={this.state.productRaw.name}/>
                <input placeholder="description" onChange={this.handleDescriptionChange.bind(this)} defaultValue={this.state.productRaw.description}/>
                <select onChange={this.handleCategoryChange.bind(this)}>
                    {this.props.categories.map(cat => <option value={cat.id}>{cat.name}</option>)}
                </select>
                {/*<input placeholder="category" type='number' onChange={this.handleCategoryChange.bind(this)} defaultValue={this.state.productRaw.category}/>*/}
                <input onClick={this.handleButtonClick.bind(this)} type='button' value="send"/>
            </div>
        );
    }

    private handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            productRaw: {
                ...this.state.productRaw,
                name: event.target.value
            }
        })
    }

    private handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            productRaw: {
                ...this.state.productRaw,
                description: event.target.value
            }
        })
    }

    private handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.setState({
            productRaw: {
                ...this.state.productRaw,
                category: +event.target.value
            }
        })
    }

    private handleButtonClick(): void {
        this.props.onCreate(this.state.productRaw)
    }
}