import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Calendar, Clock, Users, Phone, Mail, Edit, Trash2, CheckCircle, XCircle, Plus, LayoutDashboard, LogOut, Grid } from 'lucide-react';

export default function AdminPortal() {
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'bookings' | 'tables'>('bookings');
  const [tables, setTables] = useState<any[]>([]);
  
  // New booking form state
  const [newBooking, setNewBooking] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    session: 'Lunch', // Auto-determined normally, explicitly set here
    guests: 2,
    status: 'confirmed'
  });

  const ADMIN_EMAIL = 'nt10nitish@gmail.com';
  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (isAdmin) {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const bookingsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBookings(bookingsData);
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      const q = query(collection(db, 'tables'), orderBy('tableNumber', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tablesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTables(tablesData);
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  const initializeTables = async () => {
    try {
      const tablesRef = collection(db, 'tables');
      for (let i = 1; i <= 12; i++) {
        await addDoc(tablesRef, {
          tableNumber: i,
          name: `Table ${i}`,
          capacity: i % 3 === 0 ? 6 : (i % 5 === 0 ? 2 : 4),
          status: 'available',
        });
      }
      toast.success('Tables initialized successfully');
    } catch (error) {
      toast.error('Failed to initialize tables');
    }
  };

  const handleTableStatusChange = async (tableId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'tables', tableId), { status: newStatus });
    } catch (error) {
      toast.error('Failed to update table status');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== ADMIN_EMAIL) {
      toast.error('Unauthorized email address');
      return;
    }
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Admin logged in successfully');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Logged out');
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: newStatus
      });
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'bookings', bookingId));
        toast.success('Booking deleted');
      } catch (error) {
        toast.error('Failed to delete booking');
      }
    }
  };

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user?.uid || 'admin-created',
        ...newBooking,
        totalPrice: 0,
        packages: {},
        menuItems: {},
        createdAt: new Date().toISOString()
      });
      toast.success('Booking added manually');
      setIsAddingBooking(false);
      setNewBooking({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        session: 'Lunch',
        guests: 2,
        status: 'confirmed'
      });
    } catch (error) {
      toast.error('Failed to add booking');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-900">Admin Portal</h1>
            <p className="text-stone-500 mt-2">Sign in to manage bookings</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-stone-900 text-white font-medium py-3 rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50"
            >
              {isLoggingIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-900 flex items-center gap-2">
              <LayoutDashboard size={28} className="text-accent" />
              Thali Admin Dashboard
            </h1>
            <p className="text-stone-500 mt-1">Manage restaurant reservations and user bookings.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAddingBooking(!isAddingBooking)}
              className="bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              New Booking
            </button>
            <button
              onClick={handleLogout}
              className="bg-white text-stone-700 px-4 py-2 rounded-lg font-medium hover:bg-stone-50 transition-colors border border-stone-200 flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="flex space-x-1 bg-stone-200/50 p-1 rounded-xl w-full max-w-xs mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'bookings'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Reservations
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'tables'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Occupancy
          </button>
        </div>

        {activeTab === 'bookings' && isAddingBooking && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 mb-8"
          >
            <h2 className="text-xl font-bold text-stone-900 mb-4">Add Manual Booking</h2>
            <form onSubmit={handleAddBooking} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input required type="text" value={newBooking.name} onChange={e => setNewBooking({...newBooking, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input required type="email" value={newBooking.email} onChange={e => setNewBooking({...newBooking, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                <input required type="tel" value={newBooking.phone} onChange={e => setNewBooking({...newBooking, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Date</label>
                <input required type="date" value={newBooking.date} onChange={e => setNewBooking({...newBooking, date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Time</label>
                <input required type="time" value={newBooking.time} onChange={e => setNewBooking({...newBooking, time: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Session</label>
                <select value={newBooking.session} onChange={e => setNewBooking({...newBooking, session: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Guests</label>
                <input required type="number" min="1" value={newBooking.guests} onChange={e => setNewBooking({...newBooking, guests: parseInt(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Status</label>
                <select value={newBooking.status} onChange={e => setNewBooking({...newBooking, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="lg:col-span-4 flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setIsAddingBooking(false)} className="px-4 py-2 border text-stone-600 rounded-lg hover:bg-stone-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90">Add Booking</button>
              </div>
            </form>
          </motion.div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                <tr>
                  <th className="px-6 py-4">Guest Info</th>
                  <th className="px-6 py-4">Reservation</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900">{booking.name}</div>
                      <div className="text-stone-500 flex items-center gap-1 mt-1">
                        <Mail size={12} /> {booking.email}
                      </div>
                      <div className="text-stone-500 flex items-center gap-1 mt-1">
                        <Phone size={12} /> {booking.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900 flex items-center gap-1">
                        <Calendar size={14} className="text-stone-400" /> {booking.date}
                      </div>
                      <div className="text-stone-500 flex items-center gap-1 mt-1">
                        <Clock size={14} className="text-stone-400" /> {booking.time} ({booking.session})
                      </div>
                      <div className="text-stone-500 flex items-center gap-1 mt-1">
                        <Users size={14} className="text-stone-400" /> {booking.guests} Guests
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                        booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                        {booking.status === 'confirmed' && <CheckCircle size={12} />}
                        {booking.status === 'cancelled' && <XCircle size={12} />}
                        {booking.status === 'pending' && <Clock size={12} />}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="bg-white border border-stone-200 rounded-md text-xs px-2 py-1 focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button onClick={() => handleDelete(booking.id)} className="p-1 text-stone-400 hover:text-red-600 transition-colors" title="Delete Booking">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-stone-500">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {activeTab === 'tables' && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <Grid size={24} className="text-accent" />
                Current Occupancy
              </h2>
              {tables.length === 0 && (
                <button
                  onClick={initializeTables}
                  className="bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  Initialize Tables
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tables.map(table => (
                <div 
                  key={table.id}
                  className={`border rounded-xl p-4 transition-all duration-300 ${
                    table.status === 'available' ? 'bg-green-50 border-green-200 shadow-sm shadow-green-100/50' :
                    table.status === 'seated' ? 'bg-yellow-50 border-yellow-200 shadow-sm shadow-yellow-100/50' :
                    'bg-red-50 border-red-200 shadow-sm shadow-red-100/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-stone-900">{table.name}</h3>
                      <p className="text-xs text-stone-600 flex items-center gap-1 mt-1">
                        <Users size={12} /> {table.capacity} Seats
                      </p>
                    </div>
                    <span className={`w-3 h-3 rounded-full ${
                      table.status === 'available' ? 'bg-green-500' :
                      table.status === 'seated' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                  </div>
                  
                  <select
                    value={table.status}
                    onChange={(e) => handleTableStatusChange(table.id, e.target.value)}
                    className={`w-full text-sm font-medium rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-accent ${
                      table.status === 'available' ? 'bg-white text-green-800 border-green-200' :
                      table.status === 'seated' ? 'bg-white text-yellow-800 border-yellow-200' :
                      'bg-white text-red-800 border-red-200'
                    }`}
                  >
                    <option value="available">Available</option>
                    <option value="seated">Seated</option>
                    <option value="occupied">Occupied</option>
                  </select>
                </div>
              ))}
              
              {tables.length === 0 && (
                <div className="col-span-full py-12 text-center text-stone-500 border border-dashed border-stone-300 rounded-xl">
                  No tables configured. Click "Initialize Tables" to create default layout.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
