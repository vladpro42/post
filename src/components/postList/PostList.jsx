import { PostItem } from "../post/PostItem"


export const PostList = ({ posts, remove }) => {

    if (!posts.length) {
        return <h2>No posts</h2>
    }

    return <div>
        {posts.map(post => <PostItem remove={remove} post={post} key={post.id} />)}
    </div>
}
