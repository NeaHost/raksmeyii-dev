class CategoryModel {
    id: number = -1;
    name: string = '';
    photo: string = '';

    orderNum: number = 0;

    constructor(
        id: number = -1,
        name: string = '',
        photo: string = '',

        orderNum: number = 0
    ) {
        this.id = id;
        this.name = name;
        this.photo = photo;

        this.orderNum = orderNum;
    }

    static fromJson(json: Record<string, any>): CategoryModel {
        const category = new CategoryModel();

        category.id = json['category_id'] ?? 0;
        category.name = json['category_name'] ?? '';

        const img = (json['category_photo'] ?? '').toString();
        if (img) {
            category.photo = img;
        }

        category.orderNum = json['order_num'] ?? 0;

        return category;
    }
}

export default CategoryModel;
