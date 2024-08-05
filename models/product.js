const db = require('../util/database');

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price; 
  }

  save() {
    return db.execute('insert into products (title, price, imageUrl, description) values(?,?,?,?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {
    if (!id) {
      throw new Error('Product ID is required');
    }
    return db.execute('DELETE FROM products WHERE id = ?', [id]);
  }

  static fetchAll() {
    return db.execute('select * from products')
  }

  static findById(id){
    return db.execute('select * from products where products.id=?', [id]);
  }
};
