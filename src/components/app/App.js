import React, { Component } from 'react';

import Appheader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

import './app.css'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { label: 'Going to learn React', important: false, like: false, id: String(this.generateID(10000, 1)) },
        { label: 'Trying to end school with good marks', important: false, like: false, id: String(this.generateID(10000, 1)) },
        { label: 'Living with a smile on my face', important: false, like: false, id: String(this.generateID(10000, 1)) }
      ],
      term: '',
      filter: 'all'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  };

  generateID(max, min) {
    let id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id.toString(36);
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);
      return {
        data: [...data.slice(0, index), ...data.slice(index + 1)]
      }
    })
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      id: String(this.generateID(10000, 1))
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    })
  }

  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter(item => item.like);
    } else if (filter === 'all') {
      return items;
    }
  }

  onFilterSelect(filter) {
    this.setState({filter})
  }

  searchPost(items, term) {
    if (term.length === 0) {
      return items
    } else {
      return items.filter((item) => {
        return item.label.indexOf(term) > -1
      })
    }
  }

  onToggleImportant(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = { ...old, important: !old.important };
      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      return {
        data: newArr
      }
    });
  }

  onToggleLiked(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = { ...old, like: !old.like };
      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      return {
        data: newArr
      }
    });
  }

  onUpdateSearch(term) {
    this.setState({ term });
  }

  render() {
    const { data, term, filter } = this.state;

    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
    return (
      <div className="app">
        <Appheader liked={liked} allPosts={allPosts} />
        <div className="search-panel d-flex">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked} />
        <PostAddForm onAdd={this.addItem} />
      </div>
    );
  }
}