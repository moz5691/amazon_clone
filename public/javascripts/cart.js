
const runDataList = function () {
    $.ajax({ url: "/database", method: "GET" }).then(
        function (e) {
            cartRenderFunc(e);
        }
    );
}

const cartRenderFunc = function (InventoryList) {
    let cartSubtotal = 0;
    InventoryList.forEach(e => {
        let renderQty = parseFloat(sessionStorage.getItem(`${e._id}`)) || 0;
        $(`#${e._id}`).text(`${renderQty}`);
        cartSubtotal += renderQty * e.itemPrice;
        if (e.itemCount < renderQty) {
            console.log(renderQty);
            cartSubtotal -= (renderQty - e.itemCount) * e.itemPrice;
            sessionStorage.setItem(`${e._id}`, e.itemCount);
            renderQty = e.itemCount;
            $(`#${e._id}`).text(`Only ${renderQty} left`);
            if ((e.itemCount) === 0) {
                console.log('in 0' + e.itemCount);
                $(`#${e._id}stock`).text('Not in Stock');
            } else {
                $(`#${e._id}stock`).text(`Only ${e.itemCount} left`);
            }
        } else {
            $(`#${e._id}stock`).text('In Stock');
        }
    });

    $(`.cartSubtotal`).text(`${cartSubtotal}`);


}
runDataList();

const cartIncFunc = function () {
    console.log('in cartIncFunc');
    //e.preventDefault();
    const productID = $(this).attr('data-id');
    const incStep = parseFloat($('#cartSelect').val());
    let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
    tempCart += incStep;
    sessionStorage.setItem(`${productID}`, tempCart);
    console.log($('.cartQty').text());
    let inCart = false;
    if (sessionStorage.getItem(`${productID}`) !== '0') {
        inCart = true;
    }
    const updateEntry = {
        itemInCart: inCart
    }
    $.ajax({ url: `/cartUpdate/${productID}`, method: 'PUT', data: updateEntry }).then(
        function (data) {
            if (data) {
                console.log('itemInCart successfully change');
            } else {
                console.log("There's some problem in put methord ")
            }
        }
    );
}
$(document).on('click', '#cartIncBtn', cartIncFunc);


const cartDecFunc = function () {
    console.log('in cartDecFunc');
    //e.preventDefault();
    const productID = $(this).attr('data-id');

    const decStep = parseFloat($('#cartSelect').val());
    let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
    tempCart -= decStep;
    sessionStorage.setItem(`${productID}`, tempCart);
    //const renderQty = sessionStorage.getItem(`${productID}`);
    //$('.cartQty').text(`${renderQty}`);
    console.log($('.cartQty').text());
    let inCart = false;
    if (sessionStorage.getItem(`${productID}`) !== '0') {
        inCart = true;
    }
    const updateEntry = {
        itemInCart: inCart
    }
    $.ajax({ url: `/cartUpdate/${productID}`, method: 'PUT', data: updateEntry }).then(
        function (data) {
            if (data) {
                console.log('itemInCart successfully change');
            } else {
                console.log("There's some problem in put methord ")
            }
        }
    );
}
$(document).on('click', '#cartDecBtn', cartDecFunc);


const cartOrderFunc = function () {
    $.ajax({ url: "/database", method: "GET" }).then(
        function (e) {
            cartDBUpdate(e);
        }


    );
}

const cartDBUpdate = function (dataList) {
    dataList.forEach(e => {
        if (e.itemInCart === true) {
            const updateCount = e.itemCount - sessionStorage.getItem(`${e._id}`);
            const updateSold = parseFloat(sessionStorage.getItem(`${e._id}`)) + e.itemSold;
            const updateEntry = {
                itemInCart: false,
                itemCount: updateCount,
                itemSold: updateSold
            }
            sessionStorage.removeItem(`${e._id}`);

            $.ajax({ url: `/cartUpdate/${e._id}`, method: 'PUT', data: updateEntry }).then(
                function (data) {
                    if (data) {
                        console.log('afterSold, database successfully change');

                    } else {
                        console.log("There's some problem in put methord ")
                    }
                }
            );
        }
    }
    );
    alert('you have successfully place the order');



}


$(document).on('click', '#cartOrderBtn', cartOrderFunc);



const cartDelFunc = function(){

}


$(document).on('click','#cartDelete',cartDelFunc);
