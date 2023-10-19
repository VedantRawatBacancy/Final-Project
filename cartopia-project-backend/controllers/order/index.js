const Order = require('../../models/order')
const ShippingAddress = require('../../models/shippingAddress')
const Product = require('../../models/products')
const db = require('../../models')
const OrderItem = require('../../models/orderItem')
const User = require('../../models/user')
const CartItem = require('../../models/cartItem')
const Adminlog = require('../../models/adminAuditLog.js')
// const OrderItem = require('../../models/orderItem')

exports.placeOrder = async (req, res) => {
  const user = req.user
  try {
    const { shipping, paymentMethod } = req.body
    if (!user.id) {
      return res.status(400).json({ error: 'User Id is required.' })
    }
    if (typeof user.id !== 'number') {
      return res.status(400).json({ error: 'User Id Should be a Number.' })
    }
    const existingUser = await User(
      db.sequelize,
      db.Sequelize.DataTypes
    ).findOne({
      where: { id: user.id }
    })

    if (!existingUser) {
      return res.status(404).json({ error: `User not found: ${user.id}` })
    }
    if (!shipping.street || !shipping.city || !shipping.zipCode) {
      return res.status(400).json({ error: 'Address Fields Cannot Be Null.' })
    }
    if (!paymentMethod) {
      return res.status(400).json({ error: 'Payment Method is Required' })
    }

    const existingAddress = await ShippingAddress(
      db.sequelize,
      db.Sequelize.DataTypes
    ).findOne({
      where: {
        street: shipping.street,
        city: shipping.city,
        zipCode: shipping.zipCode,
        UserId: user.id
      }
    })

    let shippingAddress

    if (existingAddress) {
      shippingAddress = existingAddress
    } else {
      shippingAddress = await ShippingAddress(
        db.sequelize,
        db.Sequelize.DataTypes
      ).create({
        street: shipping.street,
        city: shipping.city,
        zipcode: shipping.zipCode,
        UserId: user.id
      })
    }

    const cart = await db.Cart.findOne({
      where: { UserId: user.id }
    })

    const cartItems = await CartItem(
      db.sequelize,
      db.Sequelize.DataTypes
    ).findAll({
      where: { CartId: cart.id }
    })

    let totalPrice = 0
    let totalQuantity =0
    const Products = []
    console.log(cartItems)

    for (const item of cartItems) {
      const product = await Product(
        db.sequelize,
        db.Sequelize.DataTypes
      ).findOne({
        where: { id: item.ProductId }
      })
      if (product) {
        totalPrice += product.price * item.quantity
        totalQuantity += item.quantity
        const productData = {
          ProductName: product.name,
          ProductPice: product.price,
          ProductImage: product.image,
          ProductQuantity: item.quantity
        }
        Products.push(productData)
      } else {
        return res
          .status(404)
          .json({ error: `Product not found: ${item.ProductId}` })
      }
    }
    const order = await Order(db.sequelize, db.Sequelize.DataTypes).create({
      UserId: user.id,
      order_date: new Date(),
      status: 'Processing',
      total_price: totalPrice,
      payment_method: paymentMethod,
      ShippingAddressId: shippingAddress.id
    })
    console.log(order.total_price)
    const ordersData =[]
    const orderItem = {
      id: order.id,
      order_date : order.order_date,
      payment_method : order.payment_method,
      total_price: order.total_price,
      status: order.status,
      Products
    }
    ordersData.push(orderItem)

    for (const item of cartItems) {
      const product = await Product(
        db.sequelize,
        db.Sequelize.DataTypes
      ).findOne({
        where: { id: item.ProductId }
      })
      if (product) {
        await OrderItem(
          db.sequelize,
          db.Sequelize.DataTypes
        ).create({
          quantity: item.quantity,
          OrderId: order.id,
          ProductId: product.id
        })
      }
    }

    if (existingUser.role === 'ADMIN') {
      await Adminlog(db.sequelize, db.Sequelize.DataTypes).create({
        admin_id: req.user.id,
        action_description: 'New Order created'
      })
    }
    res
      .status(201)
      .json({ Message: 'Order placed successfully.', ordersData })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Invalid Inputs or Products Not Found' })
  }
}

// exports.getOrders = async (req, res) => {
//   try {
//     const user = req.user

//     const orders = await Order(db.sequelize, db.Sequelize.DataTypes).findAll(
//       { where: { UserId: user.id } }
//     )

//     if (!orders || orders.length === 0) {
//       return res.status(400).send({
//         status: 400,
//         success: false,
//         message: 'Order does not exist'
//       })
//     }

//     for (const order of orders) {
//       const orderItems = await OrderItem(db.sequelize, db.Sequelize.DataTypes).findAll(
//         { where: { OrderId: order.id } })

//       if (!orderItems) {
//         return res.status(404).send({
//           status: 404,
//           success: false,
//           message: 'no order present '
//         })
//       }

//       const OrderDetails= []
//       const Products = []
//       let totalQuantity =0
//       let totalPrice =0
      
//       for (const orderItem of orderItems) {
//         const product = await Product(db.sequelize, db.Sequelize.DataTypes).findOne(
//           { where: { id: orderItem.ProductId } })

//         const itemTotalPrice = orderItem.quantity * product.price
        
//       }

//     }
    


//   } catch (err)
//   {

//   }
// }

exports.getOrders = async (req, res) => {
  try {
    const user = req.user

    const orders = await Order(db.sequelize, db.Sequelize.DataTypes).findAll({
      where: { UserId: user.id }
    })

    if (!orders || orders.length === 0) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'Order does not exist'
      })
    }

    const formattedOrders = []

    for (const order of orders) {
      const orderItems = await OrderItem(db.sequelize, db.Sequelize.DataTypes).findAll({
        where: { OrderId: order.id }
      })

      if (!orderItems || orderItems.length === 0) {
        return res.status(404).send({
          status: 404,
          success: false,
          message: 'No order items found'
        })
      }

      const products = []

      for (const orderItem of orderItems) {
        const product = await Product(db.sequelize, db.Sequelize.DataTypes).findOne({
          where: { id: orderItem.ProductId }
        })

        products.push({
          id: product.id,
          name: product.name,
          image: product.image,
          description: product.description,
          price: product.price,
          quantity: orderItem.quantity
        })
      }

      formattedOrders.push({
        order_id: order.id,
        shipping_address: order.shippingAddress,
        payment_method: order.paymentMethod,
        products
      })
    }

    res.status(201).json({ Message: 'Order fetched successfully.', OrderDetails: formattedOrders })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'Invalid Inputs or Products Not Found' })
  }
}

exports.trackOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId

    const order = await Order(db.sequelize, db.Sequelize.DataTypes).findByPk(
      orderId,
      {
        attributes: ['id', 'status', 'order_date']
      }
    )

    const estimatedDeliveryDate = new Date(order.orderDate)
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7)

    res.status(200).json({
      order_id: order.id,
      status: order.status,
      estimated_delivery_date: estimatedDeliveryDate
    })
  } catch (error) {
    res.status(404).json({ error: 'Order Not Found' })
  }
}

// WRITE A FUNCTION TO MANAGE STOCK ONCE THE PAYMENT IS SUCCESSFUL
