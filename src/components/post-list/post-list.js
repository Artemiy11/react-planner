import React from 'react';
import PostListItem from '../post-list-item/post-list-item';
import './post-list.css';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {
    const elements = posts.map(item => {
        const {id, label, important, like} = item;
        return(
            <li key={id} className="list-group-item">
            <PostListItem
                label={label}
                important={important}
                like={like}
                onDelete={() => onDelete(id)}
                onToggleImportant={() => onToggleImportant(id)}
                onToggleLiked={() => onToggleLiked(id)}/>
            </li>
        )
    });

    return (
        <ul className="list-group post-list">
            {elements}
        </ul>
    )
    
}

export default PostList;