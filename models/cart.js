const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart{
   
    static addProduct(id, productPrice){
        // console.log("Add Product");
        
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent)=>{
            let cart = {products:[], totalPrice: 0};
            
            if (!err && fileContent.length > 0) {
                try {
                    cart = JSON.parse(fileContent);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                }
            }
        
        // Analyze the cart => find Existing product
        const existingProductIndex = cart.products.findIndex(prod =>prod.id === id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;

        // Add new product or increase quantity
       
        if(existingProduct){
            updatedProduct = {...existingProduct};
            updatedProduct.qty = updatedProduct.qty+1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        }
        else{
            // console.log("New Product");
            updatedProduct = {id: id, qty:1};
            cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice = cart.totalPrice+ +productPrice;
        
        // console.log(cart);

        fs.writeFile(p, JSON.stringify(cart), (writeErr) =>{
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
            }
        });
    });
    
        
    }

}