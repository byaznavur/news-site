import React, { Component } from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

export class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
