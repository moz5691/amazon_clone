const Inventory = require('./../models/inventory');

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





$(document).on('click','#cartDelete',cartDelFunc);
