

export const PostItem = ({ post}) => {
    return <div className="post">
        <div className="post__content">
            <strong>{post.id}. {post.title}</strong>
            <p>{post.description}</p>
        </div>
        <div className="post__btn">
            <button>Delete</button>
        </div>
    </div>
}