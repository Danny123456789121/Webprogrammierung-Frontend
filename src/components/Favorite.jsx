import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function Favorite(props) {
    const pizzaType = props.pizzaType
    const [favorite, setFavorite] = useState()
    const token = Cookies.get('token')

    useEffect(() => {
        const fetchFavorite = async () => {
            const response = await fetch(
                'http://localhost:8080/favorite?token=' +
                    token +
                    '&pizzaType=' +
                    pizzaType
            )
            const data = await response.json()
            setFavorite(data.isFavorite)
        }
        fetchFavorite()
    }, [])

    const handleFavorite = async () => {
        if (favorite) {
            await removeFavoritePizza()
        } else {
            await addFavoritePizza()
        }
    }

    const removeFavoritePizza = async () => {
        setFavorite(false)
        await fetch(
            'http://localhost:8080/favorite?token=' +
                token +
                '&pizzaType=' +
                pizzaType,
            {
                method: 'DELETE',
            }
        )
    }

    const addFavoritePizza = async () => {
        setFavorite(true)
        await fetch('http://localhost:8080/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, pizzaType }),
        })
    }

    return (
        <span
            className={`text-3xl cursor-pointer align-baseline -mt-1 ${
                favorite ? 'text-yellow-500' : 'text-gray-400'
            }`}
            onClick={handleFavorite}
        >
            ★
        </span>
    )
}
export default Favorite
