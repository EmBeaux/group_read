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
    fetch(`/api/v1/groups/${this.props.params.id}`)
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
        articles: response
      })
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    let articles = this.state.articles.map(article => {

      return(
        <ArticleShowTile
          key={article.id}
          title={article.title}
          description={article.description}
          url={article.url}
          source={article.source}
          image={article.image}
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
