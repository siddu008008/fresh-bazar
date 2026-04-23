import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, Trash2, PlusCircle, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // New product state
  const [newProduct, setNewProduct] = useState({ name: '', brand: '', price: '', discountPrice: '', description: '', category: '', image: '', stock: '', unit: '', pricingOptions: [] });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [prodRes, ordRes, usersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/orders', config),
        axios.get('http://localhost:5000/api/auth/users', config)
      ]);
      setProducts(prodRes.data);
      setOrders(ordRes.data);
      setUsersList(usersRes.data);
    } catch(err) {
      toast.error('Failed to load admin data');
    }
    setLoading(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (editingProductId) {
        await axios.patch(`http://localhost:5000/api/products/${editingProductId}`, newProduct, config);
        toast.success('Product Updated');
        setEditingProductId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', newProduct, config);
        toast.success('Product Added');
      }
      setNewProduct({ name: '', brand: '', price: '', discountPrice: '', description: '', category: '', image: '', stock: '', unit: '', pricingOptions: [] });
      fetchData();
    } catch(err) {
      toast.error(editingProductId ? 'Error updating product' : 'Error adding product');
    }
  };

  const startEdit = (product) => {
    setEditingProductId(product._id);
    setNewProduct({
      name: product.name || '',
      brand: product.brand || '',
      price: product.price || '',
      discountPrice: product.discountPrice || '',
      description: product.description || '',
      category: product.category || '',
      image: product.image || '',
      stock: product.stock || 0,
      unit: product.unit || '',
      pricingOptions: product.pricingOptions || []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setNewProduct({ name: '', brand: '', price: '', discountPrice: '', description: '', category: '', image: '', stock: '', unit: '', pricingOptions: [] });
  };

  const handleAddPricingOption = () => {
    setNewProduct({ ...newProduct, pricingOptions: [...newProduct.pricingOptions, { label: '', value: 1, price: 0 }] });
  };
  
  const handleUpdatePricingOption = (index, field, value) => {
    const updated = [...newProduct.pricingOptions];
    updated[index][field] = field === 'price' || field === 'value' ? Number(value) : value;
    setNewProduct({ ...newProduct, pricingOptions: updated });
  };
  
  const handleRemovePricingOption = (index) => {
    const updated = newProduct.pricingOptions.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, pricingOptions: updated });
  };

  const handleDeleteProduct = async (id) => {
    if(!window.confirm('Delete this product?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      toast.success('Product Deleted');
      fetchData();
    } catch(err) {
      toast.error('Error deleting product');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.patch(`http://localhost:5000/api/auth/users/${userId}/role`, { role: newRole }, config);
      toast.success('User role updated');
      fetchData();
    } catch(err) {
      toast.error('Error updating role');
    }
  };

  if(!user || user.role !== 'admin') {
    return <div className="p-20 text-center text-red-500 font-bold text-2xl">Access Denied: Admins Only</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-24">
          <div className="text-xl font-bold text-gray-900 mb-6 px-2">Admin Panel</div>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <ShoppingBag className="w-5 h-5" /> Manage Products
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <LayoutDashboard className="w-5 h-5" /> Manage Orders
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Users className="w-5 h-5" /> Manage Users
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {loading ? (
           <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
        ) : activeTab === 'products' ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Management</h2>
            {/* Add Product Form */}
            <form onSubmit={handleAddProduct} className="card p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input placeholder="Name" required className="input-field" value={newProduct.name} onChange={e=>setNewProduct({...newProduct, name: e.target.value})} />
              <input placeholder="Brand" required className="input-field" value={newProduct.brand} onChange={e=>setNewProduct({...newProduct, brand: e.target.value})} />
              <input placeholder="Category" required className="input-field" value={newProduct.category} onChange={e=>setNewProduct({...newProduct, category: e.target.value})} />
              <input placeholder="Price (Base)" type="number" required className="input-field" value={newProduct.price} onChange={e=>setNewProduct({...newProduct, price: e.target.value})} />
              <input placeholder="Stock Qty" type="number" required className="input-field" value={newProduct.stock} onChange={e=>setNewProduct({...newProduct, stock: e.target.value})} />
              <input placeholder="Unit (e.g. kg, piece)" className="input-field" value={newProduct.unit} onChange={e=>setNewProduct({...newProduct, unit: e.target.value})} />
              <input placeholder="Image URL" required className="input-field col-span-full" value={newProduct.image} onChange={e=>setNewProduct({...newProduct, image: e.target.value})} />
              <div className="col-span-full">
                <textarea placeholder="Description" required className="input-field" value={newProduct.description} onChange={e=>setNewProduct({...newProduct, description: e.target.value})}></textarea>
              </div>
              
              <div className="col-span-full border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-700">Pricing Options (Optional)</h3>
                  <button type="button" onClick={handleAddPricingOption} className="text-sm bg-primary text-white px-3 py-1 rounded-lg">Add Option</button>
                </div>
                {newProduct.pricingOptions.map((opt, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <input placeholder="Label (e.g. 500g)" className="input-field flex-1" value={opt.label} onChange={e=>handleUpdatePricingOption(idx, 'label', e.target.value)} required />
                    <input placeholder="Value (e.g. 0.5)" type="number" step="any" className="input-field flex-1" value={opt.value} onChange={e=>handleUpdatePricingOption(idx, 'value', e.target.value)} required />
                    <input placeholder="Price (₹)" type="number" className="input-field flex-1" value={opt.price} onChange={e=>handleUpdatePricingOption(idx, 'price', e.target.value)} required />
                    <button type="button" onClick={() => handleRemovePricingOption(idx)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))}
              </div>

              <div className="col-span-full flex justify-end gap-4 mt-4">
                {editingProductId && (
                  <button type="button" onClick={cancelEdit} className="btn-secondary">Cancel Edit</button>
                )}
                <button className="btn-primary" type="submit">
                  <PlusCircle className="mr-2 w-5 h-5"/> 
                  {editingProductId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>

            <div className="card overflow-hidden">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{p.name} {p.unit && `(${p.unit})`}</td>
                      <td className="px-6 py-4">₹{p.price.toFixed(2)}</td>
                      <td className="px-6 py-4">{p.stock}</td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button onClick={() => startEdit(p)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg transition-colors">Edit</button>
                        <button onClick={() => handleDeleteProduct(p._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'orders' ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>
            <div className="card overflow-hidden">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(o => (
                    <tr key={o._id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{o._id.substring(0, 8)}...</td>
                      <td className="px-6 py-4">{o.user?.name || 'Guest'}</td>
                      <td className="px-6 py-4 text-primary font-bold">₹{o.totalAmount?.toFixed(2) || '0.00'}</td>
                      <td className="px-6 py-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{o.orderStatus}</span></td>
                    </tr>
                  ))}
                  {orders.length === 0 && <tr><td colSpan="5" className="p-8 text-center bg-gray-50">No orders yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
            <div className="card overflow-hidden">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {usersList.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {u.email !== user.email && (
                          <button 
                            onClick={() => handleRoleChange(u._id, u.role === 'admin' ? 'user' : 'admin')}
                            className="text-sm font-semibold text-primary hover:text-green-800"
                          >
                            {u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {usersList.length === 0 && <tr><td colSpan="4" className="p-8 text-center bg-gray-50">No users found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
