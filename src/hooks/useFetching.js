import { useState } from "react";


export function useFetching(callback) {

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [postError, setPostError] = useState('');

    const fetchingPosts = async () => {
        try {
            setIsPostsLoading(true)
            await callback()
        } catch (error) {
            setPostError(error.message)
        } finally {
            setIsPostsLoading(false)
        }
    }

    return [fetchingPosts, isPostsLoading, postError]

}