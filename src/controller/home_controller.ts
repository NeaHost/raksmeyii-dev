import CategoryModel from "../model/category_model";
import CategoryService from "../service/cateogry_service";

export default class HomeController {
    async fetchCategory(): Promise<CategoryModel[]> {
        let cate = <CategoryModel[]>[];
        try {
            // Fetch new products based on the current `skip` value
            const data = await CategoryService.getCateogry();
            if (data.length > 0) {
                cate = data;
            }

        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
        return cate;
    }
}