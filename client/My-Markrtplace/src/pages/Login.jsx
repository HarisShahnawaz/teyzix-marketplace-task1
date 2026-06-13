import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await login(email, password);
      
      if (userData.role === 'provider') {
        navigate('/provider-dashboard');
      } else if (userData.role === 'customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-all duration-300 ease-in-out"
    >
      <motion.form
        whileHover={{ y: -4 }}
        onSubmit={handleSubmit} 
        className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-slate-800 space-y-6 transition-all duration-300 ease-in-out"
      >
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 tracking-tight transition-colors duration-300">Sign In</h2>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm transition-all duration-300" 
            placeholder="you@example.com"
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm transition-all duration-300" 
            placeholder="••••••••"
            required 
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          type="submit" 
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Signing In...' : 'Login'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Login;