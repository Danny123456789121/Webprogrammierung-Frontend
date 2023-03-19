import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function Comments(props) {
    const type = props.pizza
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')
    const token = Cookies.get('token')

    useEffect(() => {
        fetch('http://localhost:8080/comments', {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log('comments fetch: ', data)
                setComments(data)
            })
            .catch((error) => {
                console.error('Error fetching comments:', error)
            })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const newComment = { text, token, type }
        fetch('http://localhost:8080/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                console.log('Comment saved successfully')
                setComments([...comments, newComment])
            })
            .catch((error) => {
                console.error('Error saving comment:', error)
            })
    }
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">Comments</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="border border-gray-400 rounded-l-lg py-2 px-4 w-full"
                        placeholder="Leave a comment..."
                    />
                    <button
                        type="submit"
                        className="bg-gray-700 text-white font-bold rounded-r-lg py-2 px-4"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {comments?.length === 0 &&
            comments.find((type) => type !== comments.type) ? (
                <p>No comments yet.</p>
            ) : (
                <ul className="list-disc ml-6">
                    {comments?.map((comment, index) => {
                        if (comment.type === type) {
                            let author
                            if (comment.token === Cookies.get('token')) {
                                author = <span className="font-bold">Me: </span>
                            } else {
                                author = (
                                    <span className="font-bold">
                                        {comment.token}:{' '}
                                    </span>
                                )
                            }
                            return (
                                <li key={index} className="mb-2">
                                    {author}
                                    <span className="whitespace-pre-wrap">
                                        {comment.text}{' '}
                                    </span>
                                </li>
                            )
                        }
                    })}
                </ul>
            )}
        </div>
    )
}

export default Comments
