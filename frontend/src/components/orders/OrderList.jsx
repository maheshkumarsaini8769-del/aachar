import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import {
  Package,
  Search,
  Filter,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  ExternalLink,
  Phone,
  MapPin,
  Tag,
  DollarSign
} from 'lucide-react';

export const OrderList = () => {
  const { token, tenant } = useAuth();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Ship modal inputs
  const [courierPartner, setCourierPartner] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [showShipModal, setShowShipModal] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedStatus !== 'ALL') params.append('orderStatus', selectedStatus);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }

      // Fetch stats
      const statsRes = await fetch('/api/orders/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus, searchQuery]);

  const handleUpdateStatus = async (orderId, newStatus, extraData = {}) => {
    try {
      setIsUpdating(true);
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderStatus: newStatus,
          note: extraData.note || `Order status updated to ${newStatus}`,
          courierPartner: extraData.courierPartner,
          trackingNumber: extraData.trackingNumber,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedOrder(data.data);
        fetchOrders();
        setShowShipModal(false);
        setCourierPartner('');
        setTrackingNumber('');
        setStatusNote('');
      } else {
        alert(data.message || 'Failed to update order status');
      }
    } catch (err) {
      alert(err.message || 'Error updating order status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      NEW: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', label: 'New Order' },
      CONFIRMED: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', label: 'Confirmed' },
      PROCESSING: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', label: 'Processing' },
      SHIPPED: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', label: 'Shipped' },
      DELIVERED: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', label: 'Delivered' },
      CANCELLED: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', label: 'Cancelled' },
    };
    const c = config[status] || config.NEW;
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${c.bg} ${c.border} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* KPI Stats Bar */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="text-xs text-slate-500">Total Orders</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalOrders}</div>
            <div className="text-[11px] text-indigo-400 mt-1">Live customer orders</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="text-xs text-slate-500">Total Net Revenue</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              ₹{(stats.revenue?.totalRevenue || 0).toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              COD: ₹{(stats.revenue?.codRevenue || 0).toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="text-xs text-slate-500">Action Required</div>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {(stats.statusCounts?.NEW || 0) + (stats.statusCounts?.CONFIRMED || 0)}
            </div>
            <div className="text-[11px] text-amber-400/80 mt-1">
              {stats.statusCounts?.NEW || 0} New, {stats.statusCounts?.CONFIRMED || 0} Confirmed
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="text-xs text-slate-500">In Transit & Shipped</div>
            <div className="text-2xl font-black text-cyan-400 mt-1">
              {stats.statusCounts?.SHIPPED || 0}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">
              {stats.statusCounts?.DELIVERED || 0} Delivered successfully
            </div>
          </div>
        </div>
      )}

      {/* Control Bar: Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white border border-slate-200 p-3 rounded-2xl shadow-xs">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {['ALL', 'NEW', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-medium transition whitespace-nowrap ${
                selectedStatus === st
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-800'
              }`}
            >
              {st === 'ALL' ? 'All Orders' : st}
              {stats?.statusCounts && st !== 'ALL' && (
                <span className="ml-1.5 text-[10px] opacity-75">
                  ({stats.statusCounts[st] || 0})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search order #, customer, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>
          <button
            onClick={fetchOrders}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
            title="Refresh Orders"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Source / Attribution</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-500">
                    <Package className="w-8 h-8 mx-auto text-slate-600 mb-2 opacity-50" />
                    No orders found matching the filter.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {order.orderNumber}
                      <div className="text-[10px] text-slate-500 font-normal">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{order.customerName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-500" />
                        {order.customerPhone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-[180px] truncate">
                        {order.items.map((i) => `${i.name} (${i.quantity})`).join(', ')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} units
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-medium text-slate-600 border border-slate-700">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(order.orderStatus)}</td>
                    <td className="py-3 px-4">
                      {order.attribution?.utmCampaign ? (
                        <div className="flex items-center gap-1 text-[11px] text-cyan-400">
                          <Tag className="w-3 h-3 text-cyan-400" />
                          <span className="max-w-[120px] truncate">{order.attribution.utmCampaign}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Direct / Storefront</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1 bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white rounded-lg font-medium transition text-xs flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 font-mono">{selectedOrder.orderNumber}</h3>
                    {getStatusBadge(selectedOrder.orderStatus)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-800 transition"
                >
                  ✕
                </button>
              </div>

              {/* Status Action Workflow Bar */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Update Order Lifecycle
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedOrder.orderStatus === 'NEW' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedOrder._id, 'CONFIRMED')}
                      disabled={isUpdating}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Confirm Order
                    </button>
                  )}

                  {(selectedOrder.orderStatus === 'NEW' || selectedOrder.orderStatus === 'CONFIRMED') && (
                    <button
                      onClick={() => setShowShipModal(true)}
                      disabled={isUpdating}
                      className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" /> Dispatch & Ship
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'SHIPPED' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedOrder._id, 'DELIVERED')}
                      disabled={isUpdating}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Mark Delivered
                    </button>
                  )}

                  {selectedOrder.orderStatus !== 'CANCELLED' && selectedOrder.orderStatus !== 'DELIVERED' && (
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this order?')) {
                          handleUpdateStatus(selectedOrder._id, 'CANCELLED', { note: 'Cancelled by merchant' });
                        }
                      }}
                      disabled={isUpdating}
                      className="px-3 py-1.5 rounded-xl bg-rose-900/40 hover:bg-rose-900/60 text-rose-300 font-semibold text-xs transition border border-rose-800/50"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Ship Modal Inline Accordion */}
              {showShipModal && (
                <div className="bg-cyan-50/50 p-4 rounded-2xl border border-cyan-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-cyan-400" />
                    Enter Dispatch & Courier Details
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-slate-500 block mb-1">Courier Partner</label>
                      <input
                        type="text"
                        placeholder="e.g. Delhivery, Bluedart"
                        value={courierPartner}
                        onChange={(e) => setCourierPartner(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-1">Tracking Number (AWB)</label>
                      <input
                        type="text"
                        placeholder="e.g. DLV12345678"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-500 text-xs block mb-1">Dispatch Note</label>
                    <input
                      type="text"
                      placeholder="Optional remarks"
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowShipModal(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder._id, 'SHIPPED', {
                          courierPartner,
                          trackingNumber,
                          note: statusNote || `Shipped via ${courierPartner || 'Courier'} (AWB: ${trackingNumber || 'N/A'})`,
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-semibold text-xs"
                    >
                      Confirm Dispatch
                    </button>
                  </div>
                </div>
              )}

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Shipping Destination
                  </div>
                  <div className="text-slate-600 font-medium">{selectedOrder.customerName}</div>
                  <div className="text-slate-500">
                    {selectedOrder.shippingAddress?.street}<br />
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                  </div>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/91${selectedOrder.customerPhone.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(
                        `Hi ${selectedOrder.customerName}, regarding your order ${selectedOrder.orderNumber} on ${tenant?.businessName || 'Omniva Store'}:`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
                    >
                      <Phone className="w-3 h-3" /> WhatsApp Customer
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" /> Tracking & Logistics
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">Courier Partner:</div>
                    <div className="text-slate-200 font-semibold">
                      {selectedOrder.courierPartner || 'Not assigned yet'}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">AWB / Tracking Number:</div>
                    <div className="text-slate-200 font-mono">
                      {selectedOrder.trackingNumber || 'N/A'}
                    </div>
                  </div>
                  {selectedOrder.attribution?.utmCampaign && (
                    <div>
                      <div className="text-slate-500 text-[10px]">Campaign Attribution:</div>
                      <div className="text-cyan-400 font-medium">
                        {selectedOrder.attribution.utmCampaign} ({selectedOrder.attribution.utmSource || 'meta'})
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Order Line Items ({selectedOrder.items?.length || 0})
                </div>
                <div className="divide-y divide-slate-100 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden text-xs">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        {item.variantName && (
                          <div className="text-[11px] text-slate-500">Variant: {item.variantName}</div>
                        )}
                        <div className="text-[10px] text-slate-500">
                          ₹{item.price} × {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold text-slate-900">₹{item.subtotal}</div>
                    </div>
                  ))}
                  <div className="p-3 bg-slate-50 flex items-center justify-between text-slate-500">
                    <span>Shipping Fee:</span>
                    <span>{selectedOrder.shippingFee === 0 ? 'FREE' : `₹${selectedOrder.shippingFee}`}</span>
                  </div>
                  <div className="p-3 bg-slate-100 flex items-center justify-between text-sm font-bold text-slate-900 border-t border-slate-200">
                    <span>Total Amount ({selectedOrder.paymentMethod}):</span>
                    <span className="text-emerald-400">₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Status Progression Timeline */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Timeline & Audit Trail
                </div>
                <div className="space-y-3 border-l-2 border-slate-800 ml-2 pl-4 text-xs">
                  {selectedOrder.timeline?.map((ev, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 border-white" />
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <span>{ev.status}</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {new Date(ev.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px]">{ev.note}</div>
                      <div className="text-slate-500 text-[10px]">by {ev.updatedBy}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-600 font-medium text-xs transition"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
