export default class ProductModel{
    public productID: number;
    public productName: string; 
    public categoryID : number;
    public price: number;
    public image: File;
    public imageName: string;

    constructor(product?: ProductModel | any){
        if(product){
            this.productID = product.productID;
            this.productName = product.productName;
            this.categoryID = product.categoryID;
            this.price = product.price;
            this.image = product.image;
            this.imageName = product.imageName;
        }
    }

    public getFormData(): FormData{
        const formData = new FormData();
        
        formData.append('productName', this.productName );
        formData.append('imageName', this.imageName );
        formData.append('price', this.price?.toString() );
        formData.append('productID', this.productID?.toString() );
        formData.append('categoryID', this.categoryID?.toString() );
        formData.append('image', this.image );

        return formData;
    }
}