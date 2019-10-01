import React, { Component } from "react";
import Box from "./Box";
import "./ListBox.css";

export default class ListBox extends Component {
  render() {
    return (
      <div className="container">
          {
              data.map((value,key) => (
                <Box key={key} title={value.title} > </Box>
              ))
          }
      </div>
    );
  }
}

