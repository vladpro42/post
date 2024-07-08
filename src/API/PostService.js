import axios from "axios"

class PostServis {
    static async getAll() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        return response.data
    }
}

export default PostServis