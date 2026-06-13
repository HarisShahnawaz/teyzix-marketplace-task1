import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const ProviderDashboard = () => {
  const { user } = useContext(AuthContext);
  const [myServices, setMyServices] = useState([]);
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [price, setPrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  const fetchData = async () => {
    try {
      const servicesRes = await axios.get('http://localhost:5000/api/services');
      const filteredServices = servicesRes.data.filter(
        (s) => (s.createdBy?._id || s.createdBy) === user?._id
      );
      setMyServices(filteredServices);

      const ordersRes = await axios.get('http://localhost:5000/api/requests/my-requests');
      setIncomingOrders(ordersRes.data);
    } catch (error) {
      console.error("Error fetching provider dashboard data:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/services', {
        title,
        description,
        category,
        price: Number(price),
        deliveryTime: `${deliveryTime} Days`
      });
      alert('🚀 Service published successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setDeliveryTime('');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create service');
    }
  };

 const handleUpdateStatus = async (orderId, newStatus) => {
    let formattedStatus = newStatus;
    if (newStatus === 'accepted') formattedStatus = 'Accepted';
    if (newStatus === 'rejected') formattedStatus = 'Rejected'; 
    if (newStatus === 'completed') formattedStatus = 'Completed';

    try {
      await axios.put(`http://localhost:5000/api/requests/${orderId}`, {
        status: formattedStatus
      });
      
      alert(`💼 Order status marked as ${formattedStatus}!`);
      fetchData();
    } catch (error) {
      console.log("=== BACKEND STATUS UPDATE ERROR ===");
      console.log(error.response?.data);
      console.log("===================================");
      alert(error.response?.data?.error || error.response?.data?.message || 'Failed to update order status.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans"
    >
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 dark:from-green-700 dark:to-teal-800 rounded-2xl p-8 text-white shadow-md mb-10 transition-all duration-300 ease-in-out">
        <h1 className="text-3xl font-bold tracking-tight">Seller Workspace</h1>
        <p className="text-green-100 dark:text-green-200 mt-1 text-sm transition-colors duration-300">Welcome back, {user?.name}. Manage your listings and fulfill client requests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Create Service Form - lg:col-span-1 */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md h-fit transition-all duration-300 ease-in-out"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 transition-colors duration-300">Create New Service</h2>
          <form onSubmit={handleCreateService} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2 transition-colors duration-300">Service Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all duration-300" placeholder="e.g. Full Stack Web Application"/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2 transition-colors duration-300">Description</label>
              <textarea rows="3" required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all duration-300" placeholder="Describe your freelance service details..."></textarea>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2 transition-colors duration-300">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-800 focus:ring-2 focus:ring-green-500 outline-none text-slate-900 dark:text-slate-100 transition-all duration-300">
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2 transition-colors duration-300">Price ($)</label>
                <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all duration-300" placeholder="50"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2 transition-colors duration-300">Delivery (Days)</label>
                <input type="number" required value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all duration-300" placeholder="7"/>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              type="submit" 
              className="w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-md"
            >
              Publish Service
            </motion.button>
          </form>
        </motion.div>

        {/* Right Columns: Active Services & Incoming Orders - lg:col-span-3 */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Section: Incoming Project Orders */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-4 transition-colors duration-300">Incoming Client Orders</h2>
            {loadingOrders ? (
              <div className="animate-pulse space-y-3">
                <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors duration-300"></div>
              </div>
            ) : incomingOrders.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm text-center text-sm text-slate-400 dark:text-slate-500 transition-all duration-300 ease-in-out">
                No clients have ordered your services yet. Active listings will show orders here!
              </div>
            ) : (
              <div className="space-y-4">
                {incomingOrders.map((order) => (
                  <motion.div
                    key={order._id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-xl dark:shadow-none flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 transition-all duration-300 ease-in-out"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">{order.service?.title || 'Freelance Gig'}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider transition-colors duration-300 ${
                          order.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                          order.status === 'accepted' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                          order.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400'
                        }`}>
                          {order.status || 'pending'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 transition-colors duration-300"><strong className="text-slate-700 dark:text-slate-300">Client:</strong> {order.customer?.name} ({order.customer?.email})</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 transition-colors duration-300"><strong className="text-slate-700 dark:text-slate-300">Requirements:</strong> "{order.requirements}"</p>
                    </div>

                    <div className="flex items-center space-x-4 justify-between sm:justify-end border-t sm:border-0 pt-3 sm:pt-0">
                      <span className="text-lg font-black text-green-600 dark:text-green-400 transition-colors duration-300">${order.budget || order.service?.price}</span>
                      
                      <div className="flex space-x-2">
                        {(order.status === 'Pending' || !order.status) && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleUpdateStatus(order._id, 'accepted')} 
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-all duration-300 shadow-sm"
                            >
                              Accept
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleUpdateStatus(order._id, 'completed')}
                              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 rounded-lg text-xs font-semibold transition-all duration-300"
                            >
                              Reject
                            </motion.button>
                          </>
                        )}
                        {order.status === 'Accepted' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleUpdateStatus(order._id, 'completed')} 
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white rounded-lg text-xs font-semibold transition-all duration-300 shadow-sm"
                          >
                            Mark Complete
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Active Service Listings */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-4 transition-colors duration-300">Your Active Service Listings</h2>
            {myServices.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm text-center text-sm text-slate-400 dark:text-slate-500 transition-all duration-300 ease-in-out">
                You haven't listed any services yet. Use the sidebar form to post your first gig!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myServices.map((service) => (
                  <motion.div
                    key={service._id}
                    whileHover={{ y: -4, scale: 1.015 }}
                    className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-xl dark:shadow-none flex flex-col justify-between transition-all duration-300 ease-in-out"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg transition-colors duration-300">{service.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 line-clamp-2 transition-colors duration-300">{service.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
                      <span className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded transition-colors duration-300">
                        {service.category}
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400 transition-colors duration-300">${service.price}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProviderDashboard;