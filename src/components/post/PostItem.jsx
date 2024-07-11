import { useNavigate } from "react-router-dom"

export const PostItem = ({ post, remove }) => {

    const nav = useNavigate()

    function handleClick() {
        nav(`/posts/${post.id}`)
    }


    return <div className="post">
        <div className="post__content">
            <strong>{post.id}. {post.title}</strong>
            <p>{post.body}</p>
        </div>
        <div className="post__btn">
            <button onClick={handleClick}>Открыть</button>
            <button onClick={() => remove(post.id)}>Delete</button>
        </div>
    </div>
}