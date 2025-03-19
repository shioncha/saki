"use client"

import { useEffect, useState } from 'react';

import styles from './Comments.module.css';

export function Comments({ postId }) {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        yourName: '',
        yourEmail: '',
        comment: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/api/blog/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
    }

    useEffect(() => {
        async function getComments() {
            const res = await fetch(`/api/blog/${postId}/comments`)
            const data = await res.json();
            setData(data);
        };

        getComments();
    }, [postId]);

    return (
        <div className={styles.container}>
            <p className={styles.title}>Comments</p>
            <div className={styles.comments}>
                {data.map((comment) => {
                    return (
                        <div key={comment.id} className={styles.comment}>
                            <p>{comment.yourName} さん<span>{comment.createdDate} {comment.createdTime}</span></p>
                            <p>{comment.comment}</p>
                        </div>
                    )
                })}
            </div>
            <p>コメントする</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" name="yourName" placeholder="名前" onChange={handleChange} />
                <input type="email" name="yourEmail" placeholder="メールアドレス" onChange={handleChange} />
                <textarea name="comment" placeholder="コメント" onChange={handleChange}/>
                <button type="submit">送信</button>
            </form>
        </div>
    );
}
