/**
 * This is a standalone app to seed data to DB.
 * Must not be included in production.
 */
const Inventory = require('../models/inventory');
const mongoose = require('mongoose');

mongoose
  .connect(
    //'mongodb://amazon:amazon123@ds121183.mlab.com:21183/amazon'
    'mongodb://localhost/amazon'
  )
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

const inventory = [
  new Inventory({
    itemName: 'Simpsons',
    itemDepartment: 'Movie',
    itemPrice: 25,
    itemDescription: 'Funny comic',
    itemSeller: 'Fox',
    itemCount: 200,
    itemImgPath: '/images/simpsons.png'
  }),
  new Inventory({
    itemName: 'Dog and Cat',
    itemDepartment: 'Toy',
    itemPrice: 15,
    itemDescription: 'Dog and cot lovers must have',
    itemSeller: 'Dog,cat and US',
    itemCount: 2000,
    itemImgPath: '/images/dog_cat.png'
  }),
  new Inventory({
    itemName: 'Adidas running shoes',
    itemDepartment: 'Clothing',
    itemPrice: 120,
    itemDescription: 'Adidas running shoes, best comfort for long running',
    itemSeller: 'Adidas',
    itemCount: 2000,
    itemImgPath: '/images/adidas.jpeg',
    itemTag: ['sports', 'adidas', 'running']
  }),
  new Inventory({
    itemName: 'We Are Anonymous',
    itemDepartment: 'Book',
    itemPrice: 19,
    itemDescription: 'Story about the Hecker group Anonymous ',
    itemSeller: 'Random House',
    itemCount: 200000,
    itemImgPath: '/images/anonymous.png',
    itemTag: ['book', 'hecker', 'computer']
  }),
  new Inventory({
    itemName: 'Cheddar cheese biscuit',
    itemDepartment: 'Food',
    itemPrice: 7,
    itemDescription:
      'Chedar cheese topped biscuit with incredible blackberry dipping',
    itemSeller: 'Farm & Flavor',
    itemCount: 200,
    itemImgPath: '/images/cheese-bis-1.jpeg',
    itemTag: ['food', 'cheddar', 'biscuit']
  }),
  new Inventory({
    itemName: 'Chromebook',
    itemDepartment: 'Electronics',
    itemPrice: 700,
    itemDescription:
      'Chromebook, 3lbs light, Chrome OS, 1TB Google Cloud for 3 years',
    itemSeller: 'Google',
    itemCount: 2000,
    itemImgPath: '/images/chromebook-1.jpeg',
    itemTag: ['computer', 'chrome', 'google']
  }),
  new Inventory({
    itemName: '100 Dice',
    itemDepartment: 'Toy',
    itemPrice: 10,
    itemDescription: '100 dice in a bag. Fantastic quality.',
    itemSeller: 'Toy for the world',
    itemCount: 20000,
    itemImgPath: '/images/dice-toy-1.jpeg',
    itemTag: ['toy', 'dice', 'play']
  }),
  new Inventory({
    itemName: 'Euphoria Board Game',
    itemDepartment: 'Toy',
    itemPrice: 25,
    itemDescription: 'Euphoria Board Game Deluxe',
    itemSeller: 'Toys World',
    itemCount: 2000,
    itemImgPath: '/images/euphoria-game-1.jpeg',
    itemTag: ['board game', 'toy', 'euphoria']
  }),
  new Inventory({
    itemName: 'Acoustic Guitar Set',
    itemDepartment: 'Music',
    itemPrice: 250,
    itemDescription: 'Fender Guitar Set, carrying bag included.',
    itemSeller: 'Music of my life',
    itemCount: 200,
    itemImgPath: '/images/guitar-1.jpeg',
    itemTag: ['guitar', 'music', 'acoustic']
  }),
  new Inventory({
    itemName: 'Full Cover Headphones',
    itemDepartment: 'Music',
    itemPrice: 350,
    itemDescription: 'Incredible sound, noise canceling, 3D sound effect ',
    itemSeller: 'Best Music',
    itemCount: 20,
    itemImgPath: '/images/headphones-1.jpeg',
    itemTag: ['music', 'headphones', 'noise']
  }),
  new Inventory({
    itemName: 'Streamline Bicycle Helmet',
    itemDepartment: 'Sports',
    itemPrice: 299,
    itemDescription:
      'The Helmet from the future, the most comfortable and light weight helmet',
    itemSeller: 'Sports Center',
    itemCount: 200,
    itemImgPath: '/images/helmet-1.jpeg',
    itemTag: ['sports', 'bicycle', 'helmet']
  }),
  new Inventory({
    itemName: 'KeyPos Bike Helment',
    itemDepartment: 'Sports',
    itemPrice: 1999,
    itemDescription: 'OHP, voice command ready motor bike helmet. ',
    itemSeller: 'Auto Center',
    itemCount: 200,
    itemImgPath: '/images/helmet-2.jpeg',
    itemTag: ['sports', 'motor bike', 'helmet']
  }),
  new Inventory({
    itemName: 'Incredibles 2',
    itemDepartment: 'Movie',
    itemPrice: 17,
    itemDescription: 'Incredibles 2, box office 4 weeks No 1. ',
    itemSeller: 'Disney/Pixar',
    itemCount: 2000,
    itemImgPath: '/images/incredibles-2.jpeg',
    itemTag: ['movie', 'incredibles', 'disney']
  }),
  new Inventory({
    itemName: 'Led Zeppelin',
    itemDepartment: 'Music',
    itemPrice: 24,
    itemDescription: 'Led Zeppelin, including legendary Stair Way to Heaven ',
    itemSeller: 'Amazon',
    itemCount: 2000,
    itemImgPath: '/images/led-z-1.jpeg',
    itemTag: ['music', 'led zeppelin', 'stair way to heaven']
  }),
  new Inventory({
    itemName: 'Mario Badge',
    itemDepartment: 'Toy',
    itemPrice: 5,
    itemDescription: 'Mario Badge, collection item',
    itemSeller: 'Nintendo',
    itemCount: 2000,
    itemImgPath: '/images/mario-1.jpeg',
    itemTag: ['mario', 'nintendo', 'badge']
  }),
  new Inventory({
    itemName: 'Xiaomi Mi8',
    itemDepartment: 'Electronics',
    itemPrice: 500,
    itemDescription: 'Xiaomi Mi8 the latest Xiaomi phone',
    itemSeller: 'Xiaomi',
    itemCount: 200,
    itemImgPath: '/images/phone-1.jpeg',
    itemTag: ['xiaomi', 'mi8', 'phone']
  }),
  new Inventory({
    itemName: 'Google Pixel',
    itemDepartment: 'Electronics',
    itemPrice: 600,
    itemDescription: 'Google Pixel phone, Android',
    itemSeller: 'Google',
    itemCount: 2000,
    itemImgPath: '/images/phone-2.jpeg',
    itemTag: ['google', 'android', 'phone']
  }),
  new Inventory({
    itemName: 'US map',
    itemDepartment: 'Book',
    itemPrice: 10,
    itemDescription: 'US map, 5 different types of maps',
    itemSeller: 'Amazon',
    itemCount: 1000,
    itemImgPath: '/images/us-map-1.jpeg',
    itemTag: ['map', 'us', 'america']
  }),
  new Inventory({
    itemName: 'Sonoma Springs Chardonnay Wine',
    itemDepartment: 'Food',
    itemPrice: 25,
    itemDescription: 'Chardonnay 2005, Sonoma Springs, CA',
    itemSeller: 'Amazon',
    itemCount: 100,
    itemImgPath: '/images/wine-1.jpeg',
    itemTag: ['wine', 'white', 'chardonnay']
  })
];

let done = 0;
for (let i = 0; i < inventory.length; i++) {
  inventory[i].save((err, result) => {
    done++;
    if (done === inventory.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
