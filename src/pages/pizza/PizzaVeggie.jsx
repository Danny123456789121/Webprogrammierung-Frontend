import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import usePageViewTracker from "../../hooks/usePageViewTracker.jsx";

const PizzaPaprika = () => {
    usePageViewTracker();
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState('');
    const type = "PizzaVeggie";
    useEffect(() => {
        fetch('http://localhost:8080/comments', {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("comments fetch: ", data);
                setComments(data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        const newComment = {
            text: input,
            token: token,
            type: type
        };

        fetch('http://localhost:8080/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: input,
                token: token,
                type: type
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Comment saved successfully');
                setComments([...comments, newComment]);
            })
            .catch(error => {
                console.error('Error saving comment:', error);
            });
    }
    console.log("comments2: ", comments)
    if (comments) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full lg:w-1/2 mb-4">
                        <h1 className="text-4xl font-bold mb-4">Pizza Veggie</h1>
                        <p className="text-lg mb-4">
                            This classic pizza features simple, fresh ingredients on a thin crust. It's easy to make and
                            perfect for any occasion.
                        </p>
                        <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
                        <ul className="list-disc ml-6 mb-4">
                            <li>1/2 pound pizza dough</li>
                            <li>1/2 cup tomato sauce</li>
                            <li>8 ounces fresh mozzarella cheese</li>
                            <li>6-8 fresh basil leaves</li>
                            <li>2 tablespoons olive oil</li>
                            <li>Salt and pepper to taste</li>
                        </ul>
                        <h2 className="text-2xl font-bold mb-2">Instructions</h2>
                        <ol className="list-decimal ml-6 mb-4">
                            <li>Preheat your oven to 450°F.</li>
                            <li>Roll out the pizza dough on a floured surface until it's about 1/4 inch thick.</li>
                            <li>Transfer the dough to a baking sheet or pizza stone.</li>
                            <li>Spread the tomato sauce evenly over the dough, leaving a small border around the
                                edges.
                            </li>
                            <li>Tear the mozzarella cheese into small pieces and scatter them over the tomato sauce.
                            </li>
                            <li>Arrange the basil leaves on top of the cheese.</li>
                            <li>Drizzle the olive oil over the pizza.</li>
                            <li>Season with salt and pepper to taste.</li>
                            <li>Bake for 10-15 minutes or until the crust is golden brown and the cheese is melted and
                                bubbly.
                            </li>
                            <li>Remove from the oven and let cool for a few minutes before slicing and serving.</li>
                        </ol>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <img src="src/assets/pizza/pizza6.jpg" alt="Margherita Pizza" className="w-full rounded-lg"/>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-2">Comments</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex mb-4">
                            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                                   className="border border-gray-400 rounded-l-lg py-2 px-4 w-full"
                                   placeholder="Leave a comment..."/>
                            <button type="submit"
                                    className="bg-gray-700 text-white font-bold rounded-r-lg py-2 px-4">Submit
                            </button>
                        </div>
                    </form>
                    {comments?.length === 0 && comments.find(type => type !== comments.type) ? (
                        <p>No comments yet.</p>
                    ) : (
                        <ul className="list-disc ml-6">
                            {comments?.map((comment, index) => {
                                if (comment.type === type) {
                                    let author;
                                    if (comment.token === Cookies.get("token")) {
                                        author = <span className="font-bold">Me: </span>;
                                    } else {
                                        author = <span className="font-bold">{comment.token}: </span>;
                                    }
                                    return (
                                        <li key={index} className="mb-2">
                                            {author}
                                            <span className="whitespace-pre-wrap">{comment.text} </span>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    )}
                </div>
            </div>
        );
    };
}
export default PizzaPaprika;
