import React, { Component } from 'react'//rce(short cuts)
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'//impt

// (alt+shift+click)-for multiple coursores
export class News extends Component {
  static defaultProps={
   
    // source:'bbc-news',
    // source:'',
    country:'in',
    pageSize:8,
    category: 'general',
  }
  static propTypes={
    country:PropTypes.string,//pts
    pageSize:PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    console.log('I am a constructor from News component');
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {
    console.log('CDM');
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=52d09746489d4fcd9faa97117c38ee0e&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);//it aync will waits until the promise is resolved 
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ 
      articles: parseData.articles, 
      totalResults: parseData.totalResults,
      loading:false })
  }

  handlePreviousClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=52d09746489d4fcd9faa97117c38ee0e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);//it aync will waits until the promise is resolved 
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading:false
    })
  }

  handleNextClick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=52d09746489d4fcd9faa97117c38ee0e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);//it aync will waits until the promise is resolved 
      let parseData = await data.json();
      console.log(parseData);
      this.setState({ page: this.state.page + 1, articles: parseData.articles,loading:false })

    }
  }

  render() {
    console.log('render');
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'35px 0px'}}>ApnaNews - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              {/* <NewsItem  title={element.title.slice(0,45)} description={element.description!=null?element.description.slice(0,88):element.description} url={element.urlToImage} newsUrl={element.url}/> */}
              <NewsItem title={element.title} description={element.description} url={element.urlToImage} newsUrl={element.url} />
            </div>
          })}

        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>

      </div>
    )
  }
}

export default News
