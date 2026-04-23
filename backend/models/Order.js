import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase UID
  email: { type: String, required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: { type: String, required: true, default: 'COD' },
  orderStatus: { type: String, required: true, default: 'Pending', enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
