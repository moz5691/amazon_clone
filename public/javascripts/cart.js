// const Inventory = require('./../models/inventory');

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

const cartIncFunc = function(e){
    console.log('in cartIncFunc');
    e.preventDefault();
    const productID=$(this).attr('data-id');

    const incStep = parseFloat($('#cartSelect').val());
    let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
    tempCart += incStep;
    sessionStorage.setItem(`${productID}`,tempCart);
    $('#cartQty').text(`${sessionStorage.getItem(`${productID}`)}`);
    console.log($('#cartQty').text());
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


const cartDecFunc = function(e){
    console.log('in cartDecFunc');
    e.preventDefault();
    const productID=$(this).attr('data-id');

    const decStep = parseFloat($('#cartSelect').val());
    let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
    tempCart -= DecStep;
    sessionStorage.setItem(`${productID}`,tempCart);
    $('#cartQty').text(`${sessionStorage.getItem(`${productID}`)}`);
    console.log($('#cartQty').text());
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





$(document).on('click','#cartDelete',cartDelFunc);
