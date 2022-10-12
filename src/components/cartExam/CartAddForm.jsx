import React from 'react';

const CartAddForm = (props) => {
  const formRef = React.createRef();
  const inputRef = React.createRef();

  // onSubmit의 특징때문에 버블링이 일어날 수 있어
  // 이를 막기 위해 preventDefault 함수를 호출해야 함
  const onSubmit = event => {
    event.preventDefault();
    const title = inputRef.current.value;
    title && props.inputCartAdd(title);
    formRef.current.reset();
  }
  return (
    // 외부에서 접근할 수 있도록 ref값을 주기
    <form ref={formRef} onSubmit={onSubmit}>
      <input ref={inputRef} type="text" placeholder="상품추가" />
      <button>Add</button>
    </form>
  );
}

export default CartAddForm;