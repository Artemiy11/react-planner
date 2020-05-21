import React from 'react';
import './app-header.css';

function Appheader({liked, allPosts}) {
    return(
        <div className="app-header">
        <h1>Artemy Klimashko</h1>
        <h2>{allPosts} записей, {liked} понравилось</h2>
        </div>
    )
}

export default Appheader;