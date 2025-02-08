

export interface Product {
    _id:string;
    productName:string;
    _type:"product";
    image? : {
        _type:"image";
        asset : {
            _ref : string;
            _type:'reference';
        };
    };
    price : number;
    description:string;
    label?:string;
    color?:string;
    id?:string;
    colors?:string;
    newArrival?:string;
    category?:string;
    inventory:number;
    slug: {
        _type : "slug"
        current : string;
    }



}