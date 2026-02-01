"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import styles from "./Comments.module.css";
import { RelativeTime } from "../RelativeTime";

type Comment = {
  id: number;
  yourName: string;
  comment: string;
  createdAt: string;
};

type CommentFormData = {
  yourName: string;
  yourEmail: string;
  comment: string;
};

type CommentListProps = {
  comments: Comment[];
};

function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p>まだコメントはありません</p>;
  }

  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <p>
            {comment.yourName} さん
            <span>
              <RelativeTime dateString={comment.createdAt} />
            </span>
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}

type CommentFormProps = {
  setComments: (comments: Comment[]) => void;
  postId: string;
};

function CommentForm({ setComments, postId }: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<CommentFormData>({
    yourName: "",
    yourEmail: "",
    comment: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/blog/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      // Clear form
      setFormData({
        yourName: "",
        yourEmail: "",
        comment: "",
      });

      // Refresh comments list
      const commentsRes = await fetch(`/api/blog/${postId}/comments`);
      const commentsData = await commentsRes.json();
      setComments(commentsData);
    } catch {
      alert("コメントの送信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="yourName">名前</label>
      <input
        id="yourName"
        type="text"
        autoComplete="name"
        name="yourName"
        value={formData.yourName}
        placeholder="通りすがり"
        onChange={handleChange}
        disabled={isSubmitting}
        required
      />
      <label htmlFor="yourEmail">メールアドレス</label>
      <input
        id="yourEmail"
        type="email"
        autoComplete="email"
        name="yourEmail"
        value={formData.yourEmail}
        placeholder="example@example.com"
        onChange={handleChange}
        disabled={isSubmitting}
        required
      />
      <label htmlFor="comment">コメント</label>
      <textarea
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        disabled={isSubmitting}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "送信中…" : "送信"}
      </button>
    </form>
  );
}

type CommentsProps = {
  postId: string;
};

export function Comments({ postId }: CommentsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/blog/${postId}/comments`);
      const data = await res.json();
      setComments(data);
    } catch {
      console.error("コメントの取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Comments</p>
      {isLoading ? <p>読み込み中…</p> : <CommentList comments={comments} />}
      <h3>コメントを残す</h3>
      <CommentForm setComments={setComments} postId={postId} />
    </div>
  );
}
