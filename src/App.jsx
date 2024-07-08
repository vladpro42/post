import "./App.css"

import { useEffect, useState } from "react";
import { PostList } from "./components/postList/PostList";
import { PostForm } from "./components/postForm/PostForm";
import { PostFilter } from "./components/postFilter/PostFilter";
import { Modal } from "./components/UI/modal/Modal";
import { Button } from "./components/UI/button/Button";
import { usePosts } from "./hooks/usePosts";
import PostServis from "./API/PostService";
import { Loader } from "./components/UI/loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount } from "./utils/pages";
import { Pagination } from "./components/UI/pagination/Pagination";


function App() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [visible, setVisible] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [limitPage, setLimitPage] = useState(10)


    let [fetchingPosts, isPostsLoading, postError] = useFetching(async () => {
        const res = await PostServis.getAll(limitPage, currentPage)
        setPosts(res.data)
        const totalCount = res.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limitPage))
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
    }, [currentPage])


    function handlePageChange(page) {
        setCurrentPage(page)
    }




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

            <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />

        </div >
    );
}

export default App;

