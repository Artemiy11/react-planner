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
      ]
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
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

  render() {
    const { data } = this.state;
    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;
    return (
      <div className="app">
        <Appheader liked={liked} allPosts={allPosts} />
        <div className="search-panel d-flex">
          <SearchPanel />
          <PostStatusFilter />
        </div>
        <PostList posts={data} onDelete={this.deleteItem} onToggleImportant={this.onToggleImportant} onToggleLiked={this.onToggleLiked} />
        <PostAddForm onAdd={this.addItem} />
      </div>
    );
  }
}