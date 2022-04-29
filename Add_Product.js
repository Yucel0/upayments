import { useEffect, useRef, useState } from "react";
import { HttpRequest } from "http-client-request";
import { useNavigate } from "react-router-dom";

const request = new HttpRequest();

function Add_Product() {
  const [categoryList, setCategoryList] = useState([]);
  const productName = useRef() , description = useRef() , imgURL = useRef() , email = useRef() , category = useRef() , price = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g,"");
  }

  const changeCategory = (e) => {
    if (!e.target.firstChild.hasAttribute("disabled")) {
      e.target.firstChild.setAttribute("disabled", true);
    }
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g,"");
  }

  const postData = () => {
    [productName.current?.value,description.current?.value,imgURL.current?.value,email.current?.value,category.current?.value,price.current?.value].every(item => {
      if(item === ""){
        alert("Please fill in the blanks")
      }else {
        let newData = {
          Name: productName.current.value,
          Description: description.current.value,
          avatar: imgURL.current.value,
          DeveloperEmail: email.current.value,
          Category: category.current.value,
          price: Number(price.current.value)
        }
        request.post("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products",{
          body: request.toJSON(newData)
        }).then(res => {
          console.log(res.data);
          navigate(`/`);
        });
      }
    })
  };

  useEffect(() => {
    request
    .get("https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/")
    .then((res) => setCategoryList(res.data));
  },[])

  return (
    <section className="add-product">
      <h1>Create Product</h1>
      <div>
        <input
          type="text"
          name=""
          placeholder="Product name"
          ref={productName}
        />
        <textarea
          name=""
          cols="30"
          rows="10"
          placeholder="Description"
          ref={description}
        ></textarea>
        <input type="text" name="" placeholder="Image URL" ref={imgURL}/>
        <input type="text" name="" placeholder="E-Mail" ref={email}/>
        <select
            name=""
            id=""
            placeholder="categories"
            onChange={changeCategory}
            ref={category}
          >
            <option>Categories</option>
            {categoryList.map((ctrgy) => (
              <option key={ctrgy.id}>{ctrgy.name}</option>
            ))}
          </select>
        <span className="arrow"></span>
        <input type="text" name="" placeholder="Price" onChange={handleChange} ref={price}/>
        <button onClick={postData}>SUBMIT</button>
      </div>
    </section>
  );
}

export default Add_Product;