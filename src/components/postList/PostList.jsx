import { CSSTransition, TransitionGroup } from "react-transition-group"
import { PostItem } from "../post/PostItem"


export const PostList = ({ posts, remove }) => {

    if (!posts.length) {
        return <h2>No posts</h2>
    }

    return <div>
        <TransitionGroup>
            {
                posts.map(post => <CSSTransition key={post.id} classNames={"post"} timeout={500}>
                    <PostItem remove={remove} post={post} />
                </CSSTransition>)
            }
        </TransitionGroup>
    </div>
}
