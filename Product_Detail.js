import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HttpRequest } from "http-client-request";

const request = new HttpRequest();

export default function Product_Detail() {
  const [detail, setDetail] = useState({});
  const { id } = useParams();
  useEffect(() => {
    request
      .get(
        `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`
      )
      .then((res) => setDetail(res.data));
  }, []);
  return (
    <section className="products">
      {detail.name !== undefined ? (
        <>
          <div className="product-info">
            <div className="box">
              <div className="product-img">
                <img src="" alt="" srcSet={detail.avatar || detail.Avatar} />
              </div>
            </div>
            <div className="product-detail">
              <span className="product-name">{detail.Name || detail.name}</span>
              <span>{detail.category}</span>
              <span>{detail.id}</span>
              <span>${detail.price}</span>
            </div>
          </div>
          <div className="product-desc">
            <span className="title">Description</span>
            <p>{detail.description}</p>
          </div>
        </>
      ) : (
        <h1>Loading..</h1>
      )}
    </section>
  );
}
