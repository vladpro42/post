import "../App.css"

import { useEffect, useRef, useState } from "react";
import { PostList } from "../components/postList/PostList";
import { PostForm } from "../components/postForm/PostForm";
import { PostFilter } from "../components/postFilter/PostFilter";
import { Modal } from "../components/UI/modal/Modal";
import { Button } from "../components/UI/button/Button";
import { usePosts } from "../hooks/usePosts";
import PostServis from "../API/PostService";
import { Loader } from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { Pagination } from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import { Select } from "../components/UI/select/Select";


function Posts() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [visible, setVisible] = useState(false)

    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [limitPage, setLimitPage] = useState(10)
    const [maxPage, setMaxPage] = useState(0)

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef(null)


    let [fetchingPosts, isPostsLoading, postError] = useFetching(async () => {
        const res = await PostServis.getAll(limitPage, currentPage)
        setPosts([...posts, ...res.data])
        const totalCount = res.headers['x-total-count']
        setMaxPage(+totalCount)
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
        setTotalPages(getPageCount(maxPage, limitPage))
    }, [limitPage])

    useEffect(() => {
        fetchingPosts(limitPage, currentPage)
    }, [currentPage, limitPage])

    useObserver(lastElement, currentPage < totalPages, isPostsLoading, () => setCurrentPage(currentPage + 1))


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
                <Select
                    value={limitPage}
                    onChange={(value) => setLimitPage(value)}
                    defaultValue={'Количество элементов на странице'}
                    options={[
                        { value: 5, name: '5' },
                        { value: 10, name: '10' },
                        { value: 25, name: '25' },
                        { value: -1, name: 'Показать все' },
                    ]} />

            </div>

            {
                postError && <h1>Error ${postError}</h1>
            }
            <PostList posts={sortedAndSearchedPosts} remove={removePost} />
            {
                isPostsLoading && <Loader />
            }
            <div ref={lastElement}>I am</div>

            {
                totalPages > 1 && <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />
            }

        </div >
    );
}

export default Posts;

