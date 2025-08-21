import { Entity, ConditionQuery, ConditionSort } from "../db/helperSupbase";
import CategoryModel from '../model/category_model';

export default class CategoryService {
  static async getCateogry(): Promise<CategoryModel[]> {
    const entity = new Entity('category');
    const condition = new ConditionQuery();
    condition.sort = [new ConditionSort('order_num')];

    const response = await entity.select({
      condition,
    });

    if (response.status && Array.isArray(response.data)) {
      return response.data.map((item: any) => CategoryModel.fromJson(item));
    }
    return [];
  }
}