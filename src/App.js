import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "./assets/fonts.css";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  // console.log("useEffect");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-backend-jasmine.herokuapp.com/"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading === true ? (
        <h1>Loading</h1>
      ) : (
        <>
          <header>
            Deliveroo
            {/* <img src="" alt="" /> */}
          </header>

          <section className="banner">
            <div className="banner-left">
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>

            <div className="banner-right">
              <img
                className="banner-pic"
                src={data.restaurant.picture}
                alt=""
              />
            </div>
          </section>

          <section className="container1">
            <div className="container2">
              <div className="category-left">
                {data.categories.map((category, index) => {
                  return (
                    category.meals.length > 0 && (
                      <div key={index} className="category">
                        <h2>{category.name}</h2>

                        <div className="meals-container">
                          {category.meals.map((meal, index) => {
                            // console.log(meal.picture);
                            return (
                              <div
                                key={index}
                                className="item"
                                onClick={() => {
                                  // console.log(meal);
                                  const newBasket = [...basket];
                                  // ⬇︎ ajouter une clé quantity dans mon obj meal
                                  meal.quantity = 1;

                                  newBasket.push(meal);
                                  setBasket(newBasket);
                                }}
                              >
                                <div className="item-text">
                                  <h3>{meal.title}</h3>
                                  <p>{meal.description}</p>
                                  <span>{meal.price}</span>
                                  <span>
                                    {meal.popular && (
                                      <p style={{ color: "orange" }}>
                                        Populaire
                                      </p>
                                    )}
                                  </span>
                                </div>

                                <div className="item-image">
                                  {meal.picture && (
                                    <img src={meal.picture} alt="" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>

              <div className="basket">
                {basket.map((mealBasket, index) => {
                  console.log(mealBasket);
                  return (
                    <div key={index}>
                      <p>{mealBasket.quantity}</p>
                      <p>{mealBasket.title} </p>
                      <p>{mealBasket.price} €</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
