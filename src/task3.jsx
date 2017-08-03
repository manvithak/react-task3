import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link,HashRouter,Route} from 'react-router-dom'


function filterList(sources){
  const categories = [];
  sources.map((source,index)=>{
    categories[index]=source.category;
  })
  return categories;
}
class DisplayNewsInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      newsInfo:[]
    }
    this.handleNews = this.handleNews.bind(this);
  }
  handleNews(info){
    axios.get('https://newsapi.org/v1/articles?',{
        params: {
          source: info,
          sortBy:'top',
          apiKey:'4b6e2e6046dc41c4a8f5f3a38809f810'

        }
      }).then(res => {
          this.setState({
            newsInfo: res.data.articles
          })
        }).catch(err => {
          console.log(err);
        });
  }
 componentWillMount(){
   this.handleNews(this.props.info);
 }
 render(){
   const newsInfo = this.state.newsInfo;
   return(
     <div>
       <h1>News</h1>
         {
           newsInfo.map(function(news,index) {
             return <p key={index}  >{news.description}</p>;
           })
         }
     </div>
   )
 }
}

class ToSelectBox extends React.Component{
 constructor(props){
    super(props);
    this.state={
      category:this.props.match.params.source,
      news:[],
      newsInfo:'',
      display: false
    }
    this.handleState = this.handleState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({
      newsInfo:e.target.value,
      display: true
    });
  }
  handleState(category){
    axios.get('https://newsapi.org/v1/sources?',{
        params: {
          category: category
        }
      }).then(res => {
          this.setState({
            news: res.data.sources,
            display:false
          })
        }).catch(err => {
          console.log(err);
        });
  }
  componentWillMount() {
    console.log('initial'+this.state.category);
    this.handleState(this.state.category);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      category:nextProps.match.params.source
    });

    var category = nextProps.match.params.source;
    this.handleState(category);
  }

  render(){
  var filterNews = this.state.news;
    //console.log(filterNews);

    return(
      <div>
        <h1>{this.state.category}</h1>
        <select ref="userInput" defaultValue="" onChange = {this.handleChange} required>
          <option value="" disabled>News</option>
          {
            filterNews.map(function(news,index) {
              return <option key={index} value={news.id}  >{news.id}</option>;
            })
          }
        </select>
        {this.state.display?<DisplayNewsInfo info = {this.state.newsInfo}/>:null}
     </div>
   )
  }
}

class ShowCategories extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const sources = this.props.sources;
    var categories = filterList(sources);
    var uniqCategories = _.uniqWith(categories);
    return(
      <div>
        {uniqCategories.map((source,index) => {
          return(
            <div  key = {index}>
              <li><Link to={'/ToSelectBox/'+source}  >{source} </Link> </li>
            </div>
          )
        })}
        <div>
          <HashRouter>
            <Route path = "/ToSelectBox/:source" component = {ToSelectBox}>
            </Route>
          </HashRouter>
        </div>
      </div>
    )
  }
}

class GetSources extends React.Component{
  constructor (props){
    super(props);
      this.state = {
        sources: []
      }
  }
  componentDidMount() {
    axios.get('https://newsapi.org/v1/sources?category=')
      .then(res => {
        this.setState({sources:res.data.sources});
      }).catch(err => {
        console.log(err);
      });
  }
  render(){
    const sources = this.state.sources;
    return(
        <div>
          <h1>Sources</h1>
          <ShowCategories sources={sources} />
        </div>
    )
  }
}

ShowCategories.propTypes={
  sources: PropTypes.array
}

export default GetSources;
