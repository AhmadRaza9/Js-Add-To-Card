class cartController {
   
    constructor() { 
        this.AllProdHandler();   
        
    }
    
    data = {
        allIProducts: [],
    }

    DOMstrings = {
        id: '.card',
        card : '.card',
        title: '.product-name',
        price: '.product-price',
        prodqty: '.product-quantity',
        prodImg: '.product-image',
        prodBtn: '.btn-primary',
        shoppingBag: '.shopping-cart'
    }

    AllProdHandler() {
        const cartContainer = document.querySelector(this.DOMstrings.shoppingBag);
        const allProd = document.querySelectorAll(this.DOMstrings.card);
        for (const prod of allProd) {
            const BtnEle = prod.querySelector('.btn-primary');
            BtnEle.addEventListener('click', event => {
                event.stopPropagation();
                const card = {
                    prodID : prod.id,
                    prodImg : prod.querySelector('.product-image').src,
                    prodTitle : prod.querySelector('.product-name').innerText,
                    prodPrice : prod.querySelector('.product-price').innerText.slice(1,2),
                    prodQty : prod.querySelector('.product-quantity').value,
                }

            // Push product in array
            if(!this.data.allIProducts.find( e => e.prodID === card.prodID)){
                this.data.allIProducts.push(card);
                // console.log(this.data.allIProducts);
            }
            // Push product in array

            const cartProd = cartContainer.querySelector(`#${card.prodID}`);
            const html = `
             <div id="${card.prodID}" class="item">
                    <div class="buttons">
                        <span class="delete-btn"></span>
                    </div>
                    <div class="image">
                        <img src="${card.prodImg}" alt=""/>
                    </div>
                    <div class="description">
                        <span>${card.prodTitle}</span>
                        <span class="as-basic-price-main">$<span class="basic-price">${card.prodPrice}</span></span>
                        <span>Fresh</span>
                    </div>
                    <div class="quantity">
                       <button class="minus-btn" type="button" name="button">
                          <img src="images/minus.svg" alt=""/>
                        </button>
                        <input class="quantity-input" type="number" value="${card.prodQty}" disabled>
                        <button class="plus-btn" type="button" name="button">
                            <img src="images/plus.svg" alt=""/>
                        </button>
                    </div>
                    <div class="total-price">Total $<span class="t-price">${Number(card.prodQty) * Number(card.prodPrice)}</span></div>
                </div>`;
                
                if(!cartContainer.contains(cartProd)) {
                    cartContainer.insertAdjacentHTML('afterbegin', html);
                } else if(cartContainer.contains(cartProd)) {
                    const cartProdQty =  cartProd.querySelector('.quantity-input');
                    const cartProdBasicPrice = cartProd.querySelector('.basic-price');
                    const cartProdTotalPrice = cartProd.querySelector('.t-price');
                    cartProdQty.value = Number(cartProdQty.value) + Number(card.prodQty);
                    cartProdTotalPrice.innerText = Number(cartProdBasicPrice.innerText) * Number(cartProdQty.value);
                }
                this.removeHandler();
                this.incdecQtyHandler();
                this.totalPriceHanlder();
               
                
            });  // event end        
          } // for end
    } // method end  

    removeHandler() {
        const shoppingBagSec = document.querySelector('.shopping-cart');
        const cartcards = shoppingBagSec.children[0];
        const delBtn = cartcards.querySelector('.delete-btn');
        delBtn.addEventListener('click', e => {
            e.stopImmediatePropagation();
            cartcards.remove();
            const Total = document.querySelector('.prod-total .total-prod');
            const TotalQty = document.querySelector('.shopping-bag .t-prod');
            const subTotal = document.querySelector('.subtotal .total-prod');
            const taxAmount = document.querySelector('.tax-amount');
            taxAmount.innerText = 0;
            TotalQty.innerText = 0;
            Total.innerText = 0;
            subTotal.innerText = 0;
            this.totalPriceHanlder();
        });
    }  

    incdecQtyHandler() {
        const shoppingBagSec = document.querySelector('.shopping-cart');
        const cartcards = shoppingBagSec.children[0];
        const plusBtn = cartcards.querySelector('.plus-btn');
        const minusBtn = cartcards.querySelector('.minus-btn');
        const cartProdQty =  cartcards.querySelector('.quantity-input'); // quantity of product
        const cartProdBasicPrice = cartcards.querySelector('.basic-price'); // orginal price of product
        const cartProdTotalPrice = cartcards.querySelector('.t-price'); // total price of product
        
        plusBtn.addEventListener('click', e => {
            e.stopImmediatePropagation();
            ++cartProdQty.value;
            cartProdTotalPrice.innerText = Number(cartProdQty.value) * Number(cartProdBasicPrice.innerText);
            this.totalPriceHanlder();
        });

        minusBtn.addEventListener('click', e => {
            e.stopImmediatePropagation();
            if(cartProdQty.value == 1) { 
                cartProdQty.value = cartProdQty.value * 1;
                alert('There should at least be one quantity of product. You may click the remove button to remove this from cart')   
            }else{   
                --cartProdQty.value;
                cartProdTotalPrice.innerText = Number(cartProdTotalPrice.innerText) - Number(cartProdBasicPrice.innerText);
                this.totalPriceHanlder();
            }
        });
    }

    totalPriceHanlder() {
        const shoppingBagSec = document.querySelector('.shopping-cart');
        const card = shoppingBagSec.children[0];
        const SubTotal = document.querySelector('.subtotal .total-prod');
        const taxAmount = document.querySelector('.tax-amount');
        const totalProdPrice = shoppingBagSec.querySelectorAll('.t-price');
        const totalProdQty = shoppingBagSec.querySelectorAll('.quantity-input');
        const TotalQty = document.querySelector('.shopping-bag .t-prod');
        const finalTotal = document.querySelector('.prod-total .total-prod');

        if(totalProdPrice[0] || totalProdQty[0]) {
            SubTotal.innerText = +totalProdPrice[0].innerText;
            TotalQty.innerText = +totalProdQty[0].value;
            taxAmount.innerText = +totalProdPrice[0].innerText / 10;
            finalTotal.innerText = +SubTotal.innerText + +taxAmount.innerText;
            
        };

        if(totalProdPrice[0] && totalProdPrice[1] || totalProdQty[0] && totalProdQty[1]) {
            SubTotal.innerText = +totalProdPrice[0].innerText + +totalProdPrice[1].innerText;   
            TotalQty.innerText = +totalProdQty[0].value + +totalProdQty[1].value;
            taxAmount.innerText = (+totalProdPrice[0].innerText + +totalProdPrice[1].innerText) / 10 ;
            finalTotal.innerText = +SubTotal.innerText + +taxAmount.innerText;   
        };

        if(totalProdPrice[0] && totalProdPrice[1] && totalProdPrice[2] || totalProdQty[0] && totalProdQty[1] && totalProdQty[2]) {
            SubTotal.innerText = +totalProdPrice[0].innerText + +totalProdPrice[1].innerText + +totalProdPrice[2].innerText; 
            TotalQty.innerText = +totalProdQty[0].value + +totalProdQty[1].value + +totalProdQty[2].value;
            taxAmount.innerText = (+totalProdPrice[0].innerText + +totalProdPrice[1].innerText + +totalProdPrice[2].innerText) / 10;
            finalTotal.innerText = +SubTotal.innerText + +taxAmount.innerText; 
        };

        if(totalProdPrice[0] && totalProdPrice[1] && totalProdPrice[2] && totalProdPrice[3] || totalProdQty[0] && totalProdQty[1] && totalProdQty[2] && totalProdQty[3]) {
            SubTotal.innerText = +totalProdPrice[0].innerText + +totalProdPrice[1].innerText + +totalProdPrice[2].innerText + +totalProdPrice[3].innerText;
            TotalQty.innerText = +totalProdQty[0].value + +totalProdQty[1].value + +totalProdQty[2].value + +totalProdQty[3].value;
            taxAmount.innerText = (+totalProdPrice[0].innerText + +totalProdPrice[1].innerText + +totalProdPrice[2].innerText + +totalProdPrice[3].innerText) / 10;
            finalTotal.innerText = +SubTotal.innerText + +taxAmount.innerText;
        };
    }
    
}

const AddToCart = new cartController;