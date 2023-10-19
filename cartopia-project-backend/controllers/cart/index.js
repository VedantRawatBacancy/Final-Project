const Cart = require('../../models/cart')
const CartItem = require('../../models/cartItem')
const Product = require('../../models/products')
const db = require('../../models/index')
const addCart = async (req, res) => {
  try {
    const { quantity } = req.body
    const user = req.user
  const product = req.product
  
  let cart = await Cart(db.sequelize, db.Sequelize.DataTypes).findOne({
    where: { UserId: user.id }
  })

  if (!cart) {
    cart = await Cart(db.sequelize, db.Sequelize.DataTypes).create({
      UserId: user.id
    })
  }

  const cartItem = await CartItem(db.sequelize, db.Sequelize.DataTypes).findOne(
    { where: { ProductId: product.id, cartId: cart.id } }
  )
  if (cartItem) {
    console.log(cartItem.total_price, "PRICE")
    console.log(cartItem.quantity, "QTY")
    const updatedPrice = cartItem.total_price + (product.price * quantity)
    const updatedQuantity = cartItem.quantity + quantity
    console.log(updatedPrice)
    console.log(updatedQuantity)
    const updateCart = await CartItem(db.sequelize, db.Sequelize.DataTypes).update(
      {
        
        quantity: updatedQuantity,
        total_price: updatedPrice
      },
      { where: { CartId: cart.id, ProductId: product.id } }
    );
    console.log(updateCart.total_price)
    //if cartItem already exist 
    return res.status(200).send({
      status: 200,
      success: true,
      message: 'Item updated successfully',
      items:  {
        CartId: cart.id,
        ProductId: product.id,
        ProductName: product.name,
        ProductPrice: product.price_per_unit,
        quantity: updatedQuantity,
        total_price: updatedPrice,
        
        image: product.image
      }
    })
  } else {
   const newCartItem= await CartItem(db.sequelize, db.Sequelize.DataTypes).create({
      CartId: cart.id,
      ProductId: product.id,
      quantity,
      total_price: product.price * quantity,
      
    })
    
    return res.status(200).send({
      status: 200,
      success: true,
      message: 'Item added successfully',
      items: {
        CartId: newCartItem.CartId,
        ProductId: newCartItem.ProductId,
        ProductName: product.name,
        quantity: newCartItem.quantity,
        ProductPrice: product.price_per_unit,
        total_price: newCartItem.total_price,
        image: product.image

      }
    })
    
  }
} catch(err){
  return res.status(400).send({
    status: 400
  })
}
}

const removeCart = async (req, res) => {
  const user = req.user
  const product = req.product
  console.log("HELLO")
console.log(product)
  const cart = await Cart(db.sequelize, db.Sequelize.DataTypes).findOne({
    where: { UserId: user.id }
  })
  if (!cart) {
    return res.status(400).send({
      status: 400,
      success: false,
      message: 'Cart not found'
    })
  }
  const cartItem = await CartItem(db.sequelize, db.Sequelize.DataTypes).findOne(
    { where: { ProductId: product.id, CartId: cart.id } }
  )
  console.log(cartItem.total_price)
  console.log(cartItem)
  if (!cartItem) {
    return res.status(400).send({
      status: 400,
      success: false,
      message: 'Product does not exist in cart'
    })
    // const error = new Error('Product does not exist in the cart')
    // error.statusCode = 400
    // throw error
  }
  await CartItem(db.sequelize, db.Sequelize.DataTypes).destroy({
    where: { CartId: cart.id, ProductId: product.id }
  })
  // res.status(200).json({ message: 'item removed from the cart successfully.' })
  return res.status(200).send({
    status: 200,
    success: true,
    item: cartItem,
    message: 'Item removed successfully'
  })
}

const removeAllCart = async (req, res) => {
  const user = req.user
  const cart = await Cart(db.sequelize, db.Sequelize.DataTypes).findOne({
    where: { UserId: user.id }
  })
  if (!cart) {
    const error = new Error('Cart is Empty')
    error.statusCode = 404
    throw error
  }
  await CartItem(db.sequelize, db.Sequelize.DataTypes).destroy({
    where: { CartId: cart.id }
  })
  await Cart(db.sequelize, db.Sequelize.DataTypes).destroy({
    where: { id: cart.id }
  })

  return res.status(200).json({ message: 'Cart emptied successfully' })
}

const updateCart = async (req, res) => {
  const { quantity } = req.body

  const user = req.user
  const product = req.product

  if (quantity <= 0) {
    const error = new Error(`Product ${product.id} quantity is Invalid`)
    error.statusCode = 400
    throw error
  }
  const cart = await Cart(db.sequelize, db.Sequelize.DataTypes).findOne({
    where: { UserId: user.id }
  })
  if (!cart) {
    const error = new Error('Cart not found')
    error.statusCode = 400
    throw error
  }

  const cartItem = await CartItem(db.sequelize, db.Sequelize.DataTypes).findOne(
    { where: { ProductId: product.id, CartId: cart.id } }
  )
  if (!cartItem) {
    const error = new Error('Product does not exist in the cart')
    error.statusCode = 400
    throw error
  }
  await CartItem(db.sequelize, db.Sequelize.DataTypes).update(
    { quantity, total_price: product.price * quantity },
    { where: { CartId: cart.id, ProductId: product.id } }
  )
  res
    .status(200)
    .json({ message: 'item quantity updated in the cart successfully' })
}

const getCart = async (req, res) => {
  const user = req.user;
  const cart = await Cart(db.sequelize, db.Sequelize.DataTypes).findOne({
    where: { UserId: user.id },
  });

  if (!cart) {
    return res.status(404).send({
      status: 404,
      success: false,
      message: 'Cart is empty.',
    });
  }

  const cartItems = await CartItem(
    db.sequelize,
    db.Sequelize.DataTypes
  ).findAll({ where: { CartId: cart.id } });

  if (!cartItems || cartItems.length === 0) {
    return res.status(404).send({
      status: 404,
      success: false,
      message: 'Cart is empty or products do not exist in the cart',
    });
  }

  let totalQuantity = 0;
  let totalAmount = 0;
  const cartItemDetails = [];

  for (const cartItem of cartItems) {
    const product = await Product(db.sequelize, db.Sequelize.DataTypes).findOne(
      { where: { id: cartItem.ProductId } }
    );
    const itemTotalPrice = cartItem.quantity * product.price;

    totalQuantity += cartItem.quantity;
    totalAmount += itemTotalPrice;

    cartItemDetails.push({
      product_id: product.id,
      product_name: product.name,
      quantity: cartItem.quantity,
      price_per_unit: product.price,
      image: product.image,
    });
  }

  return res.status(200).send({
    status: 200,
    success: true,
    message: 'Cart content retrieved successfully.',
    cart_items: cartItemDetails,
    total_price: totalAmount,
    total_quantity: totalQuantity,
  });
};


const checkout = async (req, res) => {
  const user = req.user
  const cart = await Cart(db.sequelize, db.Sequelize).findOne({
    where: { UserId: user.id }
  })
  if (!cart) {
    const error = new Error('Cart is empty')
    error.statusCode = 400
    throw error
  }
  res
    .status(200)
    .json({
      message: 'Order placed successfully. Redirect to payment gateway.'
    })
}

module.exports = {
  addCart,
  removeCart,
  updateCart,
  getCart,
  removeAllCart,
  checkout
}
