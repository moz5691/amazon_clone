
//const Inventory = require('./../models/inventory');

// Inventory.find({ itemInCart: true }).then(
//     function (data) {
//         data.forEach(
//             function (element) {
//                 console.log(element._id)
//                 const sessionQty = sessionStorage.getItem(element._id);
//                 $(`#${element._id}`).text(`${sessionQty} testQty`);
//             }
//         )
//     }
// ).catch(
//     console.log('error heppens in cart script')
// );
const runDataList = function(){
    $.ajax({ url: "/database", method: "GET" }).then(
        function (e) {
        cartRenderFunc(e);
        }
    );
}

const cartRenderFunc = function(InventoryList){
    let cartSubtotal = 0;
    InventoryList.forEach(e => {
        let renderQty = parseFloat(sessionStorage.getItem(`${e._id}`))||0;
        $(`#${e._id}`).text(`${renderQty}`);
        cartSubtotal += renderQty * e.itemPrice;  
        if (e.itemCount<renderQty){
            console.log(renderQty);
            sessionStorage.setItem(`${e._id}`,e.itemCount);
            renderQty = e.itemCount;
            cartSubtotal -=e.itemPrice;
            $(`#${e._id}`).text(`Only ${renderQty} left`);
            if((e.itemCount) ===0){
                console.log('in 0'+ e.itemCount);
                $(`#${e._id}stock`).text('Not in Stock');
            }else{
                $(`#${e._id}stock`).text(`Only ${e.itemCount} left`);
            }
        }else{
            $(`#${e._id}stock`).text('In Stock');
        }
    });
    
    $(`.cartSubtotal`).text(`${cartSubtotal}`);
    

}
runDataList();

const cartIncFunc = function(){
    console.log('in cartIncFunc');
    //e.preventDefault();
    const productID=$(this).attr('data-id');
    const incStep = parseFloat($('#cartSelect').val());
    let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
    tempCart += incStep;
    sessionStorage.setItem(`${productID}`,tempCart);
    //const renderQty = sessionStorage.getItem(`${productID}`);
    //$('.cartQty').text(`${renderQty}`);
    console.log($('.cartQty').text());
    let inCart = false;
    if (sessionStorage.getItem(`${productID}`) !=='0'){
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
$(document).on('click','#cartIncBtn',cartIncFunc);


const cartDecFunc = function(){
    console.log('in cartDecFunc');
    //e.preventDefault();
    const productID=$(this).attr('data-id');

    const decStep = parseFloat($('#cartSelect').val());
    let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
    tempCart -= decStep;
    sessionStorage.setItem(`${productID}`,tempCart);
    //const renderQty = sessionStorage.getItem(`${productID}`);
   //$('.cartQty').text(`${renderQty}`);
    console.log($('.cartQty').text());
    let inCart = false;
    if (sessionStorage.getItem(`${productID}`) !=='0'){
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
$(document).on('click','#cartDecBtn',cartDecFunc);


const cartOrderFunc = function(){

}

$(document).on('click','#cartOrderBtn',cartOrderFunc);


//$(document).on('click','#cartDelete',cartDelFunc);
