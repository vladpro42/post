import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostServis from "../API/PostService";
import { Loader } from "../components/UI/loader/Loader";

function PostIdPage() {
    const { id } = useParams()



    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])


    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostServis.getById(id)
        setPost(response.data)
    })

    const [fetchComments, isLoadingComments, errorComments] = useFetching(async () => {
        const response = await PostServis.getCommentById(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById()
        fetchComments()
    }, [])

    if (error) {
        return <Navigate to={'/'} />
    }

    return <div>
        <h1>Hello world! {id}</h1>

        {isLoading ? <Loader /> : <div>
            <h1>{post.id}. {post.title}</h1>
            <p>{post.body}</p>
        </div >}

        <h3>
            Комментарии
        </h3>

        <ul>
            {
                isLoadingComments ?
                    <Loader /> :
                    comments.map(comment => <li
                        style={{ marginTop: '30px', maxWidth: 450 }}
                        key={comment.id}
                    >
                        <h3>{comment.email}</h3>
                        {comment.body}
                    </li>)
            }
        </ul>
    </div>
}

export default PostIdPage;