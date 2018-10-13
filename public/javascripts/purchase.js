// const Inventory = require('./../models/inventory');

const incFunc = function(e){
    console.log('in incFunc');
    e.preventDefault();
    const productID=$(this).attr('data-id');

    const incStep = parseFloat($('#purSelect').val());
    // let qty = parseFloat($('#cartQty').text());
    let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
    tempCart += incStep;
    sessionStorage.setItem(`${productID}`,tempCart);
    $('#cartQty').text(`${sessionStorage.getItem(`${productID}`)}`);
    console.log($('#cartQty').text());
    let inCart = false;
    if ($('#cartQty').text()!=='0'){
        inCart=true;
    }
    const updateEntry={
    itemInCart:inCart
    }
    $.ajax({url:`/cartUpdate/${productID}`,method:'PUT',data:updateEntry }).then(
        function(data){
            if(data){
                console.log('itemInCart successfully change');
            }else{
                console.log("There's some problem in put methord ")
            }
        }
    );

}


console.log('in pruchase.js');
$(document).on('click','#incQtyBtn',incFunc);
