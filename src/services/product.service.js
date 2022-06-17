import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8888/api/product/";

class ProductService {
  getAllProducts() {
    return axios
      .get(API_URL + "findAllProducts", { headers: authHeader() })
      .then((response) => {
        localStorage.setItem("products", JSON.stringify(response.data));

        return response;
      });
  }
}

export default new ProductService();
