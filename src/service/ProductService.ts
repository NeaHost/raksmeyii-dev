import { ProductModel } from '../model/product_model';
import { Entity, ConditionQuery, ConditionWhere, ConditionPagination, ConditionSort } from "../db/helperSupbase";

interface ParamProduct {
  pName: string;
  skip: number;
  orderBy?: string | null;
  cateId?: number[] | null;
  wsId?: number | null;
  brandId?: number | null;
}

export default class ProductService {
  static async getAllProducts(param: ParamProduct | null): Promise<ProductModel[]> {
    const entity = new Entity('product');
    const from = param?.skip ?? 0;
    const to = from + 30;

    const isEqual: ConditionWhere[] = [];
    if (param?.wsId) isEqual.push(new ConditionWhere('ws_id', param.wsId));
    if (param?.brandId) isEqual.push(new ConditionWhere('brand_id', param.brandId));

    const anyIn: ConditionWhere[] = [];
    if (param?.cateId && param.cateId.length > 0) {
      anyIn.push(new ConditionWhere('category_id', param.cateId));
    }

    const sort: ConditionSort[] = [];
    if (param?.orderBy) sort.push(new ConditionSort(param.orderBy));

    const condition = new ConditionQuery({
      search: new ConditionWhere('p_name', param?.pName),
      isEqual,
      anyIn,
      pagination: new ConditionPagination(from, to),
      sort,
    });

    const response = await entity.select({
      condition,
      selects: '*,category:category_id(category_name)',
    });

    if (response.status && Array.isArray(response.data)) {

      return response.data.map((item: any) => ProductModel.fromJson(item));
    }
    return [];
  }
  static async getProductDetail(pId: number): Promise<ProductModel | null> {
    const entity = new Entity('product');
    const response = await entity.select({
      condition: new ConditionQuery({
        isEqual: [new ConditionWhere('p_id', pId)],
      }),
      selects: '*,category:category_id(category_name)',
    });

    if (response.status && Array.isArray(response.data) && response.data.length > 0) {
      return ProductModel.fromJson(response.data[0]);
    }
    return null;
  }
}