let allProducts=[{
    id:1,
    title:"APPLE",
    description:"OnePlus",
    price:"1,13000 ₹",
    url:"images/mobiles/iphone-13-promax.jpg"
},
{
    id:2,
    title:"OnePlus",
    description:"OnePlus Nord CE 5G (Blue Void, 8GB RAM, 128GB Storage)",
    price:"27,999 ₹",
    url:"images/mobiles/OnePlus-Nord.jpg"
},
{
    id:3,
    title:"SAMSUNG",
    description:"SAMSUNG Galaxy S10 Plus (Ceramic White, 1 TB) (12 GB RAM)",
    price:"79,999 ₹",
    url:"images/mobiles/sumsung-s10-plus.jpg"
},
{
    id:4,
    title:"REDMI",
    description:"REDMI Note 8 Pro (Electric Blue, 128 GB) (6 GB RAM)",
    price:"21.999 ₹",
    url:"images/mobiles/xiaomi_redmi_note_8_pro.jpg"
},
{
    id:5,
    title:"Christy World ",
    description:"Full Sleeve Solid Men Padded Jacket",
    price:"999 ₹",
    url:"images/winter-season/men-jacket-1.jpeg"
}
]


// this function is to put the data to carts in localstorage 
const addToCard=(produtId)=>{

    let products=[]


    let oldProduct= JSON.parse(localStorage.getItem("cart"));
    
    if(oldProduct!==null){
        products=[...oldProduct]
    }
  
   let current= allProducts.find(item=>{
       return  item.id===produtId
    })

    // checking the product is avaialbe in our cart

    let isExist = products.find(item=>{
        return (item.id===produtId)
    })

    console.log(isExist)

    if(isExist===undefined){
        products.push(current)
        localStorage.setItem("cart",JSON.stringify(products))
        document.getElementById("cartItems").innerHTML=products.length;
    }else{
        alert("product is already in cart")
        localStorage.setItem("cart",JSON.stringify(products))
        document.getElementById("cartItems").innerHTML=products.length;
    }

}


// This function will render dynamic data 

const renderCard=(id,title,description,price,image,renderDiv)=>{


    let card = document.createElement("div")
    card.id=id;
    card.style="width: 18rem"

    let cardImg = document.createElement("img")
    cardImg.src="../"+image
    cardImg.style="width:200px"


    let cardBody=document.createElement("div");
    cardBody.className="card-body";
    let cardTitle=document.createElement("h5");
    cardTitle.classList="card-title";
    cardTitle.innerHTML=title

    let cardDescription = document.createElement("p")
    cardDescription.className="card-text";
    cardDescription.innerHTML=description

    let cardPrice = document.createElement("p")
    cardPrice.className="card-text";
    cardPrice.innerHTML=price

    cardBody.append(cardTitle)
    cardBody.append(cardDescription)
    cardBody.append(cardPrice)


    if(renderDiv!="new_arrival"){
        let removeBtn = document.createElement("button")
        removeBtn.innerHTML="Remove Item"
    
        removeBtn.addEventListener("click",()=>{
            remvoeItem(id)
        })
        cardBody.append(removeBtn)
    }

    if(renderDiv==="new_arrival"){
        let addtoCardButton = document.createElement("a");
        addtoCardButton.classList="btn btn-primary"
        let cardIcon = document.createElement("i");
        cardIcon.classList="fa fa-cart-plus px-1"
        addtoCardButton.append(cardIcon)
        addtoCardButton.append("Add to Card")
        cardBody.append(addtoCardButton)
        addtoCardButton.addEventListener("click",()=>{
            addToCard(id)
        })
        
    }

    card.append(cardImg);
    card.append(cardBody);

    document.getElementById(renderDiv).append(card)

}


// it will print all the cart product from the localstorge 

const printAllCartProducts=()=>{
    let cartsProduct= JSON.parse(localStorage.getItem("cart"));

    cartsProduct.map(item => {
        renderCard(item.id,item.title,item.description,item.price,item.url,"list_all")
    });
}

// this fn take paramater to remvoe the item from local stroage 

const remvoeItem=(id)=>{
    let cartsProduct= JSON.parse(localStorage.getItem("cart"));

   let newData= cartsProduct.filter((item=>{
        return item.id!==id
    }))
    localStorage.setItem("cart",JSON.stringify(newData))
    document.getElementById(id).remove()
    
}   


// This function is used to create a new product 
// it take the id from the modal and create a new object 
// push the code to the allProduct and render the object in arrival section 
const createProduct=(data)=>{
    let pname=document.getElementById("p_name").value
    let pDecs=document.getElementById("p_description").value
    let pPrice=document.getElementById("p_price").value
    let id=Math.random();

    allProducts.push({
        id,
        title:pname,
        description:pDecs,
        price:pPrice,
        url:"images/Default_Image_Thumbnail.png"
    })

    renderCard(id,pname,pDecs,pPrice,"/images/Default_Image_Thumbnail.png","new_arrival")

    return false;
}



// it is the raw function to match teh word and retun the array with the help of regular expression 
function findMatches(wordToMatch) {
    return allProducts.filter(product => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return product.title.match(regex) || product.description.match(regex)
    });
}

// This function will take the user input from the home page and find the 
// item that is associate with the given text 
const serachItems=(e)=>{
    let res = findMatches(e.value);

    let allItems = document.getElementById("all_search_item");

    if(res.length===0){
        allItems.replaceChildren();
    }
    res.map(item=>{
        renderSearchItem(item.title,item.price,item.url)
    })
}

// Rendering Search item 
const renderSearchItem=(title,price,url)=>{
    let allItems = document.getElementById("all_search_item");
    allItems.replaceChildren();

    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src="/"+url;
    li.append(img);
    li.append(`${title}, ${price}`)
    allItems.append(li)
}

