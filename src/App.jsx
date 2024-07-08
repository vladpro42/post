import { useEffect, useState } from "react";
import "./App.css"
import { PostList } from "./components/postList/PostList";
import { PostForm } from "./components/postForm/PostForm";
import { PostFilter } from "./components/postFilter/PostFilter";
import { Modal } from "./components/UI/modal/Modal";
import { Button } from "./components/UI/button/Button";
import { usePosts } from "./hooks/usePosts";
import PostServis from "./API/PostService";
import { Loader } from "./components/UI/loader/Loader";
import { useFetching } from "./hooks/useFetching";


function App() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [visible, setVisible] = useState(false)


    let [fetchingPosts, isPostsLoading, postError] = useFetching(async () => {
        const posts = await PostServis.getAll()
        setPosts(posts)
    })

    function createPost(post) {
        setPosts([...posts, post])
        setVisible(false)
    }

    function removePost(id) {
        setPosts(posts.filter(post => post.id !== id))
    }

    useEffect(() => {
        fetchingPosts()
    }, [])





    return (
        <div className="App">

            <Modal visible={visible} setVisible={() => setVisible(!visible)}>
                <PostForm create={createPost} />
            </Modal>

            <Button onClick={() => setVisible(true)}>Create posts</Button>

            <hr />
            <div>
                <PostFilter filter={filter} setFilter={setFilter} />
            </div>
            {
                postError && <h1>Error ${postError}</h1>
            }

            {
                isPostsLoading ? <Loader /> : <PostList posts={sortedAndSearchedPosts} remove={removePost} />
            }


        </div>
    );
}

export default App;

