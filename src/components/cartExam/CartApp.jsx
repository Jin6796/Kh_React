import React, { useState } from "react"
import CartTents from "./CartTents"
import "../../css/tent.css"
import { Button } from "react-bootstrap"
import axios from "axios"
import CartAddForm from "./CartAddForm"
import products from "../../product"

const CartApp = (props) => {
  const [items, setItems] = useState([
    { id: 1, title: "텐트1", count: 0 },
    { id: 2, title: "텐트2", count: 0 },
    { id: 3, title: "텐트3", count: 0 },
  ])

  const [items2, setItems2] = useState(products)
  // console.log(items);

  // 수량 추가하기
  const cartPlus = (tent) => {
    const index = items.indexOf(tent)
    items[index].count += 1
    setItems([...items])
  }
  // 수량 차감하기
  const cartMinus = (tent) => {
    const index = items.indexOf(tent)
    const count = items[index].count - 1
    items[index].count = count < 0 ? 0 : count
    setItems([...items])
  }
  // 상품 삭제하기
  const cartDelete = (tent) => {
    const tents = items.filter((item) => item.id !== tent.id)
    setItems([...tents])
  }
  // 상품 추가하기
  const cartAdd = (tent) => {
    axios.get("/tents.json").then((result) => {
      const copy = [...items, ...result.data]
      setItems(copy)
    })
  }
  const inputCartAdd = (title) => {
    const tents = [...items, { id: Date.now(), title, count: 0 }]
    setItems([...tents])
  }
  return (
    <>
      <h3>연습문제</h3>
      <hr />
      <CartTents
        cartPlus={cartPlus}
        cartMinus={cartMinus}
        cartDelete={cartDelete}
        inputCartAdd={inputCartAdd}
        items={items}
      />
      <hr />
      현재 상품 목록 수는 {items.length}
      <br />
      현재 카트에 추가된 상품 수는{" "}
      {items.filter((item) => item.count > 0).length}
      <br />
      <Button onClick={cartAdd}>상품추가</Button>
    </>
  )
}

export default CartApp
