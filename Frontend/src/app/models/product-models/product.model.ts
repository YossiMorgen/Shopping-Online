export default class ProductModel{
    public productID: number;
    public productName: string; 
    public categoryID : number;
    public price: number;
    public image: File;
    public imageName: string;

    public getFormData(): FormData{
        const formData = new FormData();
        
        formData.append('productName', this.productName );
        formData.append('price', this.price.toString() );
        formData.append('categoryID', this.categoryID.toString() );
        formData.append('image', this.image );

        return formData;
    }
}