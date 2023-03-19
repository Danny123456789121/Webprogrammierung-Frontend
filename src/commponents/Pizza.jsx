import { Link } from 'react-router-dom'
import Favorite from './Favorite'

import pizzas from '@assets/pizzas.json'

function Pizza() {
    return (
        <div>
            <h1 className="text-4xl text-center font-bold mt-20 mb-5">Pizza</h1>
            <div className="flex flex-nowrap space-x-5 ml-10 overflow-x-auto overflow-y-hidden">
                {Object.keys(pizzas).map((type, index) => (
                    <div key={index} className="flex-shrink-0">
                        <Link to={pizzas[type].link}>
                            <img
                                src={pizzas[type].image}
                                alt={pizzas[type].name}
                                className="w-80 h-72 text-center object-cover drop-shadow-xl rounded-2xl"
                            />
                        </Link>
                        <div className="flex justify-center space-x-20">
                            <p className="font-sans text-center text-xl">
                                {pizzas[type].name}
                            </p>
                            <Favorite pizzaType={type} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pizza
