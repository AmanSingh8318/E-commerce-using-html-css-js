const bar = document.querySelector('#bar');
const nav = document.querySelector('#navbar');
const cut = document.querySelector('#cut');
const cartremove = document.querySelector('#lg-remove');
const cartopen=document.getElementById('cart');
let emptyCart=document.querySelector("#empty");
let sub_cart=document.getElementById('cart-subtotal')
let subtotal=0;
let price=0;
let quantity=0;
if (bar) {
  bar.addEventListener('click', function() {
    nav.classList.add('active');
    cartremove.style.display = "none";
    bar.style.display = "none";
  });
}

if (cut) {
  cut.addEventListener('click', function() {
    nav.classList.remove('active');
    bar.style.display = "flex";
  });
}

// Cart section
const cartButtons = document.querySelectorAll('.cart .fa-solid.fa-cart-shopping');

cartButtons.forEach(msg=>{
  msg.addEventListener('click', function(){
    alert("Item Added To the Cart !")
    })
})
cartButtons.forEach(button => {
  const product = button.closest('.feature');

  button.addEventListener('click', function() {
    const producutname = product.querySelector('.desc h6')?.textContent;
    const productPrice = product.querySelector('.cart span')?.textContent;
    const productImage = product.querySelector('img')?.src;

    const cartItem = {
      name: producutname,
      price: productPrice,
      image: productImage,
      quantity: 1
    };

    console.log(cartItem);
    // calling to the add cart
    addToCartItem(cartItem);
  });
});

function addToCartItem(cartItem) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  console.log("addcart log", cartItems);
  // Assuming 'price' and 'quantity' are numbers
  const existingItem = cartItems.find(item => 
    item.name === cartItem.name && 
    item.price === cartItem.price && 
    item.image === cartItem.image
  );

  if (existingItem) {
    
    existingItem.quantity+=1;
    existingItem.price+=quantity*price;
  } else {
    cartItems.push({
      ...cartItem,
      quantity: 1,
      price: cartItem.price,
    });
  }
  // save to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

document.addEventListener('DOMContentLoaded', function() {
  const cartList = document.getElementById('cart-list');
  updateCartItem();
});

function updateCartItem() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartList = document.getElementById('cart-list');
  
  if (cartItems.length===0) {

    emptyCart.style.display="block"
    sub_cart.style.display="none";
  
  } else {
    // cartList.innerHTML = '';

    cartItems.forEach((item) => {

      const itemHtml = `
        <li>
          <img src="${item.image}" alt="${item.name}">
          <span class="item-name">${item.name}</span>
          <span class="item-quantity"> &nbsp Quantity:-${item.quantity}</span>
          <span class="item-price">&nbsp Price:-${item.price}</span>
<span> &nbsp &nbsp &nbsp<i class="fas fa-trash-alt"></i></span></li>
      `;
      cartList.innerHTML += itemHtml; 
    });

     subtotal = cartItems.reduce((acc, item) => {
       price = parseFloat(item.price.replace(/[^\d\.]/g, '')) || 0;// converted dollar to inr
       quantity = parseInt(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
 sub_cart.textContent = `Subtotal: ${subtotal.toFixed(2)}`;

  }
}

cartopen.addEventListener('click',function(){
  window.location.href='cart.html'
})

// adding class active to each navitems
function toggle(event)
{
  const navItems=document.querySelectorAll('#navbar li')
  navItems.forEach(item => item.classList.remove('active'));
  event.target.parentElement.classList.add('active');
}
// adding the billing information

function HandleMsg(){
  
  let btn=document.querySelector('button');
btn.addEventListener("click",()=>{
  btn.disabled=true;
  setTimeout(() => {
    btn.disabled=false;
    btn.textContent=" Order Placed Successfully !";
    btn.style.backgroundColor="#d35454"

  }, 2000);
        setTimeout(() => {
          window.location.href="shop.html"
        }, 5000);
})

}

HandleMsg();

function checkOut(){
  let name=document.getElementsByClassName('name');
  console.log(name);
  window.location.href="checkout.html"
};


