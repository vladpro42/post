import { memo, useMemo, useState } from "react";
import "./App.css"
import { PostList } from "./components/postList/PostList";
import { PostForm } from "./components/postForm/PostForm";
import { PostFilter } from "./components/postFilter/PostFilter";
import { Modal } from "./components/UI/modal/Modal";
import { Button } from "./components/UI/button/Button";

function App() {

    const [posts, setPosts] = useState([
        { id: 1, title: 'title', description: 'description' },
        { id: 2, title: 'title2', description: 'description2' }
    ])

    function createPost(post) {
        setPosts([...posts, post])
        setVisible(false)
    }

    function removePost(id) {
        setPosts(posts.filter(post => post.id !== id))
    }

    const [filter, setFilter] = useState({ sort: '', query: '' })

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return posts.toSorted((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const [visible, setVisible] = useState(false)

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
            <PostList posts={sortedAndSearchedPosts} remove={removePost} />
        </div>
    );
}

export default App;

