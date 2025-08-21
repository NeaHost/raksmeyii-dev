import ProductService from "../service/ProductService";
import { ProductModel } from "../model/product_model";

export default class ProductController {
  private products: ProductModel[] = [];
  public skip: number = 0;
  public isNomore: boolean = false;
  public txtSearch: string = "";
  public activeCategory: number = 0;
  async onRefresh(): Promise<ProductModel[]> {
    this.skip = 0;
    this.isNomore = false;
    this.products = [];
    return await this.fetchProducts();
  }
  static delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  async fetchProducts(): Promise<ProductModel[]> {
    try {
      // Fetch new products based on the current `skip` value
      const newProducts = await ProductService.getAllProducts({
        skip: this.skip,
        cateId: this.activeCategory === 0 ? [] : [this.activeCategory],
        pName: this.txtSearch.trim(),
      });

      if (newProducts.length > 0) {
        this.products = [...this.products, ...newProducts];
        this.skip += newProducts.length; // Update skip by the count of newly fetched products
      }

      // Set isNomore to true if no new products are fetched
      this.isNomore = newProducts.length === 0;

      return newProducts; // Return only the newly fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
  async fetchProductDetail(pId: number): Promise<ProductModel> {

    try {
      // Fetch new products based on the current `skip` value
      return await ProductService.getProductDetail(
        pId
      ) || new ProductModel();


    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }


  // Method to clear the stored products (e.g., on logout or data refresh)
  clearProducts(): void {
    this.products = [];
  }

  // Method to add a product to the internal state (for demonstration)
  addProduct(product: ProductModel): void {
    this.products.push(product);
  }

  // Method to get all products from the internal state
  getProducts(): ProductModel[] {
    return this.products;
  }
}
