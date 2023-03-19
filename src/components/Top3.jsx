import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pizzas from '@assets/pizzas.json'
import Cookies from 'js-cookie'
import Favorite from './Favorite'

function Top3() {
    const token = Cookies.get('token')
    const [top3, setTop3] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/top3?token=' + token, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log('Visits fetch: ', data)
                data.sort((a, b) => b.count - a.count)
                setTop3(data)
            })
            .catch((error) => {
                console.error('Error fetching Visits:', error)
            })
    }, [])

    return (
        <div>
            <h1 className="text-4xl text-center font-bold mt-20 mb-5">Top 3</h1>
            <div className="flex flex-nowrap space-x-5 ml-10 overflow-x-auto overflow-y-hidden">
                {top3.length ? (
                    top3.map((visit) => (
                        <div
                            key={'most_' + visit.pizzaType}
                            className="flex-shrink-0"
                        >
                            <Link to={pizzas[visit.pizzaType].link}>
                                <img
                                    src={pizzas[visit.pizzaType].image}
                                    alt={pizzas[visit.pizzaType].name}
                                    className="w-80 h-72 text-center object-cover drop-shadow-xl rounded-2xl"
                                />
                            </Link>
                            <div className="flex justify-center space-x-20">
                                <p className="font-sans text-center text-xl">
                                    {pizzas[visit.pizzaType].name}
                                </p>
                                <Favorite pizzaType={visit.pizzaType} />
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-2xl text-center font-bold mt-20 mb-5">
                        Nothing here yet
                    </h1>
                )}
            </div>
        </div>
    )
}

export default Top3
