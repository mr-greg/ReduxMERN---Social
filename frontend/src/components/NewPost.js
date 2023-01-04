import React, { useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts } from '../feature/post.slice';

const NewPost = () => {
    const [message, setMessage] = useState("");
    const userId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();

    const handleForm = (e) => {
        e.preventDefault();

        const data = {
            message: message,
            author: userId,
            // créer un ID provisoire en attendant le retour de le DB
            _id: Date.now()
        }
        
        axios.post('http://localhost:5000/post/', data)

        dispatch(createPost(data));
        // GetPost car il faut aller chercher l'ID créé par MongoDB
        dispatch(getPosts());
        
        setMessage("");
    }


    return (
        <form onSubmit={(e) => handleForm(e)} className='new-post-container'>
            <textarea placeholder="Quoi de neuf ?" onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
            <input type="submit" value="Envoyer" onClick={(e) => handleForm(e)}/>
        </form>
    );
};

export default NewPost;