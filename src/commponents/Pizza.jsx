import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

function Pizza() {
    const [favorites, setFavorites] = useState([]);
    const token = Cookies.get('token');

    const pizzas = [
        {
            id: 1,
            name: "Paprika",
            image: "src/assets/pizza/PizzaPaprika.jpg",
            link: "pizzaPaprika",
        },
        {
            id: 2,
            name: "Mozzarella",
            image: "src/assets/pizza/PizzaMozzarella.jpg",
            link: "pizzaMozzarella",
        },
        {
            id: 3,
            name: "Rucola",
            image: "src/assets/pizza/PizzaRucola.jpg",
            link: "pizzaRucola",
        },
        {
            id: 4,
            name: "Orientalisch",
            image: "src/assets/pizza/PizzaOrientalisch.jpg",
            link: "pizzaOrientalisch",
        },
        {
            id: 5,
            name: "Salami",
            image: "src/assets/pizza/PizzaSalami.jpg",
            link: "pizzaSalami",
        },
        {
            id: 6,
            name: "Veggie",
            image: "src/assets/pizza/PizzaVeggie.jpg",
            link: "pizzaVeggie",
        }
    ];

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await fetch("http://localhost:8080/favorites?token="+token);
            const data = await response.json();
            setFavorites(data);
        };
        fetchFavorites();
    }, []);

    const isFavorite = (pizza) => {
        return favorites.some((fav) => fav.pizzaId === pizza.id);
    };

    const handleFavorite = async (pizza) => {
        if (isFavorite(pizza)) {
            const newFavorites = favorites.filter((fav) => fav.pizzaId !== pizza.id);
            setFavorites(newFavorites);
            console.log('Updated favorites:', newFavorites);
            await removeFavoritePizza(pizza.id, token);
        } else {
            const newFavorite = { pizzaId: pizza.id };
            setFavorites([...favorites, newFavorite]);
            console.log('Updated favorites:', [...favorites, newFavorite]);
            await addFavoritePizza(pizza.id, token);
        }
    };

    const removeFavoritePizza = async (pizzaId, token) => {
        await fetch("http://localhost:8080/favorites?token="+token+"&pizzaId="+pizzaId, {
            method: 'DELETE',
        });
    };

    const addFavoritePizza = async (pizzaId, token) => {
        await fetch('http://localhost:8080/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                pizzaId: pizzaId
            }),
        });
    };

    return (
        <div>
            <h1 className="text-4xl text-center font-bold mt-20 mb-5">Pizza</h1>
            <div className="flex flex-nowrap space-x-5 ml-10 overflow-x-auto overflow-y-hidden">
                {pizzas.map((pizza) => (
                    <div key={pizza.name} className="flex-shrink-0">
                        <Link to={pizza.link}>
                            <img
                                src={pizza.image}
                                alt={pizza.name}
                                className="w-80 h-72 text-center object-cover drop-shadow-xl rounded-2xl"
                            />
                        </Link>
                        <div className="flex justify-center space-x-20">
                            <p className="font-sans text-center text-xl">{pizza.name}</p>
                            <span
                                className={`text-3xl cursor-pointer align-baseline -mt-1 ${
                                    isFavorite(pizza) ? "text-yellow-500" : "text-gray-400"
                                }`}
                                onClick={() => handleFavorite(pizza)}
                            >
                        ★
                        </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Pizza;
