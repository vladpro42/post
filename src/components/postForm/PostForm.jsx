import React from "react"
import { useState } from "react"
import { Input } from "../UI/input/Input"
import { Button } from "../UI/button/Button"

const PostForm = ({ create }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            id: Date.now(),
            title,
            description
        }

        create(newPost)
        setTitle("")
        setDescription("")
    }

    return <form onSubmit={e => addNewPost(e)} className="post__form">
        <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="title"
        />
        <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="description"
        />
        <Button
            disabled={false}
        >Создать
        </Button>
    </form>

}

export { PostForm }