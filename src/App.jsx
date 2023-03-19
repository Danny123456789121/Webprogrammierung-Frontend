import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./commponents/Navbar.jsx";
import Pizza from "./commponents/Pizza.jsx";
import {useEffect} from "react";
import PizzaPaprika from "./pages/pizza/PizzaPaprika.jsx";
import PizzaMozzarella from "./pages/pizza/PizzaMozzarella.jsx";
import PizzaRucola from "./pages/pizza/PizzaRucola.jsx";
import PizzaOrientalisch from "./pages/pizza/PizzaOrientalisch.jsx";
import PizzaSalami from "./pages/pizza/PizzaSalami.jsx";
import PizzaVeggie from "./pages/pizza/PizzaVeggie.jsx";


function App() {

    const token = "";

    useEffect(() => {
        fetch("http://localhost:8080/login", {
            method: "GET", credentials: "include",
        }).then(response => {
            if (response.ok) {
            }
        });
    }, [token]);

    return (<div className="">
            <BrowserRouter>
                <Switch>
                    <Route exact path={["/", "/index.html"]}>
                        <Navbar/>
                        <div className="flex flex-col space-y-10 z-10 ">
                            <Pizza/>
                        </div>
                    </Route>
                    <Route path="/pizzaPaprika">
                        <PizzaPaprika/>
                    </Route>
                    <Route path="/pizzaMozzarella">
                        <PizzaMozzarella/>
                    </Route>
                    <Route path="/pizzaRucola">
                        <PizzaRucola/>
                    </Route>
                    <Route path="/pizzaOrientalisch">
                        <PizzaOrientalisch/>
                    </Route>
                    <Route path="/pizzaSalami">
                        <PizzaSalami/>
                    </Route>
                    <Route path="/pizzaVeggie">
                        <PizzaVeggie/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>);
}

export default App;
