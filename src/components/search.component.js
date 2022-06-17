import React, { Component } from "react";
import ProductService from "../services/product.service";

import { Redirect } from "react-router-dom";

export class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChangeQuery = this.handleOnChangeQuery.bind(this);

    this.state = {
      query: "",
      loading: false,
      productList: ["Starting Product List"],
      requestedProduct: "",
      selectedCategory: "mechanical",
      display: "none",
    };
  }

  handleOnChangeQuery(e) {
    this.setState({
      query: e.target.value,
      display: "",
    });
  }

  handleSearchClick = () => {
    const { history } = this.props;

    this.setState({
      loading: true,
      requestedProduct: this.state.query,
    });
  };

  categoryUpdate = () => {
    let selected = document.getElementById("category");
    let text = selected.options[selected.selectedIndex].text;

    this.setState({
      selectedCategory: text,
    });
  };

  render() {
    const productsJSON = JSON.parse(localStorage.getItem("products"));

    let totalProductNum = Object.keys(productsJSON).length;

    const productNames = [];

    for (let i = 0; i < totalProductNum; i++) {
      let x = productsJSON[i].productType.productTypeDetail;
      let y = this.state.selectedCategory;

      if (
        productsJSON[i].productType.productTypeDetail ===
        this.state.selectedCategory
      ) {
        productNames.push(productsJSON[i].name);
      }
    }

    this.state.productList = productNames;

    let productRequestIndex = 0;

    for (let i = 0; i < totalProductNum; i++) {
      if (productsJSON[i].name === this.state.requestedProduct) {
        productRequestIndex = i;
      }
    }

    if (this.state.loading) {
      localStorage.setItem("requestedProduct", this.state.requestedProduct);
      return <Redirect to="/productSelected" />;
    }

    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>
          joole
        </h1>

        <h4
          className="mt-3 mb-5"
          style={{ textAlign: "center", color: "gray", fontWeight: "bold" }}
        >
          Building Product Selection Platform
        </h4>

        <div>
          <select id="category" onChange={this.categoryUpdate}>
            <option value="mechanical">mechanical</option>
            <option value="electrical">electrical</option>
          </select>

          <input
            type="text"
            placeholder="search..."
            onChange={this.handleOnChangeQuery}
            onClick={this.handleOnChangeQuery}
          />

          <button onClick={this.handleSearchClick}>Search</button>
        </div>

        {
          <div
            className="card card-container mt-0 bg-white"
            style={{ display: this.state.display }}
          >
            {this.state.productList
              .filter((val) => {
                if (
                  val
                    .toLocaleLowerCase()
                    .includes(this.state.query.toLocaleLowerCase())
                ) {
                  return val;
                }
              })
              .map((name) => (
                <p>{name}</p>
              ))}
          </div>
        }

        <div></div>
      </div>
    );
  }
}

export default Search;
