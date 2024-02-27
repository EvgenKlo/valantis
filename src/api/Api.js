import md5 from "js-md5";
import getTimeStamp from "../helpers/getTimeStamp";

class API {
  constructor() {
    this.password = import.meta.env.VITE_PASSWORD;
    this.url = import.meta.env.VITE_URL;
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
    }
  }
}

export default new API();
