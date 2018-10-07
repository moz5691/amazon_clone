const state = {
    cartQty:0
}

const incFunc = function(e){
    console.log('in incFunc');
    e.preventDefault();
    state.cartQty += 1;
    console.log(`in incFunc ${state.Qty}`);
    $('.cartQty').text= `${state.cartQty}`;
}


const purchaseFunc = function(e){
    console.log('get in purchase');
    e.preventDefault();
    const id = $(this).attr('data-id');
    $.ajax({url:'/purchase', method: 'GET', data: $(this)})
    .then(console.log('in ajax'));
    $(document).on('click','.incQtyBtn',incFunc);
}


$(document).on('click','#buyBtn',purchaseFunc);