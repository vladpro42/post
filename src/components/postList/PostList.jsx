import { PostItem } from "../post/PostItem"


export const PostList = ({ posts }) => {


    return <div>
        {posts.map(post => <PostItem post={post} key={post.id} />)}
    </div>
}
