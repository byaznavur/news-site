import React, { Component } from "react";
import { Loading } from "./../../components/loading/index";
import axios from "axios";
import "./style.css";

export class HomeDetails extends Component {
  state = {
    news: null,
    loading: false,
  };

  async getNewsDetails(id) {
    let apiKey = "c44bf6cffb194d6aa51e6ec8dcbda66a";

    this.setState({ loading: true }); // Yuklanish holatini o'rnatish

    try {
      let { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=${id}&apiKey=${apiKey}`
      );
      this.setState({ news: data.articles[0], loading: false }); // Faqat birinchi yangilikni olish
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    let id = window.location.pathname.split("/").at(-1); // URL'dan `id` olish
    this.getNewsDetails(id);
  }

  render() {
    const { news, loading } = this.state;

    return (
      <div className="container">
        {loading ? (
          <Loading />
        ) : news ? (
          <div className="detailsCard">
            <h2>{news.title}</h2>
            <img src={news.urlToImage} alt={news.title} />
            <p>{news.content}</p>
            <p>{news.description}</p>
            <span>{news.author}</span>
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              Read Full Article
            </a>

            <h4>{news.publishedAt}</h4>
          </div>
        ) : (
          <p>No data available for this news.</p>
        )}
      </div>
    );
  }
}

export default HomeDetails;
