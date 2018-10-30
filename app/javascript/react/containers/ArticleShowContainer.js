import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ArticleShowTile from '../components/ArticleShowTile.js'

class ArticleShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    let feed = this.state.articles[0]
    let url = 'https://newsapi.org/v2/everything?' +
            'q=cats&' +
            'from=2018-10-30&' +
            'sortBy=popularity&' +
            'apiKey=d998b6c3d86445619d85c00507518151';

    let req = new Request(url);

    fetch(req)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        articles: response.articles
      })
    })
    .catch(error => console.error('Error:', error));
    
    fetch('/api/v1/articles', {
      credentials: 'same-origin',
      method: "post",
      body: JSON.stringify(feed),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      debugger
      console.log(this.state.articles)
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      console.log(body)
    })

  }

  render() {
    let count = 0
    let articles = this.state.articles.map(article => {
      count++

      return(
        <ArticleShowTile
          key={count}
          title={article.title}
          description={article.description}
          url={article.url}
          source={article.source.name}
          image={article.urlToImage}
        />
      )
    })
    return(
      <div className="row small-up-1 medium-up-3">
        {articles}
      </div>
    )
  }
}

export default ArticleShowContainer;
