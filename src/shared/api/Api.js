import md5 from "js-md5";
import getTimeStamp from "../helpers/getTimeStamp";

class API {
  constructor() {
    this.password = import.meta.env.VITE_PASSWORD;
    this.url = import.meta.env.VITE_URL;
  }

  async getProductsCount() {
    const authString = `${this.password}_${getTimeStamp()}`;

    try {
      const data = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": md5(authString),
        },
        body: JSON.stringify({
          action: "get_ids",
        }),
      });

      const response = await data.json();

      return response;
    } catch (error) {
      console.log(error);
      this.getProductsCount();
    }
  }

  async getProductsID(offset, limit) {
    const authString = `${this.password}_${getTimeStamp()}`;

    try {
      const data = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": md5(authString),
        },
        body: JSON.stringify({
          action: "get_ids",
          params: { offset, limit },
        }),
      });

      const response = await data.json();

      return response;
    } catch (error) {
      console.log(error);
      this.getProductsID(offset, limit);
    }
  }

  async getProductsInfo(ids) {
    const authString = `${this.password}_${getTimeStamp()}`;

    try {
      const data = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": md5(authString),
        },
        body: JSON.stringify({
          action: "get_items",
          params: { ids },
        }),
      });

      const response = await data.json();

      return response;
    } catch (error) {
      console.log(error);
      this.getProductsInfo(ids);
    }
  }

  async getFilterProducts(/* param */) {
    const authString = `${this.password}_${getTimeStamp()}`;

    try {
      const data = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": md5(authString),
        },
        body: JSON.stringify({
          action: "filter",
          params: { brand: "Piaget", price: 23363 },
        }),
      });

      const response = await data.json();

      return response;
    } catch (error) {
      console.log(error);
      // this.getFilterProducts(param);
    }
  }
}

export default new API();
