import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import axios from 'axios';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true,

    };
  }

  componentDidMount() {
    this.performSearch();
  }

    performSearch = (query = 'seinfeld') => {
          axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=100&api_key=dc6zaTOxFJmzC`)
      .then(response => {
        this.setState({
          gifs: response.data.data,
          loading: false,
        });
      })
      .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
    }

  render() { 
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm  onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading) ? <h1>Loading...</h1> : <GifList data={this.state.gifs} />            
          }
        </div>
      </div>
    );
  }
}
