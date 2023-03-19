import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

function visits() {
    const [favorites, setFavorites] = useState([]);
    const token = Cookies.get('token');
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/top3?token=' + token, {
            method: 'GET',

        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                console.log("Visits fetch: ", data);
                setVisits(data);
            })
            .catch(error => {
                console.error('Error fetching Visits:', error);
            });
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await fetch("http://localhost:8080/favorites?token=" + token);
            const data = await response.json();
            setFavorites(data);
        };
        fetchFavorites();
    }, []);

    const isFavorite = (visits) => {
        return favorites.some((fav) => fav.visitsId === visits.id);
    };

    const handleFavorite = async (visits) => {
        if (isFavorite(visits)) {
            const newFavorites = favorites.filter((fav) => fav.pizzaId !== visits.id);
            setFavorites(newFavorites);
            console.log('Updated favorites:', newFavorites);
            await removeFavoritePizza(visits.id, token);
        } else {
            const newFavorite = {visitsId: visits.id};
            setFavorites([...favorites, newFavorite]);
            console.log('Updated favorites:', [...favorites, newFavorite]);
            await addFavoritePizza(visits.id, token);
        }
        visits.sort((a, b) => b.count - a.count);

    };

    const removeFavoritePizza = async (pizzaId, token) => {
        await fetch("http://localhost:8080/favorites?token=" + token + "&pizzaId=" + pizzaId, {
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
            <h1 className="text-4xl text-center font-bold mt-20 mb-5">Top 3</h1>
            <div className="flex flex-nowrap space-x-5 ml-10 overflow-x-auto overflow-y-hidden">
                {visits.length ? (
                    visits.map((visits) => (
                        <div key={"most_" + visits.page} className="flex-shrink-0">
                            <Link to={visits.page}>
                                <img
                                    src={"src/assets/pizza/" + visits.img}
                                    alt={visits.page}
                                    className="w-80 h-72 text-center object-cover drop-shadow-xl rounded-2xl"
                                />
                            </Link>
                            <div className="flex justify-center space-x-20">
                                <p className="font-sans text-center text-xl">{visits.page}</p>
                                <span
                                    className={`text-3xl cursor-pointer align-baseline -mt-1 ${
                                        isFavorite(visits) ? "text-yellow-500" : "text-gray-400"
                                    }`}
                                    onClick={() => handleFavorite(visits)}
                                >
                        ★
                        </span>
                            </div>
                        </div>
                    ))) : (
                    <h1 className="text-2xl text-center font-bold mt-20 mb-5">Nothing here yet</h1>
                )}
            </div>
        </div>
    );
}

export default visits;
