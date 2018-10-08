const state = {
    cartQty:0
}

const incFunc = function(e){
    console.log('in incFunc');
    e.preventDefault();
    const incStep = parseFloat($('#purSelect').val());
    state.cartQty += incStep;
    console.log(`in incFunc ${state.cartQty}`);
    alert('you just add an item to the cart!');
    $('#cartQty').text(`${state.cartQty}`);
}


// const purchaseFunc = function(e){
//     console.log('get in purchase');
//     e.preventDefault();
//     const id = $(this).attr('data-id');
//     console.log(id);
//     $.ajax({url:`/purchase/:${id}`, method: 'GET', data: {id:id}})
//     .then(
//         function(){
//             console.log('get into purchase page');
//         }
//     ).catch(
//         function(){
//             alert("There's a problem happened in purchaseFunc!");
//         }
//     );
    
// }

console.log('in pruchase.js');
$(document).on('click','#incQtyBtn',incFunc);
//$(document).on('click','#buyBtn',purchaseFunc);

/*
const cartFunc = function(e){
    e.preventDefault();
}

$(document).on('click','#cartBtn',cartFunc)
*/
