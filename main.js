const cardContainer = document.getElementById("cards");
const cardQuantity = document.getElementById("basket-count");
const basketItem = document.getElementById("icon");
const allItem = document.getElementById("all-item");
const cardList = document.getElementById("card-list");
const cardSection = document.getElementById("card-section");
const closeBtn = document.getElementById("close");
const cardBtn = document.querySelector("button");
const totalPrice = document.getElementById("total");


data.map((item) =>{
    const cardDiv = document.createElement("div");
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
        <div class="card-img">
            <img src="${item.image}" alt="">
        </div>
        <div class="card-body">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
        </div>
        <button onclick="addToCart(${item.id})" class="btn">Add To Cart</button>
    `
    cardContainer.appendChild(cardDiv);
})

const basket = [];
let count = 0;
const addToCart = (id) =>{
    const totalPriceText = totalPrice.innerText;
    const totalPriceNumber = parseInt(totalPriceText);
    const search = basket.find(item => item.id === id);
    if(search === undefined){
        basket.push({
            id: id
        })
    }
    else{
        alert("This item already added to cart");
        return 
    }
    cardQuantity.innerText = basket.length;
    if(basket.length !== 0){
        basket.map(item =>{
            const match = data.filter(product => product.id === item.id)
            let price = match[0].price
            price = price + totalPriceNumber
            totalPrice.innerText = price
       })
       
    }
    let card = count + 1;
    cartItems(id,card);   
    itemPrice(id)
}

const itemPrice = (id) =>{
    const search = basket.find(item => item.id === id);
    let total = [];
    data.forEach(item =>{
        if(item.id === search.id){
            total.push(item.price);
        }
    })
}

const cartItems = (id, card) =>{
    data.map(item =>{
        const {image, name, price} = item;
        const list = document.createElement('li');
        list.classList.add('item');
            
        if(item.id === id){
            list.innerHTML = `
                <div class="item-img">
                    <img src="${image}" alt="">
                    <h3>${name}</h3>
                </div>
                <div class="item-price" id="${id}">${price}</div>
                <div class="item-quantity">
                    <a onclick="decrement(this)" id="${id}"><i class="fa-solid fa-minus"></i></a>
                    <p>${card}</p>
                    <a onclick="increment(this)" id="${id}"><i class="fa-solid fa-plus"></i></a>
                </div>
            `
            cardList.appendChild(list);
        }
    })
}

const increment = (e) =>{
    const cartItem = e.parentElement.children[1];
    const cartString = cartItem.innerText;
    const cartItemNumber = parseInt(cartString);

    const totalPriceText = totalPrice.innerText;
    const totalPriceNumber = parseInt(totalPriceText);
    
    const itemPrice = e.parentElement.parentElement.children[1];
    const itemPriceID = parseInt(itemPrice.id);

    const search = data.find(item => item.id === itemPriceID)
    let price = search.price;

    const total = price * (cartItemNumber+1);
    itemPrice.innerText = total;

    cartItem.innerText = cartItemNumber + 1;
    itemsTotalPrices(e);

    price = price + totalPriceNumber
    totalPrice.innerText = price
}

const decrement = (e) =>{
    const cartItemText = e.parentElement.children[1];
    const cartString = cartItemText.innerText;
    const cartItemNumber = parseInt(cartString);

    const totalPriceText = totalPrice.innerText;
    const totalPriceNumber = parseInt(totalPriceText);

    const cardString = cardQuantity.innerText;
    const cardNumber = parseInt(cardString);
    const buttonID = parseInt(e.id)

    const itemPrice = e.parentElement.parentElement.children[1];
    const itemPriceID = parseInt(itemPrice.id);

    const search = data.find(item => item.id === itemPriceID)
    let price = search.price;

    const priceNumber = parseInt(itemPrice.innerText);
    const totalItemPrices = priceNumber - price
    itemPrice.innerText = totalItemPrices;

    if(cartItemNumber-1 === 0){
        const list = e.parentElement.parentElement;
        list.remove();

        const index = basket.findIndex(p => (p.id === buttonID)); 
        basket.splice(index, 1);   
        cardQuantity.innerText = cardNumber - 1;   
    }
    else if(cartItemNumber !== 0){
        cartItemText.innerText = cartItemNumber - 1;
        itemsTotalPrices(e);
    }

    price = totalPriceNumber - price
    totalPrice.innerText = price
    //console.log(totalPriceNumber, price)
}

const itemsTotalPrices = (e) =>{
    const totalPrices = parseInt(totalPrice.innerText);
    const itemPrice = e.parentElement.parentElement.children[1];
    const itemPricesNumber = parseInt(itemPrice.innerText);
    
    // const itemPriceID = parseInt(itemPrice.id);
    // const buttonID = parseInt(e.id)
    // let total = 0;
    // basket.forEach(item =>{
    //     console.log(item,itemPriceID)
    //     if(item.id === itemPriceID){
    //         const search = data.find(item => item.id === itemPriceID)
    //         const price = search.price;
    //         console.log(price);
    //         if(total === undefined){
    //             total.push({
    //                 id: buttonID,
    //                 price: totalSearch.price
    //             })
    //         }
    //         console.log(total);
    //     }
    // })

};
    

closeBtn.addEventListener('click', ()=>{
    allItem.style.display = 'none';
    cardSection.classList.toggle("active");
    allItem.classList.remove("basket-item");
})

basketItem.addEventListener('click', () =>{
    allItem.classList.add("basket-item");
    cardSection.classList.toggle("active");
    allItem.style.display = 'block';
});

