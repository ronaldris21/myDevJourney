const express = require("express");
const router = express.Router();

//#region products "DB"
var products = [
  {
    id: 1,
    name: "iPhone 12",
    price: 999,
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 899,
  },
  {
    id: 3,
    name: "MacBook Pro",
    price: 1499,
  },
  {
    id: 4,
    name: "Dell XPS 13",
    price: 1199,
  },
  {
    id: 5,
    name: "Sony WH-1000XM4",
    price: 349,
  },
  {
    id: 6,
    name: "Nintendo Switch",
    price: 299,
  },
  {
    id: 7,
    name: "Canon EOS R5",
    price: 3899,
  },
  {
    id: 8,
    name: "Bose QuietComfort Earbuds",
    price: 279,
  },
  {
    id: 9,
    name: "Google Pixel 5",
    price: 699,
  },
  {
    id: 10,
    name: "Microsoft Surface Laptop 4",
    price: 1299,
  },
];




router.get('/', (req,res) =>{
  res.json(products);
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const productSelected = products.filter(p => p.id == id);
  res.send(productSelected);

});


// http://localhost:3002/api/v1/products/productFilter/3?minPrice=200&maxPrice=4
// http://localhost:3002/api/v1/products/productFilter/3?minPrice=200
router.get("/productFilter/:producctId", (req,res) => {
  const producctId = req.params.producctId;
  const minPriceIndividual = req.query.minPrice || 0; ///QUERY

  ////SACAR MULTIPLE PARAMETROS
  const{minPrice , maxPrice} = req.query;

  console.table([minPriceIndividual, minPrice, maxPrice ]);

  res.json({
    producctId:producctId,
    minPrice:minPrice});

})


module.exports =  router;
