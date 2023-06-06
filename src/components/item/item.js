import { Link } from "react-router-dom"

const Item = ({ data, addToCart }) => {
    const addCart=(id)=>{
        console.log("hi aman")
        data={userId:1,prodId:id,quantity:1}
        const res = fetch("http://localhost:8081/api/carts/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          console.log(data)
        const result = res.json()
        console.log(result);
    }

    const { prodId, imgUrl, prodName, price } = data

    return (
        <div className="card">
            <div className="grid">
                <div className="image">
                    <img src={imgUrl} alt="" />
                </div>
                <div className="title">
                    <Link to={`/product/${prodId}`} className="link titleLink">
                        {prodName}
                    </Link>
                </div>
                <div className="flex">
                    <span className="price" style={{ marginRight: 15 }}>
                    ₹{price}
                    </span>
                    <div className="cart" onClick={()=>addCart(prodId)}>
                        <img className="cartImg" src="/cart.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Item }