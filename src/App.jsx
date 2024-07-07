import { useState } from "react";
import "./App.css"
import { PostList } from "./components/postList/PostList";
import { Button } from "./components/UI/button/Button";
import { Input } from "./components/UI/input/Input";

function App() {

    const [posts, setPosts] = useState([
        { id: 1, title: 'title', description: 'description' },
        { id: 2, title: 'title2', description: 'description2' }
    ])

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    console.log(title, description)


    const addNewPost = (e) => {
        e.preventDefault()
        setPosts(prev => [...prev, { id: Date.now(), title, description }])
        setTitle("")
        setDescription("")
    }

    return (
        <div className="App">

            <form onSubmit={e => addNewPost(e)} className="post__form">
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

            <PostList posts={posts} />

        </div>
    );
}

export default App;

