import { useState, useRef, useEffect } from 'react';
import {
  LayoutGrid,
  Wallet,
  Banknote,
  CreditCard,
  History,
  LogIn,
  LogOut,
  ChevronDown,
  ChevronRight,
  Bell,
  Menu,
  X,
  CalendarCheck,
  TrendingUp,
  Users,
  Star,
  UserPlus,
  UserMinus,
  ClipboardList,
  CalendarPlus,
  Printer,
  Receipt,
  Clock,
  Split,
  FileText,
  Search,
  Filter,
  Calendar,
  ArrowUpDown,
  Upload,
  File,
  Eye,
  Download,
  User,
  Home,
  Plus,
  Trash2,
  FileCheck,
  FileWarning,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Zap,
  Snowflake,
  Sun,
  Hotel,
} from 'lucide-react';

// ==================== DATA ====================
const ROOM_TYPES = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'];
const ROOM_NUMBERS = ['101', '102', '103', '104', '105', '201', '202', '203', '204', '205', '301', '302', '303', '304', '305'];
const ID_PROOF_TYPES = ['Aadhar Card', 'PAN Card', 'Passport', 'Driver License', 'Voter ID'];
const PAYMENT_MODES = ['Cash', 'Card', 'UPI'];
const ROOM_CATEGORIES = ['AC', 'Non-AC'];
const CHECKIN_DURATIONS = ['6 Hours', '12 Hours', '24 Hours'];

const STATUS_STYLES = {
  'Checked in': 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 border border-teal-300',
  'Confirmed': 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border border-indigo-300',
  'Checked out': 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-300',
  'Pending': 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300',
  'Advance Booking': 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300',
  'Time Expired': 'bg-gradient-to-r from-rose-100 to-rose-200 text-rose-800 border border-rose-300',
};

const TONE_STYLES = {
  indigo: 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700',
  teal: 'bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700',
  amber: 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700',
  rose: 'bg-gradient-to-br from-rose-100 to-rose-200 text-rose-700',
  violet: 'bg-gradient-to-br from-violet-100 to-violet-200 text-violet-700',
  purple: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700',
};

const ICON_RING_STYLES = {
  indigo: 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 group-hover:from-indigo-200 group-hover:to-indigo-300',
  teal: 'bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 group-hover:from-teal-200 group-hover:to-teal-300',
  amber: 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 group-hover:from-amber-200 group-hover:to-amber-300',
  violet: 'bg-gradient-to-br from-violet-100 to-violet-200 text-violet-600 group-hover:from-violet-200 group-hover:to-violet-300',
  purple: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 group-hover:from-purple-200 group-hover:to-purple-300',
};

// ==================== NOTIFICATION COMPONENT ====================
function NotificationBell({ notifications, onClear, onNotificationClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'time_expired': return <AlertTriangle size={14} className="text-rose-500" />;
      case 'checkin': return <LogIn size={14} className="text-teal-500" />;
      case 'checkout': return <LogOut size={14} className="text-amber-500" />;
      default: return <Bell size={14} className="text-indigo-500" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 flex items-center justify-center rounded-xl text-indigo-600 bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 shadow-sm"
      >
        <Bell size={18} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-96 overflow-y-auto">
          <div className="sticky top-0 bg-white p-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Notifications</span>
            {notifications.length > 0 && (
              <button 
                onClick={() => { onClear(); setIsOpen(false); }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <CheckCircle size={32} className="text-teal-500 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notif, index) => (
                <div 
                  key={index}
                  className={`p-3 hover:bg-slate-50 transition-all duration-200 cursor-pointer ${notif.read ? 'opacity-75' : ''}`}
                  onClick={() => { onNotificationClick(notif); setIsOpen(false); }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center flex-shrink-0">
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700">{notif.title}</p>
                      <p className="text-xs text-slate-500">{notif.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==================== MULTI-FILE UPLOAD COMPONENT ====================
function MultiFileUpload({ label, files, onFileChange, onRemoveFile, required, maxFiles = 5 }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      file.type === 'application/pdf' || 
      file.type.startsWith('image/')
    );
    
    const remainingSlots = maxFiles - files.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);
    
    if (filesToAdd.length > 0) {
      onFileChange([...files, ...filesToAdd]);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => 
      file.type === 'application/pdf' || 
      file.type.startsWith('image/')
    );
    
    const remainingSlots = maxFiles - files.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);
    
    if (filesToAdd.length > 0) {
      onFileChange([...files, ...filesToAdd]);
    }
    
    e.target.value = '';
  };

  const getFileIcon = (file) => {
    if (file.type === 'application/pdf') return <FileText size={16} className="text-red-500" />;
    if (file.type.startsWith('image/')) return <File size={16} className="text-blue-500" />;
    return <File size={16} className="text-slate-500" />;
  };

  const getFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
        {label} {required && <span className="text-rose-500">*</span>}
        <span className="text-xs font-normal text-slate-400 ml-2">({files.length}/{maxFiles})</span>
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.gif"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-full flex items-center justify-center mb-3">
            <Upload size={20} className="text-indigo-600" />
          </div>
          <p className="text-sm font-medium text-slate-600">
            Drop files here or click to upload
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Supports PDF, JPG, PNG (Max {maxFiles} files)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-slate-50 rounded-lg p-2 border border-slate-200 hover:border-indigo-200 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                {getFileIcon(file)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-[10px] text-slate-400">{getFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="p-1 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <Trash2 size={14} className="text-slate-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== CHECK-IN HISTORY MODAL ====================
function CheckInHistoryModal({ onClose, bookings }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const getCheckInHistory = () => {
    let history = bookings.filter(b => b.status === 'Checked in' || b.status === 'Time Expired');
    
    if (selectedDate) {
      history = history.filter(b => b.checkInDate === selectedDate);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      history = history.filter(b => 
        b.id.toLowerCase().includes(term) ||
        (b.guestName || b.customer || '').toLowerCase().includes(term) ||
        (b.roomNumber || b.room || '').includes(term)
      );
    }
    
    history.sort((a, b) => {
      const dateA = new Date(a.checkInDate + ' ' + (a.checkInTime || '12:00 PM'));
      const dateB = new Date(b.checkInDate + ' ' + (b.checkInTime || '12:00 PM'));
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    return history;
  };

  const history = getCheckInHistory();
  const totalCheckIns = history.length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-slate-200 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white flex items-center justify-center shadow-md">
              <LogIn size={18} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg">📋 Check-In History</h2>
              <p className="text-xs text-slate-500">View all check-in records</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-all">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl p-4 border border-slate-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-teal-600" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Search size={16} className="text-teal-600" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by ID, customer, room..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={16} className="text-teal-600" />
                <button
                  onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50 transition-all duration-200"
                >
                  {sortOrder === 'desc' ? 'Latest First' : 'Oldest First'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl p-4 border border-teal-200 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Check-Ins</p>
                <p className="text-2xl font-bold text-teal-700">{totalCheckIns}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Date</p>
                <p className="text-sm font-semibold text-slate-700">{selectedDate || 'All Dates'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Active Guests</p>
                <p className="text-2xl font-bold text-teal-700">
                  {bookings.filter(b => b.status === 'Checked in' && b.checkInDate === selectedDate).length}
                </p>
              </div>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <LogIn size={32} className="text-slate-400" />
              </div>
              <p className="text-lg font-semibold text-slate-600">No check-ins found</p>
              <p className="text-sm text-slate-400">Try adjusting your filters or date range</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((booking, index) => (
                <div
                  key={`${booking.id}-${index}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all duration-200 hover:border-teal-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                        <User size={18} className="text-teal-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-teal-600">{booking.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            booking.status === 'Checked in' ? 'bg-teal-100 text-teal-600' : 'bg-rose-100 text-rose-600'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="font-medium">{booking.guestName || booking.customer}</span>
                          <span className="text-slate-400">•</span>
                          <span>Room {booking.roomNumber || booking.room}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{booking.roomCategory || 'AC'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-700">
                          {booking.checkInTime || '12:00 PM'}
                        </p>
                        <p className="text-xs text-slate-400">{booking.duration || '24 Hours'}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                        booking.status === 'Checked in' ? 'bg-teal-100 text-teal-600' : 'bg-rose-100 text-rose-600'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  
                  {(booking.documents && booking.documents.length > 0) && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">Documents:</span>
                      {booking.documents.map((doc, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-lg bg-amber-50 text-amber-600 flex items-center gap-1">
                          <FileCheck size={12} />
                          {doc.name || `Doc ${idx + 1}`}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== CHECK-OUT HISTORY MODAL ====================
function CheckOutHistoryModal({ onClose, bookings }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const getCheckOutHistory = () => {
    let history = bookings.filter(b => b.status === 'Checked out');
    
    if (selectedDate) {
      history = history.filter(b => b.checkOutDate === selectedDate || b.checkInDate === selectedDate);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      history = history.filter(b => 
        b.id.toLowerCase().includes(term) ||
        (b.guestName || b.customer || '').toLowerCase().includes(term) ||
        (b.roomNumber || b.room || '').includes(term)
      );
    }
    
    history.sort((a, b) => {
      const dateA = new Date(a.checkOutDate || a.checkInDate || '2024-01-01');
      const dateB = new Date(b.checkOutDate || b.checkInDate || '2024-01-01');
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    return history;
  };

  const history = getCheckOutHistory();
  const totalCheckOuts = history.length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-slate-200 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md">
              <LogOut size={18} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg">🚪 Check-Out History</h2>
              <p className="text-xs text-slate-500">View all check-out records</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-all">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl p-4 border border-slate-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-amber-600" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Search size={16} className="text-amber-600" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by ID, customer, room..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={16} className="text-amber-600" />
                <button
                  onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50 transition-all duration-200"
                >
                  {sortOrder === 'desc' ? 'Latest First' : 'Oldest First'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-200 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Check-Outs</p>
                <p className="text-2xl font-bold text-amber-700">{totalCheckOuts}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Date</p>
                <p className="text-sm font-semibold text-slate-700">{selectedDate || 'All Dates'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Today's Revenue</p>
                <p className="text-2xl font-bold text-amber-700">
                  ₹{history.filter(h => h.checkOutDate === selectedDate).reduce((sum, h) => sum + (parseFloat(h.totalAmount) || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <LogOut size={32} className="text-slate-400" />
              </div>
              <p className="text-lg font-semibold text-slate-600">No check-outs found</p>
              <p className="text-sm text-slate-400">Try adjusting your filters or date range</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((booking, index) => (
                <div
                  key={`${booking.id}-${index}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all duration-200 hover:border-amber-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                        <User size={18} className="text-amber-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-amber-600">{booking.id}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            Checked out
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="font-medium">{booking.guestName || booking.customer}</span>
                          <span className="text-slate-400">•</span>
                          <span>Room {booking.roomNumber || booking.room}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{booking.roomCategory || 'AC'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-700">₹{parseFloat(booking.totalAmount || 0).toFixed(2)}</p>
                        <p className="text-xs text-slate-400">{booking.checkOutDate || booking.checkInDate}</p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">
                        Checked out
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== PAYMENT DETAILS MODAL ====================
function PaymentDetailsModal({ paymentType, onClose, bookings }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const getFilteredPayments = () => {
    let allPayments = [];

    bookings.forEach(booking => {
      if (booking.advancePayment && parseFloat(booking.advancePayment) > 0) {
        const paymentMode = booking.paymentMode || 'Cash';
        if (paymentType === 'all' || paymentMode === paymentType) {
          allPayments.push({
            bookingId: booking.id,
            customer: booking.guestName || booking.customer,
            room: booking.roomNumber || booking.room,
            amount: parseFloat(booking.advancePayment),
            mode: paymentMode,
            type: 'Advance Payment',
            date: booking.checkInDate || booking.createdAt || new Date().toISOString().split('T')[0],
            time: booking.time || '12:00 PM',
            status: booking.status,
          });
        }
      }

      if (booking.payments && booking.payments.length > 0) {
        booking.payments.forEach(payment => {
          if (paymentType === 'all' || payment.mode === paymentType) {
            allPayments.push({
              bookingId: booking.id,
              customer: booking.guestName || booking.customer,
              room: booking.roomNumber || booking.room,
              amount: payment.amount,
              mode: payment.mode,
              type: 'Split Payment',
              date: payment.date ? payment.date.split(',')[0] : booking.checkInDate || new Date().toISOString().split('T')[0],
              time: payment.date || booking.time || '12:00 PM',
              status: booking.status,
            });
          }
        });
      }

      if (booking.status === 'Checked out' && booking.totalAmount && parseFloat(booking.totalAmount) > 0) {
        const paymentMode = booking.paymentMode || 'Cash';
        if (paymentType === 'all' || paymentMode === paymentType) {
          allPayments.push({
            bookingId: booking.id,
            customer: booking.guestName || booking.customer,
            room: booking.roomNumber || booking.room,
            amount: parseFloat(booking.totalAmount),
            mode: paymentMode,
            type: 'Final Payment',
            date: booking.checkOutDate || booking.checkInDate || new Date().toISOString().split('T')[0],
            time: booking.time || '12:00 PM',
            status: booking.status,
          });
        }
      }
    });

    if (selectedDate) {
      allPayments = allPayments.filter(p => p.date === selectedDate);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      allPayments = allPayments.filter(p => 
        p.bookingId.toLowerCase().includes(term) ||
        p.customer.toLowerCase().includes(term) ||
        p.room.includes(term)
      );
    }

    allPayments.sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return allPayments;
  };

  const payments = getFilteredPayments();
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  const getTypeColor = (type) => {
    switch(type) {
      case 'Advance Payment': return 'text-purple-600 bg-purple-50';
      case 'Split Payment': return 'text-indigo-600 bg-indigo-50';
      case 'Final Payment': return 'text-teal-600 bg-teal-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'UPI': return <Wallet size={14} className="text-indigo-600" />;
      case 'Cash': return <Banknote size={14} className="text-emerald-600" />;
      case 'Card': return <CreditCard size={14} className="text-blue-600" />;
      default: return <Wallet size={14} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-slate-200 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
              paymentType === 'UPI' ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white' :
              paymentType === 'Cash' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' :
              paymentType === 'Card' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
              'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white'
            }`}>
              {paymentType === 'UPI' ? <Wallet size={18} /> :
               paymentType === 'Cash' ? <Banknote size={18} /> :
               paymentType === 'Card' ? <CreditCard size={18} /> :
               <LayoutGrid size={18} />}
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg">
                {paymentType === 'all' ? 'All Payments' : `Total ${paymentType}`} Details
              </h2>
              <p className="text-xs text-slate-500">View all payment transactions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-all">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl p-4 border border-slate-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-indigo-600" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Search size={16} className="text-indigo-600" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by ID, customer, room..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={16} className="text-indigo-600" />
                <button
                  onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50 transition-all duration-200"
                >
                  {sortOrder === 'desc' ? 'Latest First' : 'Oldest First'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl p-4 border border-indigo-200 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total {paymentType === 'all' ? 'Payments' : paymentType} Collected</p>
                <p className="text-2xl font-bold text-indigo-700">₹{totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Transactions</p>
                <p className="text-2xl font-bold text-indigo-700">{payments.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Date</p>
                <p className="text-sm font-semibold text-slate-700">{selectedDate || 'All Dates'}</p>
              </div>
            </div>
          </div>

          {payments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Wallet size={32} className="text-slate-400" />
              </div>
              <p className="text-lg font-semibold text-slate-600">No payments found</p>
              <p className="text-sm text-slate-400">Try adjusting your filters or date range</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment, index) => (
                <div
                  key={`${payment.bookingId}-${index}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all duration-200 hover:border-indigo-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
                        {getModeIcon(payment.mode)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-indigo-600">{payment.bookingId}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(payment.type)}`}>
                            {payment.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="font-medium">{payment.customer}</span>
                          <span className="text-slate-400">•</span>
                          <span>Room {payment.room}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{payment.mode}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-800">₹{payment.amount.toFixed(2)}</p>
                        <p className="text-xs text-slate-400">{payment.date} • {payment.time}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                        payment.status === 'Checked out' ? 'bg-slate-100 text-slate-600' :
                        payment.status === 'Checked in' ? 'bg-teal-100 text-teal-600' :
                        payment.status === 'Advance Booking' ? 'bg-purple-100 text-purple-600' :
                        payment.status === 'Time Expired' ? 'bg-rose-100 text-rose-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== SIDEBAR ====================
function NavItem({ icon: Icon, label, value, tone, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="group w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-indigo-100 hover:text-slate-900 transition-all duration-200"
    >
      <span className="flex items-center gap-2.5">
        <span className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200 ${ICON_RING_STYLES[tone]}`}>
          <Icon size={15} />
        </span>
        {label}
      </span>
      <span className="text-xs font-mono text-slate-500 font-semibold">{value}</span>
    </button>
  );
}

function Sidebar({ isOpen, onClose, stats, onPaymentTypeClick, onHistoryClick }) {
  const [historyOpen, setHistoryOpen] = useState(true);

  const NAV_LINKS = [
    { label: 'Total bookings', icon: LayoutGrid, value: stats.total, tone: 'indigo', type: 'all' },
    { label: 'Total UPI', icon: Wallet, value: stats.totalUPI, tone: 'indigo', type: 'UPI' },
    { label: 'Total cash', icon: Banknote, value: stats.totalCash, tone: 'teal', type: 'Cash' },
    { label: 'Total card', icon: CreditCard, value: stats.totalCard, tone: 'violet', type: 'Card' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300"
        />
      )}
      
      <aside
        className={`fixed top-0 left-0 z-40 w-72 h-full bg-gradient-to-b from-white to-indigo-50/30 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-indigo-100 bg-gradient-to-r from-indigo-600 to-indigo-700">
          <span className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <Hotel size={16} className="text-white" />
            </span>
            <span className="font-semibold text-white text-lg tracking-wide">Prime Hub Hotel</span>
          </span>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 hover:scale-105 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_LINKS.map((item) => (
            <NavItem 
              key={item.label} 
              {...item} 
              onClick={() => {
                onClose();
                if (item.type === 'all') {
                  onPaymentTypeClick('all');
                } else {
                  onPaymentTypeClick(item.type);
                }
              }}
            />
          ))}

          <div className="pt-2">
            <button
              onClick={() => setHistoryOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-rose-100 transition-all duration-200"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-md flex items-center justify-center bg-gradient-to-br from-rose-100 to-rose-200 text-rose-600">
                  <History size={15} />
                </span>
                History
              </span>
              {historyOpen ? (
                <ChevronDown size={15} className="text-slate-500" />
              ) : (
                <ChevronRight size={15} className="text-slate-500" />
              )}
            </button>

            {historyOpen && (
              <div className="ml-[1.6rem] mt-1 space-y-0.5 border-l-2 border-rose-200 pl-3">
                <button 
                  onClick={() => {
                    onClose();
                    onHistoryClick('checkin');
                  }}
                  className="w-full flex items-center gap-2 py-2 text-sm text-slate-600 hover:text-teal-700 hover:bg-teal-50 px-2 rounded-lg transition-all duration-200"
                >
                  <LogIn size={14} className="text-teal-500" />
                  Check-in History
                </button>
                <button 
                  onClick={() => {
                    onClose();
                    onHistoryClick('checkout');
                  }}
                  className="w-full flex items-center gap-2 py-2 text-sm text-slate-600 hover:text-amber-700 hover:bg-amber-50 px-2 rounded-lg transition-all duration-200"
                >
                  <LogOut size={14} className="text-amber-500" />
                  Check-out History
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

// ==================== FORM COMPONENTS ====================
function FormInput({ label, name, type = 'text', value, onChange, required, options, placeholder, min, step, disabled }) {
  if (type === 'select') {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <select
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
        >
          <option value="">Select {label}</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <textarea
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={3}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none disabled:bg-slate-100 disabled:cursor-not-allowed"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        step={step}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}

// ==================== BILL SPLIT & RECEIPT COMPONENT ====================
function BillSplitAndReceipt({ booking, onClose, onPrint }) {
  const [splitAmount, setSplitAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [payments, setPayments] = useState([]);
  const printRef = useRef();

  const totalAmount = parseFloat(booking.totalAmount) || parseFloat(booking.roomCharges) || 0;
  const advancePaid = parseFloat(booking.advancePaid) || parseFloat(booking.advancePayment) || 0;
  const balanceDue = totalAmount - advancePaid;

  const handleAddPayment = () => {
    if (!splitAmount || parseFloat(splitAmount) <= 0) return;
    const amount = parseFloat(splitAmount);
    const newPayment = {
      id: Date.now(),
      amount: amount,
      mode: paymentMode,
      date: new Date().toLocaleString(),
    };
    setPayments([...payments, newPayment]);
    setSplitAmount('');
  };

  const handlePrint = () => {
    onPrint(booking, payments);
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head><title>Receipt - ${booking.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .border-top { border-top: 2px solid #333; }
            .mt-4 { margin-top: 16px; }
            .mb-4 { margin-bottom: 16px; }
          </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
    onClose();
  };

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remainingBalance = balanceDue - totalPaid;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Receipt size={18} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg">Bill Split & Receipt</h2>
              <p className="text-xs text-slate-500">Booking: {booking.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-all">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl p-4 border border-indigo-200 mb-4">
              <h3 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
                <Wallet size={16} className="text-indigo-600" />
                Payment Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Amount</span>
                  <span className="font-bold">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Advance Paid</span>
                  <span className="font-bold text-teal-600">₹{advancePaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-indigo-200 pt-2">
                  <span className="font-semibold">Balance Due</span>
                  <span className="font-bold text-amber-600">₹{balanceDue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Paid Now</span>
                  <span className="font-bold text-teal-600">₹{totalPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-indigo-200 pt-2">
                  <span className="font-semibold">Remaining</span>
                  <span className={`font-bold ${remainingBalance > 0 ? 'text-rose-600' : 'text-teal-600'}`}>
                    ₹{remainingBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
                <Split size={16} className="text-purple-600" />
                Split Payment
              </h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="number"
                  value={splitAmount}
                  onChange={(e) => setSplitAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {PAYMENT_MODES.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddPayment}
                className="w-full px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
              >
                <Split size={14} className="inline mr-1" />
                Add Split Payment
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={handlePrint}
                className="w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Printer size={16} className="inline mr-2" />
                Print Receipt
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
              <h3 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
                <Clock size={16} className="text-amber-600" />
                Payment History
              </h3>
              {payments.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">No payments recorded yet</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {payments.map((p, index) => (
                    <div key={p.id} className="flex items-center justify-between text-sm border-b border-slate-100 py-2">
                      <div>
                        <span className="font-medium">#{index + 1}</span>
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-slate-100">{p.mode}</span>
                      </div>
                      <span className="font-bold text-teal-600">₹{p.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div ref={printRef} className="hidden">
              <div className="p-8 max-w-md mx-auto bg-white">
                <div className="text-center border-b border-slate-300 pb-4 mb-4">
                  <h1 className="text-2xl font-bold text-indigo-700">Prime Hub Hotel</h1>
                  <p className="text-sm text-slate-500">123 Luxury Lane, City Center</p>
                  <p className="text-sm text-slate-500">Tel: +91 98765 43210</p>
                  <p className="text-sm text-slate-500">Email: info@primehubhotel.com</p>
                </div>
                
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-center">PAYMENT RECEIPT</h2>
                  <div className="flex justify-between text-sm mt-2">
                    <span>Receipt #: {booking.id}</span>
                    <span>Date: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Guest: {booking.guestName || booking.customer}</span>
                    <span>Room: {booking.roomNumber || booking.room}</span>
                  </div>
                </div>

                <table className="w-full text-sm mb-4">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Room Charges ({booking.roomType || 'Standard'})</td>
                      <td className="text-right">₹{totalAmount.toFixed(2)}</td>
                    </tr>
                    {parseFloat(booking.extraCharges) > 0 && (
                      <tr>
                        <td className="py-2">Extra Charges</td>
                        <td className="text-right">₹{parseFloat(booking.extraCharges).toFixed(2)}</td>
                      </tr>
                    )}
                    {parseFloat(booking.discount) > 0 && (
                      <tr>
                        <td className="py-2 text-rose-600">Discount</td>
                        <td className="text-right text-rose-600">-₹{parseFloat(booking.discount).toFixed(2)}</td>
                      </tr>
                    )}
                    <tr className="border-t border-slate-300">
                      <td className="py-2 font-bold">Total</td>
                      <td className="text-right font-bold">₹{totalAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Advance Paid</td>
                      <td className="text-right text-teal-600">-₹{advancePaid.toFixed(2)}</td>
                    </tr>
                    <tr className="border-t border-slate-300">
                      <td className="py-2 font-bold">Amount Paid</td>
                      <td className="text-right font-bold text-teal-600">₹{totalPaid.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Balance</td>
                      <td className={`text-right font-bold ${remainingBalance > 0 ? 'text-amber-600' : 'text-teal-600'}`}>
                        ₹{remainingBalance.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="border-t border-slate-300 pt-4">
                  <h4 className="font-semibold text-sm">Payment Details:</h4>
                  {payments.map((p, index) => (
                    <div key={p.id} className="flex justify-between text-sm">
                      <span>Payment #{index + 1} ({p.mode})</span>
                      <span>₹{p.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center text-xs text-slate-400 mt-8 pt-4 border-t border-slate-300">
                  <p>Thank you for choosing Prime Hub Hotel!</p>
                  <p>We hope you had a pleasant stay.</p>
                  <p className="mt-2">** This is a system generated receipt **</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ADVANCE BOOKING FORM ====================
function AdvanceBookingForm({ onBooking, onCancel, bookingCounter }) {
  const [formData, setFormData] = useState({
    bookingId: `HB-${String(bookingCounter).padStart(4, '0')}`,
    guestName: '',
    phoneNumber: '',
    email: '',
    roomNumber: '',
    roomType: '',
    roomCategory: 'AC',
    numberOfGuests: '1',
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '',
    duration: '24 Hours',
    idProofType: '',
    idProofNumber: '',
    documents: [],
    advancePayment: '',
    paymentMode: '',
    specialRequests: '',
    bookingType: '',
    status: 'Advance Booking',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (files) => {
    setFormData(prev => ({ 
      ...prev, 
      documents: files.map(f => ({
        name: f.name,
        size: f.size,
        type: f.type,
        file: f,
        uploadedAt: new Date().toISOString()
      }))
    }));
  };

  const handleRemoveDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      id: formData.bookingId,
      customer: formData.guestName,
      room: formData.roomNumber,
      status: 'Advance Booking',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString().split('T')[0],
      ...formData,
      bookingType: formData.bookingType || 'Offline / Walk-in',
      checkInTime: formData.checkInTime || '12:00 PM',
      totalAmount: 0,
      payments: [],
      balanceDue: parseFloat(formData.advancePayment) || 0,
      documents: formData.documents.map(d => ({ name: d.name, size: d.size, type: d.type })),
    };
    onBooking(newBooking);
    setFormData({
      bookingId: `HB-${String(bookingCounter + 1).padStart(4, '0')}`,
      guestName: '',
      phoneNumber: '',
      email: '',
      roomNumber: '',
      roomType: '',
      roomCategory: 'AC',
      numberOfGuests: '1',
      checkInDate: '',
      checkOutDate: '',
      checkInTime: '',
      duration: '24 Hours',
      idProofType: '',
      idProofNumber: '',
      documents: [],
      advancePayment: '',
      paymentMode: '',
      specialRequests: '',
      bookingType: '',
      status: 'Advance Booking',
    });
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-purple-100 shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center shadow-md">
            <CalendarPlus size={18} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-lg">📅 Advance Booking</h2>
            <p className="text-xs text-purple-600 font-medium">Pre-register guest</p>
          </div>
        </div>
        <button onClick={onCancel} className="p-2 rounded-lg hover:bg-slate-100 transition-all">
          <X size={20} className="text-slate-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormInput label="Booking ID" name="bookingId" value={formData.bookingId} onChange={handleChange} disabled />
        <FormInput label="Guest Name" name="guestName" value={formData.guestName} onChange={handleChange} required placeholder="Enter full name" />
        <FormInput label="Phone Number" type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required placeholder="Enter phone number" />
        <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="guest@email.com" />
        <FormInput label="Room Number" type="select" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required options={ROOM_NUMBERS} />
        <FormInput label="Room Type" type="select" name="roomType" value={formData.roomType} onChange={handleChange} required options={ROOM_TYPES} />
        <FormInput label="Room Category" type="select" name="roomCategory" value={formData.roomCategory} onChange={handleChange} required options={ROOM_CATEGORIES} />
        <FormInput label="Number of Guests" type="number" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange} required min="1" placeholder="1" />
        <FormInput label="Check-In Date" type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required />
        <FormInput label="Check-In Time" type="time" name="checkInTime" value={formData.checkInTime} onChange={handleChange} />
        <FormInput label="Duration" type="select" name="duration" value={formData.duration} onChange={handleChange} required options={CHECKIN_DURATIONS} />
        <FormInput label="Check-Out Date" type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required />
        <FormInput label="ID Proof Type" type="select" name="idProofType" value={formData.idProofType} onChange={handleChange} required options={ID_PROOF_TYPES} />
        <FormInput label="ID Proof Number" name="idProofNumber" value={formData.idProofNumber} onChange={handleChange} required placeholder="Enter ID number" />
        
        <div className="md:col-span-2 lg:col-span-3">
          <MultiFileUpload
            label="Upload Documents (PAN, Aadhar, etc.)"
            files={formData.documents}
            onFileChange={handleDocumentChange}
            onRemoveFile={handleRemoveDocument}
            maxFiles={10}
          />
        </div>

        <FormInput label="Advance Payment (₹)" type="number" name="advancePayment" value={formData.advancePayment} onChange={handleChange} min="0" step="100" placeholder="0" />
        <FormInput label="Payment Mode" type="select" name="paymentMode" value={formData.paymentMode} onChange={handleChange} options={PAYMENT_MODES} />
        <FormInput label="Booking Type" type="select" name="bookingType" value={formData.bookingType} onChange={handleChange} required options={['Online Booking', 'Offline / Walk-in']} />
        <div className="md:col-span-2 lg:col-span-3">
          <FormInput label="Special Requests" type="textarea" name="specialRequests" value={formData.specialRequests} onChange={handleChange} placeholder="Any special requests..." />
        </div>
        
        <div className="md:col-span-2 lg:col-span-3 flex gap-3 pt-2 border-t border-slate-200">
          <button type="submit" className="flex-1 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]">
            ✅ Create Booking
          </button>
          <button type="reset" className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-200">
            Clear
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all duration-200">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// ==================== CHECK-IN FORM ====================
function CheckInForm({ onCheckIn, onCancel, bookings, bookingCounter }) {
  const [formData, setFormData] = useState({
    bookingId: `HB-${String(bookingCounter).padStart(4, '0')}`,
    guestName: '',
    phoneNumber: '',
    email: '',
    roomNumber: '',
    roomType: '',
    roomCategory: 'AC',
    numberOfGuests: '1',
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '',
    duration: '24 Hours',
    idProofType: '',
    idProofNumber: '',
    documents: [],
    advancePayment: '',
    paymentMode: '',
    specialRequests: '',
    status: 'Checked in',
  });

  const handleBookingSelect = (e) => {
    const bookingId = e.target.value;
    const booking = bookings.find(b => b.id === bookingId && b.status === 'Advance Booking');
    if (booking) {
      setFormData(prev => ({
        ...prev,
        bookingId: bookingId,
        guestName: booking.guestName || '',
        phoneNumber: booking.phoneNumber || '',
        email: booking.email || '',
        roomNumber: booking.roomNumber || '',
        roomType: booking.roomType || '',
        roomCategory: booking.roomCategory || 'AC',
        numberOfGuests: booking.numberOfGuests || '1',
        checkInDate: booking.checkInDate || '',
        checkOutDate: booking.checkOutDate || '',
        checkInTime: booking.checkInTime || '',
        duration: booking.duration || '24 Hours',
        idProofType: booking.idProofType || '',
        idProofNumber: booking.idProofNumber || '',
        documents: booking.documents || [],
        advancePayment: booking.advancePayment || '',
        paymentMode: booking.paymentMode || '',
        specialRequests: booking.specialRequests || '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (files) => {
    setFormData(prev => ({ 
      ...prev, 
      documents: files.map(f => ({
        name: f.name,
        size: f.size,
        type: f.type,
        file: f,
        uploadedAt: new Date().toISOString()
      }))
    }));
  };

  const handleRemoveDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      id: formData.bookingId,
      customer: formData.guestName,
      room: formData.roomNumber,
      status: 'Checked in',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString().split('T')[0],
      ...formData,
      checkInTime: formData.checkInTime || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      totalAmount: 0,
      payments: [],
      balanceDue: parseFloat(formData.advancePayment) || 0,
      documents: formData.documents.map(d => ({ name: d.name, size: d.size, type: d.type })),
      checkInTimestamp: new Date().getTime(),
    };
    onCheckIn(newBooking);
    setFormData({
      bookingId: `HB-${String(bookingCounter + 1).padStart(4, '0')}`,
      guestName: '',
      phoneNumber: '',
      email: '',
      roomNumber: '',
      roomType: '',
      roomCategory: 'AC',
      numberOfGuests: '1',
      checkInDate: '',
      checkOutDate: '',
      checkInTime: '',
      duration: '24 Hours',
      idProofType: '',
      idProofNumber: '',
      documents: [],
      advancePayment: '',
      paymentMode: '',
      specialRequests: '',
      status: 'Checked in',
    });
  };

  const advanceBookings = bookings.filter(b => b.status === 'Advance Booking');

  return (
    <div className="bg-white rounded-2xl border-2 border-teal-100 shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white flex items-center justify-center shadow-md">
            <LogIn size={18} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-lg">🛏️ Check-In</h2>
            <p className="text-xs text-teal-600 font-medium">Guest arrival</p>
          </div>
        </div>
        <button onClick={onCancel} className="p-2 rounded-lg hover:bg-slate-100 transition-all">
          <X size={20} className="text-slate-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {advanceBookings.length > 0 && (
          <FormInput 
            label="Select Advance Booking" 
            type="select" 
            name="bookingId" 
            value={formData.bookingId} 
            onChange={handleBookingSelect} 
            options={advanceBookings.map(b => b.id)} 
          />
        )}
        <FormInput label="Booking ID" name="bookingId" value={formData.bookingId} onChange={handleChange} disabled />
        <FormInput label="Guest Name" name="guestName" value={formData.guestName} onChange={handleChange} required placeholder="Enter full name" />
        <FormInput label="Phone Number" type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required placeholder="Enter phone number" />
        <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="guest@email.com" />
        <FormInput label="Room Number" type="select" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required options={ROOM_NUMBERS} />
        <FormInput label="Room Type" type="select" name="roomType" value={formData.roomType} onChange={handleChange} required options={ROOM_TYPES} />
        <FormInput label="Room Category" type="select" name="roomCategory" value={formData.roomCategory} onChange={handleChange} required options={ROOM_CATEGORIES} />
        <FormInput label="Number of Guests" type="number" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange} required min="1" placeholder="1" />
        <FormInput label="Check-In Date" type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required />
        <FormInput label="Check-In Time" type="time" name="checkInTime" value={formData.checkInTime} onChange={handleChange} />
        <FormInput label="Duration" type="select" name="duration" value={formData.duration} onChange={handleChange} required options={CHECKIN_DURATIONS} />
        <FormInput label="Check-Out Date" type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required />
        <FormInput label="ID Proof Type" type="select" name="idProofType" value={formData.idProofType} onChange={handleChange} required options={ID_PROOF_TYPES} />
        <FormInput label="ID Proof Number" name="idProofNumber" value={formData.idProofNumber} onChange={handleChange} required placeholder="Enter ID number" />
        
        <div className="md:col-span-2 lg:col-span-3">
          <MultiFileUpload
            label="Upload Documents (PAN, Aadhar, etc.)"
            files={formData.documents}
            onFileChange={handleDocumentChange}
            onRemoveFile={handleRemoveDocument}
            maxFiles={10}
          />
        </div>

        <FormInput label="Advance Payment (₹)" type="number" name="advancePayment" value={formData.advancePayment} onChange={handleChange} min="0" step="100" placeholder="0" />
        <FormInput label="Payment Mode" type="select" name="paymentMode" value={formData.paymentMode} onChange={handleChange} options={PAYMENT_MODES} />
        <div className="md:col-span-2 lg:col-span-3">
          <FormInput label="Special Requests" type="textarea" name="specialRequests" value={formData.specialRequests} onChange={handleChange} placeholder="Any special requests..." />
        </div>
        
        <div className="md:col-span-2 lg:col-span-3 flex gap-3 pt-2 border-t border-slate-200">
          <button type="submit" className="flex-1 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]">
            ✅ Check In
          </button>
          <button type="reset" className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-200">
            Clear
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all duration-200">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// ==================== CHECK-OUT FORM ====================
function CheckOutForm({ onCheckOut, onCancel, bookings, onShowBillSplit }) {
  const [formData, setFormData] = useState({
    bookingId: '',
    guestName: '',
    roomNumber: '',
    roomCategory: '',
    checkInDate: '',
    checkOutDate: '',
    duration: '',
    numberOfNights: '',
    roomCharges: '',
    extraCharges: '',
    discount: '',
    advancePaid: '',
    totalAmount: '',
    balanceAmount: '',
    paymentMode: '',
    remarks: '',
    status: 'Checked out',
  });

  const calculateDuration = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate - inDate;
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const calculateRoomCharges = (checkIn, checkOut, roomType, roomCategory) => {
    const rates = { 
      Standard: { AC: 2000, 'Non-AC': 1500 },
      Deluxe: { AC: 3500, 'Non-AC': 2800 },
      Suite: { AC: 5000, 'Non-AC': 4000 },
      Executive: { AC: 4500, 'Non-AC': 3500 },
      Presidential: { AC: 8000, 'Non-AC': 6500 }
    };
    const rate = rates[roomType]?.[roomCategory] || 2000;
    const nights = calculateDuration(checkIn, checkOut);
    return (rate * nights);
  };

  const handleBookingSelect = (e) => {
    const bookingId = e.target.value;
    const booking = bookings.find(b => b.id === bookingId && (b.status === 'Checked in' || b.status === 'Advance Booking'));
    if (booking) {
      const nights = calculateDuration(booking.checkInDate, booking.checkOutDate);
      const roomCharges = calculateRoomCharges(booking.checkInDate, booking.checkOutDate, booking.roomType, booking.roomCategory);
      const advance = parseFloat(booking.advancePayment) || 0;
      const total = roomCharges;
      const balance = total - advance;
      
      setFormData(prev => ({
        ...prev,
        bookingId: bookingId,
        guestName: booking.guestName || '',
        roomNumber: booking.roomNumber || '',
        roomCategory: booking.roomCategory || 'AC',
        checkInDate: booking.checkInDate || '',
        checkOutDate: booking.checkOutDate || '',
        duration: booking.duration || '24 Hours',
        numberOfNights: nights,
        roomCharges: roomCharges,
        advancePaid: advance,
        totalAmount: total,
        balanceAmount: balance > 0 ? balance : 0,
        paymentMode: booking.paymentMode || '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      if (name === 'extraCharges' || name === 'discount' || name === 'roomCharges') {
        const roomCharges = parseFloat(updated.roomCharges) || 0;
        const extra = parseFloat(updated.extraCharges) || 0;
        const discount = parseFloat(updated.discount) || 0;
        const advance = parseFloat(updated.advancePaid) || 0;
        const total = roomCharges + extra - discount;
        updated.totalAmount = total > 0 ? total : 0;
        const balance = total - advance;
        updated.balanceAmount = balance > 0 ? balance : 0;
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      id: formData.bookingId,
      customer: formData.guestName,
      room: formData.roomNumber,
      status: 'Checked out',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString().split('T')[0],
      ...formData,
    };
    onCheckOut(booking);
    setFormData({
      bookingId: '',
      guestName: '',
      roomNumber: '',
      roomCategory: '',
      checkInDate: '',
      checkOutDate: '',
      duration: '',
      numberOfNights: '',
      roomCharges: '',
      extraCharges: '',
      discount: '',
      advancePaid: '',
      totalAmount: '',
      balanceAmount: '',
      paymentMode: '',
      remarks: '',
      status: 'Checked out',
    });
  };

  const activeBookings = bookings.filter(b => b.status === 'Checked in' || b.status === 'Advance Booking');

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-100 shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md">
            <LogOut size={18} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-lg">🚪 Check-Out</h2>
            <p className="text-xs text-amber-600 font-medium">Guest departure</p>
          </div>
        </div>
        <button onClick={onCancel} className="p-2 rounded-lg hover:bg-slate-100 transition-all">
          <X size={20} className="text-slate-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormInput 
          label="Booking ID" 
          type="select" 
          name="bookingId" 
          value={formData.bookingId} 
          onChange={handleBookingSelect} 
          required 
          options={activeBookings.map(b => b.id)} 
        />
        <FormInput label="Guest Name" name="guestName" value={formData.guestName} onChange={handleChange} required disabled />
        <FormInput label="Room Number" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required disabled />
        <FormInput label="Room Category" name="roomCategory" value={formData.roomCategory} onChange={handleChange} required disabled />
        <FormInput label="Check-In Date" type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required disabled />
        <FormInput label="Check-Out Date" type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required disabled />
        <FormInput label="Duration" name="duration" value={formData.duration} onChange={handleChange} required disabled />
        <FormInput label="Number of Nights" type="number" name="numberOfNights" value={formData.numberOfNights} onChange={handleChange} required disabled />
        <FormInput label="Room Charges (₹)" type="number" name="roomCharges" value={formData.roomCharges} onChange={handleChange} required min="0" step="100" />
        <FormInput label="Extra Charges (₹)" type="number" name="extraCharges" value={formData.extraCharges} onChange={handleChange} min="0" step="100" placeholder="0" />
        <FormInput label="Discount (₹)" type="number" name="discount" value={formData.discount} onChange={handleChange} min="0" step="100" placeholder="0" />
        <FormInput label="Advance Paid (₹)" type="number" name="advancePaid" value={formData.advancePaid} onChange={handleChange} required min="0" step="100" disabled />
        <FormInput label="Total Amount (₹)" type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required min="0" step="100" disabled />
        <FormInput label="Balance Amount (₹)" type="number" name="balanceAmount" value={formData.balanceAmount} onChange={handleChange} required min="0" step="100" disabled />
        <FormInput label="Payment Mode" type="select" name="paymentMode" value={formData.paymentMode} onChange={handleChange} options={PAYMENT_MODES} />
        <div className="md:col-span-2 lg:col-span-3">
          <FormInput label="Remarks" type="textarea" name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Any remarks..." />
        </div>
        
        <div className="md:col-span-2 lg:col-span-3 flex gap-3 pt-2 border-t border-slate-200">
          <button type="submit" className="flex-1 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]">
            ✅ Check Out
          </button>
          <button 
            type="button" 
            onClick={() => {
              const booking = activeBookings.find(b => b.id === formData.bookingId);
              if (booking && parseFloat(formData.totalAmount) > 0) {
                onShowBillSplit({
                  ...booking,
                  ...formData,
                  totalAmount: formData.totalAmount,
                  roomCharges: formData.roomCharges,
                  extraCharges: formData.extraCharges,
                  discount: formData.discount,
                  advancePaid: formData.advancePaid,
                  balanceAmount: formData.balanceAmount,
                });
              }
            }}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            <Split size={14} className="inline mr-1" />
            Bill Split & Print
          </button>
          <button type="reset" className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-200">
            Clear
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all duration-200">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// ==================== METRIC CARD ====================
function MetricCard({ icon: Icon, label, value, hint, tone }) {
  const gradientColors = {
    indigo: 'from-indigo-50 to-indigo-100/50 border-indigo-200',
    teal: 'from-teal-50 to-teal-100/50 border-teal-200',
    amber: 'from-amber-50 to-amber-100/50 border-amber-200',
    rose: 'from-rose-50 to-rose-100/50 border-rose-200',
    purple: 'from-purple-50 to-purple-100/50 border-purple-200',
  };

  return (
    <div className={`bg-gradient-to-br ${gradientColors[tone]} rounded-2xl border shadow-sm px-4 py-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${TONE_STYLES[tone]} shadow-md`}>
          <Icon size={18} />
        </div>
        <span className="text-2xl opacity-20">✦</span>
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800 font-mono">{value}</p>
      {hint && <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block"></span>
        {hint}
      </p>}
    </div>
  );
}

// ==================== FOOTER CARD ====================
function FooterCard({ label, value, tone }) {
  const borderColors = {
    indigo: 'border-indigo-500',
    teal: 'border-teal-500',
    amber: 'border-amber-500',
    rose: 'border-rose-500',
    purple: 'border-purple-500',
  };

  const bgColors = {
    indigo: 'from-indigo-50 to-indigo-100/50',
    teal: 'from-teal-50 to-teal-100/50',
    amber: 'from-amber-50 to-amber-100/50',
    rose: 'from-rose-50 to-rose-100/50',
    purple: 'from-purple-50 to-purple-100/50',
  };

  return (
    <div
      className={`bg-gradient-to-br ${bgColors[tone]} rounded-xl border border-slate-200 border-l-4 ${borderColors[tone]} px-4 py-3 flex items-center justify-between sm:flex-col sm:items-start sm:gap-1 hover:shadow-md transition-all duration-200 cursor-pointer`}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</span>
      <span className="text-lg font-bold text-slate-800 font-mono">{value}</span>
    </div>
  );
}

// ==================== MAIN DASHBOARD ====================
export default function ReceptionDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [showBillSplit, setShowBillSplit] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(null);
  const [bookingCounter, setBookingCounter] = useState(5);
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([
    { 
      id: 'HB-0001', 
      customer: 'Aravind Menon', 
      room: '101', 
      status: 'Checked in', 
      time: '10:24 AM',
      guestName: 'Aravind Menon',
      roomNumber: '101',
      roomCategory: 'AC',
      checkInDate: '2026-09-01',
      checkOutDate: '2026-09-03',
      duration: '24 Hours',
      advancePayment: '5000',
      paymentMode: 'UPI',
      checkInTime: '10:00 AM',
      createdAt: '2026-09-01',
      checkInTimestamp: Date.now() - 3600000,
      documents: [
        { name: 'PAN_Aravind.pdf', size: 245760, type: 'application/pdf' },
        { name: 'Aadhar_Aravind.pdf', size: 512000, type: 'application/pdf' }
      ],
      payments: [
        { amount: 2000, mode: 'UPI', date: '2026-09-01, 10:00 AM' },
        { amount: 3000, mode: 'UPI', date: '2026-09-01, 10:30 AM' }
      ],
      totalAmount: 12000,
      roomCharges: 12000,
    },
    { 
      id: 'HB-0002', 
      customer: 'Priya Raghavan', 
      room: '204', 
      status: 'Checked in', 
      time: '9:52 AM',
      guestName: 'Priya Raghavan',
      roomNumber: '204',
      roomCategory: 'Non-AC',
      checkInDate: '2026-08-31',
      checkOutDate: '2026-09-02',
      duration: '6 Hours',
      advancePayment: '3000',
      paymentMode: 'Cash',
      checkInTime: '09:30 AM',
      createdAt: '2026-08-31',
      checkInTimestamp: Date.now() - 7200000,
      documents: [],
      payments: [],
      totalAmount: 0,
    },
    { 
      id: 'HB-0003', 
      customer: 'Vikram Shetty', 
      room: '310', 
      status: 'Checked out', 
      time: '9:10 AM',
      guestName: 'Vikram Shetty',
      roomNumber: '310',
      roomCategory: 'AC',
      checkInDate: '2026-08-30',
      checkOutDate: '2026-08-31',
      duration: '12 Hours',
      advancePayment: '4000',
      paymentMode: 'Card',
      checkInTime: '02:00 PM',
      createdAt: '2026-08-30',
      checkInTimestamp: Date.now() - 86400000,
      documents: [
        { name: 'PAN_Vikram.jpg', size: 102400, type: 'image/jpeg' }
      ],
      payments: [
        { amount: 4000, mode: 'Card', date: '2026-08-30, 02:00 PM' },
        { amount: 2500, mode: 'Card', date: '2026-08-31, 09:00 AM' }
      ],
      totalAmount: 6500,
      roomCharges: 6500,
    },
    { 
      id: 'HB-0004', 
      customer: 'Fatima Sheikh', 
      room: '112', 
      status: 'Advance Booking', 
      time: '8:47 AM',
      guestName: 'Fatima Sheikh',
      roomNumber: '112',
      roomCategory: 'AC',
      checkInDate: '2026-09-05',
      checkOutDate: '2026-09-07',
      duration: '24 Hours',
      advancePayment: '2000',
      paymentMode: 'UPI',
      checkInTime: '11:00 AM',
      createdAt: '2026-09-01',
      checkInTimestamp: null,
      documents: [],
      payments: [],
      totalAmount: 0,
    },
  ]);

  // Check for expired check-ins and create notifications
  useEffect(() => {
    const checkExpiredBookings = () => {
      const now = Date.now();
      const newNotifications = [];
      
      bookings.forEach(booking => {
        if (booking.status === 'Checked in' && booking.checkInTimestamp) {
          let durationMs = 0;
          switch(booking.duration) {
            case '6 Hours': durationMs = 6 * 60 * 60 * 1000; break;
            case '12 Hours': durationMs = 12 * 60 * 60 * 1000; break;
            case '24 Hours': durationMs = 24 * 60 * 60 * 1000; break;
            default: durationMs = 24 * 60 * 60 * 1000;
          }
          
          const expiryTime = booking.checkInTimestamp + durationMs;
          const timeRemaining = expiryTime - now;
          
          // Check if time has expired (within last 5 minutes)
          if (timeRemaining < 0 && timeRemaining > -300000) {
            // Check if we already have a notification for this booking
            const existingNotif = notifications.find(n => n.bookingId === booking.id && n.type === 'time_expired');
            if (!existingNotif) {
              newNotifications.push({
                id: Date.now() + Math.random(),
                bookingId: booking.id,
                type: 'time_expired',
                title: `⏰ Time Expired - Room ${booking.roomNumber}`,
                message: `${booking.guestName || booking.customer} check-in time has expired (${booking.duration})`,
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                read: false,
                booking: booking,
              });
              
              // Update booking status to Time Expired
              setBookings(prev => 
                prev.map(b => 
                  b.id === booking.id 
                    ? { ...b, status: 'Time Expired' }
                    : b
                )
              );
            }
          }
          
          // Warning notification - 30 minutes before expiry
          if (timeRemaining > 0 && timeRemaining < 1800000) {
            const existingWarning = notifications.find(n => 
              n.bookingId === booking.id && n.type === 'time_warning'
            );
            if (!existingWarning) {
              newNotifications.push({
                id: Date.now() + Math.random(),
                bookingId: booking.id,
                type: 'time_warning',
                title: `⚠️ Time Warning - Room ${booking.roomNumber}`,
                message: `${booking.guestName || booking.customer} check-in expires in ${Math.ceil(timeRemaining / 60000)} minutes`,
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                read: false,
                booking: booking,
              });
            }
          }
        }
      });
      
      if (newNotifications.length > 0) {
        setNotifications(prev => [...newNotifications, ...prev]);
      }
    };

    const interval = setInterval(checkExpiredBookings, 60000); // Check every minute
    checkExpiredBookings();
    
    return () => clearInterval(interval);
  }, [bookings]);

  const handleAdvanceBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    setBookingCounter(prev => prev + 1);
    setActiveForm(null);
    
    // Add notification
    setNotifications(prev => [{
      id: Date.now(),
      type: 'advance_booking',
      title: '📅 New Advance Booking',
      message: `${newBooking.guestName} - Room ${newBooking.roomNumber}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      booking: newBooking,
    }, ...prev]);
  };

  const handleCheckIn = (newBooking) => {
    setBookings(prev => {
      const filtered = prev.filter(b => b.id !== newBooking.id);
      return [newBooking, ...filtered];
    });
    setBookingCounter(prev => prev + 1);
    setActiveForm(null);
    
    setNotifications(prev => [{
      id: Date.now(),
      type: 'checkin',
      title: '✅ New Check-In',
      message: `${newBooking.guestName} checked in - Room ${newBooking.roomNumber}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      booking: newBooking,
    }, ...prev]);
  };

  const handleCheckOut = (checkedOutBooking) => {
    setBookings(prev => 
      prev.map(b => 
        b.id === checkedOutBooking.id 
          ? { ...b, status: 'Checked out', time: checkedOutBooking.time, ...checkedOutBooking }
          : b
      )
    );
    setActiveForm(null);
    
    setNotifications(prev => [{
      id: Date.now(),
      type: 'checkout',
      title: '🚪 New Check-Out',
      message: `${checkedOutBooking.guestName} checked out - Room ${checkedOutBooking.roomNumber}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      booking: checkedOutBooking,
    }, ...prev]);
  };

  const handlePrintReceipt = (booking, payments) => {
    setBookings(prev => 
      prev.map(b => 
        b.id === booking.id 
          ? { ...b, payments: [...(b.payments || []), ...payments] }
          : b
      )
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    
    // Open the booking details if needed
    if (notification.booking) {
      // You can add logic to show booking details
    }
  };

  const calculatePaymentTotals = () => {
    let totalUPI = 0;
    let totalCash = 0;
    let totalCard = 0;

    bookings.forEach(booking => {
      if (booking.advancePayment && parseFloat(booking.advancePayment) > 0) {
        const mode = booking.paymentMode || 'Cash';
        if (mode === 'UPI') totalUPI += parseFloat(booking.advancePayment);
        else if (mode === 'Cash') totalCash += parseFloat(booking.advancePayment);
        else if (mode === 'Card') totalCard += parseFloat(booking.advancePayment);
      }

      if (booking.payments) {
        booking.payments.forEach(payment => {
          if (payment.mode === 'UPI') totalUPI += payment.amount;
          else if (payment.mode === 'Cash') totalCash += payment.amount;
          else if (payment.mode === 'Card') totalCard += payment.amount;
        });
      }

      if (booking.status === 'Checked out' && booking.totalAmount) {
        const mode = booking.paymentMode || 'Cash';
        const totalSplit = (booking.payments || []).reduce((sum, p) => sum + p.amount, 0);
        const remaining = parseFloat(booking.totalAmount) - totalSplit;
        if (remaining > 0) {
          if (mode === 'UPI') totalUPI += remaining;
          else if (mode === 'Cash') totalCash += remaining;
          else if (mode === 'Card') totalCard += remaining;
        }
      }
    });

    return { totalUPI, totalCash, totalCard };
  };

  const { totalUPI, totalCash, totalCard } = calculatePaymentTotals();

  const stats = {
    total: bookings.length,
    checkedIn: bookings.filter(b => b.status === 'Checked in').length,
    checkedOut: bookings.filter(b => b.status === 'Checked out').length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    advance: bookings.filter(b => b.status === 'Advance Booking').length,
    timeExpired: bookings.filter(b => b.status === 'Time Expired').length,
    totalUPI: `₹${totalUPI.toFixed(2)}`,
    totalCash: `₹${totalCash.toFixed(2)}`,
    totalCard: `₹${totalCard.toFixed(2)}`,
  };

  const topCards = [
    { label: 'Booking id', value: bookings.length > 0 ? bookings[0].id : 'N/A', hint: 'Latest entry', icon: CalendarCheck, tone: 'indigo' },
    { label: 'Check-in', value: stats.checkedIn, hint: 'Active guests', icon: LogIn, tone: 'teal' },
    { label: 'Check-out', value: stats.checkedOut, hint: 'Today', icon: LogOut, tone: 'amber' },
    { label: 'Advance', value: stats.advance, hint: 'Future bookings', icon: CalendarPlus, tone: 'purple' },
  ];

  const footerCards = [
    { label: 'Booking', value: stats.total, tone: 'indigo' },
    { label: 'Check-in', value: stats.checkedIn, tone: 'teal' },
    { label: 'Check-out', value: stats.checkedOut, tone: 'amber' },
    { label: 'Expired', value: stats.timeExpired, tone: 'rose' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/50 to-amber-50/30">
      {showPaymentDetails && (
        <PaymentDetailsModal 
          paymentType={showPaymentDetails}
          onClose={() => setShowPaymentDetails(null)}
          bookings={bookings}
        />
      )}
      
      {showHistoryModal === 'checkin' && (
        <CheckInHistoryModal 
          onClose={() => setShowHistoryModal(null)}
          bookings={bookings}
        />
      )}
      
      {showHistoryModal === 'checkout' && (
        <CheckOutHistoryModal 
          onClose={() => setShowHistoryModal(null)}
          bookings={bookings}
        />
      )}
      
      {showBillSplit && (
        <BillSplitAndReceipt 
          booking={showBillSplit} 
          onClose={() => setShowBillSplit(null)}
          onPrint={handlePrintReceipt}
        />
      )}
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        stats={stats}
        onPaymentTypeClick={(type) => setShowPaymentDetails(type)}
        onHistoryClick={(type) => setShowHistoryModal(type)}
      />

      <div 
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'ml-72' : 'ml-0'
        }`}
      >
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b-2 border-indigo-100 shadow-sm">
          <div className="h-16 flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  <span className="text-indigo-600">Prime Hub Hotel</span>
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">
                  {stats.pending + stats.advance > 0 ? `📌 ${stats.pending + stats.advance} pending bookings` : '✨ All caught up!'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <NotificationBell 
                notifications={notifications}
                onClear={handleClearNotifications}
                onNotificationClick={handleNotificationClick}
              />
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-4 flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-full px-4 py-2 text-xs font-bold border-2 border-amber-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Pending: {stats.pending + stats.advance}
            </div>
            <div className="flex items-center gap-3 text-xs flex-wrap">
              <span className="text-teal-800 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full px-4 py-2 border-2 border-teal-300 font-bold shadow-sm">
                💰 Business today <span className="font-extrabold font-mono ml-1">₹18,400</span>
              </span>
              <span className="hidden sm:inline text-violet-800 bg-gradient-to-r from-violet-100 to-violet-200 rounded-full px-4 py-2 border-2 border-violet-300 font-bold shadow-sm">
                📊 Active guests <span className="font-extrabold font-mono ml-1">{stats.checkedIn}</span>
              </span>
              {stats.timeExpired > 0 && (
                <span className="text-rose-800 bg-gradient-to-r from-rose-100 to-rose-200 rounded-full px-4 py-2 border-2 border-rose-300 font-bold shadow-sm animate-pulse">
                  ⏰ Expired: {stats.timeExpired}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveForm('advance')}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105"
              >
                <CalendarPlus size={16} className="inline mr-1" />
                Advance
              </button>
              <button 
                onClick={() => setActiveForm('checkin')}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105"
              >
                <UserPlus size={16} className="inline mr-1" />
                Check In
              </button>
              <button 
                onClick={() => setActiveForm('checkout')}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105"
              >
                <UserMinus size={16} className="inline mr-1" />
                Check Out
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          {activeForm === 'advance' ? (
            <AdvanceBookingForm onBooking={handleAdvanceBooking} onCancel={() => setActiveForm(null)} bookingCounter={bookingCounter} />
          ) : activeForm === 'checkin' ? (
            <CheckInForm onCheckIn={handleCheckIn} onCancel={() => setActiveForm(null)} bookings={bookings} bookingCounter={bookingCounter} />
          ) : activeForm === 'checkout' ? (
            <CheckOutForm 
              onCheckOut={handleCheckOut} 
              onCancel={() => setActiveForm(null)} 
              bookings={bookings}
              onShowBillSplit={(booking) => setShowBillSplit(booking)}
            />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {topCards.map((card) => (
                  <MetricCard key={card.label} {...card} />
                ))}
              </div>

              <section className="bg-white rounded-2xl border-2 border-indigo-100 shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-b-2 border-indigo-100">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-md">
                      <ClipboardList size={18} />
                    </span>
                    <div>
                      <h2 className="font-bold text-slate-800 text-lg">📋 Activity Log</h2>
                      <p className="text-xs text-indigo-600 font-medium">All bookings</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded-lg bg-teal-100 text-teal-700 font-semibold">In: {stats.checkedIn}</span>
                    <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 font-semibold">Out: {stats.checkedOut}</span>
                    <span className="px-2 py-1 rounded-lg bg-purple-100 text-purple-700 font-semibold">Adv: {stats.advance}</span>
                    {stats.timeExpired > 0 && (
                      <span className="px-2 py-1 rounded-lg bg-rose-100 text-rose-700 font-semibold animate-pulse">Exp: {stats.timeExpired}</span>
                    )}
                  </div>
                </div>

                <div className="divide-y divide-indigo-50 max-h-96 overflow-y-auto">
                  {bookings.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <p className="text-lg font-semibold">No bookings yet</p>
                      <p className="text-sm">Start by creating an advance booking or check-in a guest</p>
                    </div>
                  ) : (
                    bookings.map((entry, index) => (
                      <div
                        key={entry.id}
                        className={`flex flex-wrap items-center justify-between gap-2 px-6 py-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-indigo-100/50 transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-indigo-50/30'
                        } ${entry.status === 'Time Expired' ? 'bg-rose-50/30' : ''}`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-wrap">
                          <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{entry.id}</span>
                          <span className="text-sm font-semibold text-slate-700 truncate">{entry.customer || entry.guestName}</span>
                          <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">Room {entry.room || entry.roomNumber}</span>
                          {entry.roomCategory && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${entry.roomCategory === 'AC' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                              {entry.roomCategory === 'AC' ? <Snowflake size={10} className="inline mr-0.5" /> : <Sun size={10} className="inline mr-0.5" />}
                              {entry.roomCategory}
                            </span>
                          )}
                          {entry.duration && (
                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Clock size={10} />
                              {entry.duration}
                            </span>
                          )}
                          {entry.paymentMode && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                              {entry.paymentMode}
                            </span>
                          )}
                          {entry.documents && entry.documents.length > 0 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 flex items-center gap-1">
                              <FileCheck size={10} />
                              {entry.documents.length} Docs
                            </span>
                          )}
                          {entry.status === 'Time Expired' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 flex items-center gap-1 animate-pulse">
                              <AlertTriangle size={10} />
                              Expired
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm ${STATUS_STYLES[entry.status] || STATUS_STYLES['Pending']}`}>
                            {entry.status}
                          </span>
                          <span className="text-xs font-mono text-slate-500 w-16 text-right">{entry.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {footerCards.map((card) => (
                  <FooterCard key={card.label} {...card} />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl p-4 border-2 border-emerald-200">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">Today's Revenue</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-800 mt-1">₹42,600</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700">Active Guests</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800 mt-1">{stats.checkedIn}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl p-4 border-2 border-purple-200">
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-purple-600" />
                    <span className="text-sm font-semibold text-purple-700">Rating</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800 mt-1">4.8 ★</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}