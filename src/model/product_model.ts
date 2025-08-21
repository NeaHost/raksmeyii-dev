import { DateUtil } from '../utils/date'; // Assuming you have similar Date utils in TypeScript

export interface Product {
  pId: number;
  pName?: string;
  barcode?: string;
  qty: number;
  photo?: string;
  priceOut?: number;
  priceIn?: number;
  categoryId?: number;
  categoryName: string;
  description: string;
  deleted?: string;
  updatedAt?: string;
  createdAt?: string;
  expiredDate?: string;
  selected: boolean;
}

export class ProductModel implements Product {
  pId: number = 0;
  pName?: string;
  barcode?: string;
  qty: number = 0;
  photo?: string;
  priceOut?: number;
  priceIn?: number;
  categoryId?: number;
  categoryName: string = '';
  description: string = '';
  deleted?: string;
  updatedAt?: string;
  createdAt?: string;
  expiredDate?: string;
  selected: boolean = false;

  constructor(data: Partial<Product> = {}) {
    Object.assign(this, data);
  }

  static fromJson(json: any): ProductModel {
    const product = new ProductModel({
      pId: json.p_id ?? 0,
      pName: json.p_name,
      barcode: json.barcode,
      qty: json.qty ?? 0,
      priceOut: json.price_out ?? 0.0,
      description: json.description ?? '',
      priceIn: json.price_in ?? 0.0,
      photo: json.photo ?? '',
      categoryId: json.category_id,
      deleted: json.deleted,
      updatedAt: json.updated_at ? DateUtil.convertDate(json.updated_at) : undefined,
      createdAt: json.created_at ? DateUtil.convertDate(json.created_at) : undefined,
      expiredDate: json.expired_date ? DateUtil.fmMDY(DateUtil.parse(json.expired_date)) : undefined,
      categoryName: json.category && json.category.category_name
        ? json.category.category_name
        : '',
    });
    return product;
  }
}
