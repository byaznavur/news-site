import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Loading from "../../components/loading";

// Hozirgi sanani olish
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const year = yesterday.getFullYear();
const month = String(yesterday.getMonth() + 1).padStart(2, "0");
const day = String(yesterday.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

let apiKey = "c44bf6cffb194d6aa51e6ec8dcbda66a";
const baseURL = `https://newsapi.org/v2/everything?from=${formattedDate}&sortBy=popularity&apiKey=${apiKey}`;

export class Home extends Component {
  state = {
    posts: [],
    loading: false,
    currentPage: 1,
    postsPerPage: 6,
    searchQuery: "",
  };

  async getPosts(query = "Apple") {
    try {
      this.setState({ loading: true });
      let { data } = await axios.get(`${baseURL}&q=${query}`);
      this.setState({ posts: data.articles });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.getPosts();
  }

  handleSearch = (e) => {
    const query = e.target.value;
    this.setState({ searchQuery: query, currentPage: 1 });
    this.getPosts(query);
  };

  handlePageChange = (direction) => {
    this.setState((prevState) => {
      const newPage =
        direction === "next"
          ? prevState.currentPage + 1
          : prevState.currentPage - 1;
      return { currentPage: newPage };
    });
  };

  render() {
    const { posts, loading, currentPage, postsPerPage, searchQuery } =
      this.state;

    // Pagination hisob-kitobi
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
      <div className="container">
        <div className="newsNavbar">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={this.handleSearch}
            className="searchBox"
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div>
            <ul className="postList">
              {currentPosts.length > 0 ? (
                currentPosts
                  .filter((post) => post.urlToImage)
                  .map((post, index) => (
                    <div className="postCard" key={index}>
                      <img
                        src={post.urlToImage}
                        alt={post.title || "News image"}
                      />
                      <h4>{post.title}</h4>
                      <Link to={`/${post.title}`}>Learn More</Link>
                    </div>
                  ))
              ) : (
                <p>No results found.</p>
              )}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination">
              <button
                onClick={() => this.handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => this.handlePageChange("next")}
                disabled={currentPage === totalPages || posts.length === 0}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
