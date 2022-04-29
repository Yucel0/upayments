import { useEffect, useRef, useState } from "react";
import { HttpRequest } from "http-client-request";
import { useNavigate } from "react-router-dom";

const request = new HttpRequest();

function Home() {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const currentCategoryName = useRef();
  const goToDetailPage = (item) => navigate(`/productDetail/${item.id}`);
  const goToAddProductPage = () => navigate(`/addProduct`);
  
  const changeCategory = (e) => {
    if (!e.target.firstChild.hasAttribute("disabled")) {
      e.target.firstChild.setAttribute("disabled", true);
    }
    if (e.target.value === "All") {
      request
        .get("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/")
        .then((res) => {
          setProduct(res.data);
        });
    } else {
      request
        .get("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/")
        .then((res) => {
          const filtered = res.data.filter(item => item.Category === e.target.value)
          setProduct(filtered);
        });
    }
  };

  useEffect(() => {
    request
      .get("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/")
      .then((res) => setProduct(res.data));

    request
      .get("https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/")
      .then((res) => setCategory(res.data));
  }, []);

  return (
    <>
      <section className="filter">
        <input
          type="text"
          name=""
          id=""
          placeholder="Apple Watch, Samsung S21, Macbook Pro..."
        />
        <div className="select-area">
          <select
            name=""
            id=""
            placeholder="categories"
            onChange={changeCategory}
            ref={currentCategoryName}
          >
            <option>Categories</option>
            <option>All</option>
            {category.map((ctrgy) => (
              <option key={ctrgy.id}>{ctrgy.name}</option>
            ))}
          </select>
          <span className="arrow"></span>
        </div>
      </section>
      <section
        className={`products ${
          product !== null && product.length === 0 ? "empty" : ""
        }`}
      >
        {product !== null && product.length > 0 ? (
          product.map((item, index) => (
            <div
              className="box"
              key={index}
              onClick={() => goToDetailPage(item)}
            >
              <div
                className="product-img"
              >
                <img src="" alt="" srcSet={item.avatar || item.Avatar} />
              </div>
              <div className="product-detail">
                <span className="product-name">{item.Name || item.name}</span>
                <span className="product-price">${item.price}</span>
              </div>
            </div>
          ))
        ) : product === null ? (
          <h1>Loading...</h1>
        ) : (
          product.length === 0 && (
            <h1>
              No products found in {currentCategoryName.current.value} category
            </h1>
          )
        )}
      </section>
      {product !== null && product.length > 0 && (
        <div className="add-new-todo" onClick={goToAddProductPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
          </svg>
        </div>
      )}
    </>
  );
}

export default Home;
