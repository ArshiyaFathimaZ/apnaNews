import React, { Component } from 'react'

export class NewsItem extends Component {
  constructor(){
    super();
    console.log('constructor is executed when the object is created for this class');
  }

  render() {
    let {title,description,url,newsUrl}=this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <img src={url} class="card-img-top"alt="img"/>
           <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
         </div>
      </div>
    )
  }
}

export default NewsItem
