import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      limit : 5,
      offset : 5,
      defaultItems: [],
      search : ''
    };
  }

  componentDidMount() {
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=W5L21utoO0PSgs5Pub7pu2hnj5nH1d8z&limit=${this.state.limit}`
    )   
      .then(res => res.json())
      .then(result => {
        this.setState(
          {
            defaultItems: result.data,
          });
      });
  }

  fetchData = () => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=W5L21utoO0PSgs5Pub7pu2hnj5nH1d8z&limit=
      ${this.state.limit}&offset=${this.state.offset}`
    )
    .then(res => res.json())
    .then(result => {
        this.setState({
          defaultItems: [...this.state.defaultItems, ...result.data],
          offset: this.state.offset + 5
        });
    })
  }
  
  updateSearch = e => {
    this.setState({
      search: e.target.value
    },() => console.log(this.state.search)
    )
  }
  
  
  render() {
    let { defaultItems} = this.state;
    let filteredTitle = defaultItems.filter(
      (item) => {
        return item.title.indexOf(this.state.search.toLocaleLowerCase()) !== -1;
      }
    )
    console.log(defaultItems)
    return (
      // eslint-disable-next-line react/style-prop-object
      <div style={{textAlign:"center"}}>
        <input type="text" onChange={this.updateSearch} />
        <InfiniteScroll
          dataLength={defaultItems.length}
          next={this.fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {filteredTitle.map((item, index) => (
            <div key={index}>
              <p>
                Tiêu đề : {item.title}
              </p>
              <img src={item.images.downsized.url} alt={item.title} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
