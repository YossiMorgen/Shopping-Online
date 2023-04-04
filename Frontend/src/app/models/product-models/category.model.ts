class CategoryModel {

    public categoryID: number;
    public categoryName: string;

    public constructor(category: CategoryModel) {
        this.categoryID = category.categoryID;
        this.categoryName = category.categoryName;
    }

}

export default CategoryModel;
