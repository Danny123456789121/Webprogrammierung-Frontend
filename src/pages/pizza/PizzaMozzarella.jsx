import React, { useEffect } from 'react'
import usePageViewTracker from '../../usePageViewTracker.jsx'
import pizzas from '@assets/pizzas.json'
import Comments from '../../commponents/Comments.jsx'

const PizzaMozzarella = () => {
    const type = 'Mozzarella'
    useEffect(() => {
        usePageViewTracker(type)
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-between">
                <div className="w-full lg:w-1/2 mb-4">
                    <h1 className="text-4xl font-bold mb-4">
                        {pizzas[type].name}
                    </h1>
                    <p className="text-lg mb-4">
                        This classic pizza features simple, fresh ingredients on
                        a thin crust. It's easy to make and perfect for any
                        occasion.
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
                        <li>
                            Roll out the pizza dough on a floured surface until
                            it's about 1/4 inch thick.
                        </li>
                        <li>
                            Transfer the dough to a baking sheet or pizza stone.
                        </li>
                        <li>
                            Spread the tomato sauce evenly over the dough,
                            leaving a small border around the edges.
                        </li>
                        <li>
                            Tear the mozzarella cheese into small pieces and
                            scatter them over the tomato sauce.
                        </li>
                        <li>Arrange the basil leaves on top of the cheese.</li>
                        <li>Drizzle the olive oil over the pizza.</li>
                        <li>Season with salt and pepper to taste.</li>
                        <li>
                            Bake for 10-15 minutes or until the crust is golden
                            brown and the cheese is melted and bubbly.
                        </li>
                        <li>
                            Remove from the oven and let cool for a few minutes
                            before slicing and serving.
                        </li>
                    </ol>
                </div>
                <div className="w-full lg:w-1/2">
                    <img
                        src={pizzas[type].image}
                        alt={pizzas[type].name}
                        className="w-full rounded-lg"
                    />
                </div>
            </div>
            <Comments pizza={type} />
        </div>
    )
}
export default PizzaMozzarella
