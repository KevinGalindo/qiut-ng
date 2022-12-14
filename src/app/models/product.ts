import { environment } from "src/environments/environment";
import { IApiProductData, IproductFormData } from "../services/api/api-products.service";

export class ProductInfo
{
    
    public get id(): number { return this._data.id; }
    public get date(): string { return this._data.date; }
    public get name(): string { return this._data.name; }
    public get price(): number { return this._data.price }
    public get type(): string { return this._data.type }
    public get user(): number { return this._data.user; }
    public get images(): string[] { return this._data.images.map(item => `${environment.UrlApi}/media/products/${this.id}/${item}`) }
    public get imagesForName(): string[] { return this._data.images }
    public get description(): string { return this._data.description;  }
    public get categorys(): string[] { return this._data.categorys; }

    constructor(private _data:IApiProductData) {

    }

    get imgDefault(): string {
        return `${environment.UrlApi}/media/products/${this.id}/${this._data.images[0] || 'default'}`;
    }

    /**
     * Retorna los varoles para le formulario de datos
     */
    getValuesForm(): IproductFormData{
        return {
            name: this._data.name,
            description: this._data.description,
            price: this._data.price.toString(),
            categorys: this._data.categorys,
            type: this._data.type
        }
    }

    setData(data:IApiProductData): void {
        this._data = data;
    }

    getData(){
        return this._data;
    }
}