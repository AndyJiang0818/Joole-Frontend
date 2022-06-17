import React, { Component } from "react";

class ProductSelected extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      loading: false,
      requestedProduct: "",
    };
  }

  render() {
    if (this.state.loading == false) {
      this.setState({
        loading: true,
        requestedProduct: localStorage.getItem("requestedProduct"),
      });
    }

    const productsJSON = JSON.parse(localStorage.getItem("products"));

    let totalProductNum = Object.keys(productsJSON).length;

    let productRequestIndex = 0;

    for (let i = 0; i < totalProductNum; i++) {
      if (productsJSON[i].name === this.state.requestedProduct) {
        productRequestIndex = i;
      }
    }

    return (
      <div>
        <h1 style={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>
          joole
        </h1>
        <h4
          className="mt-3 mb-5"
          style={{ textAlign: "center", color: "gray", fontWeight: "bold" }}
        >
          Building Product Selection Platform
        </h4>

        <div className="card card-container mt-1">
          <div>
            <strong>Product Name: </strong> {this.state.requestedProduct}
          </div>

          <div>
            <strong>Product Brand: </strong>{" "}
            {productsJSON[productRequestIndex].brand}
          </div>

          <div>
            <strong>Product Type: </strong>
            {productsJSON[productRequestIndex].productType.productTypeDetail}
          </div>

          <div>
            <strong>Product Year: </strong>{" "}
            {productsJSON[productRequestIndex].modelYear}
          </div>

          <div>
            <strong>Product Details: </strong>
            {
              productsJSON[productRequestIndex].technicalDetail
                .technicalDetailName
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSelected;
