import React, { useState, useMemo, useRef } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Archive,
  Eye,
  CheckCircle2,
  AlertTriangle,
  X,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Boxes,
  Layers,
  ArrowUpDown,
  Tag,
  DollarSign,
  Info,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

const CATEGORIES = [
  { id: 'mango', name: 'Mango Pickle' },
  { id: 'nimbu', name: 'Lemon Pickle' },
  { id: 'mirchi', name: 'Red Chilli Pickle' },
  { id: 'green-mirch', name: 'Green Chilli Pickle' },
  { id: 'mixed', name: 'Mixed Pickle' },
  { id: 'garlic', name: 'Garlic Pickle' },
  { id: 'traditional', name: 'Traditional & Heritage' },
  { id: 'festive', name: 'Festive & Gift Boxes' }
];

const DEFAULT_BOXES = [
  { boxType: 'Single Jar Box', packCount: 1, price: 249, mrp: 299, description: 'Single Handcrafted Pickle Jar in Sturdy Kraft Carton Box', stock: 50 },
  { boxType: 'Duo Gift Box (2 Jars)', packCount: 2, price: 468, mrp: 598, description: 'Twin Jar Heritage Gift Box with Traditional Ribbon Tie', stock: 25 },
  { boxType: 'Family Treat Box (3 Jars)', packCount: 3, price: 672, mrp: 897, description: '3-Jar Value Box in Gold Foil Keepsake Box with Wooden Spoons', stock: 15 },
  { boxType: 'Royal Tasting Box (4 Jars)', packCount: 4, price: 876, mrp: 1196, description: '4-Jar Royal Hamper Box with Greeting Card and Brass Dipper', stock: 10 }
];

const DEFAULT_PACK_SIZES = [
  { size: '250 g', price: 149, mrp: 179, stock: 50, sku: '' },
  { size: '500 g', price: 249, mrp: 299, stock: 50, sku: '' },
  { size: '1 kg', price: 449, mrp: 549, stock: 30, sku: '' }
];

export const ProductsAdminManager = ({ onNavigate }) => {
  const {
    allAdminProducts,
    adminStats,
    adminLoading,
    createProduct,
    updateProduct,
    updateProductStatus,
    deleteProduct,
    uploadImage,
    uploadMultipleImages,
    refetchProducts
  } = useProducts();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStockFilter, setSelectedStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal / Drawer State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState('basic'); // 'basic', 'pricing', 'variants', 'boxes', 'images', 'details'
  const [formErrors, setFormErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // { id, name, orderCount, hasOrders }

  // Upload feedback state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Initial Form Data template
  const initialFormState = {
    id: '',
    name: '',
    hindiName: '',
    slug: '',
    category: 'mango',
    categoryName: 'Mango Pickles',
    price: 249,
    mrp: 299,
    salePrice: 249,
    discount: '17% OFF',
    sku: '',
    stockCount: 50,
    inStock: true,
    status: 'published',
    spiceLevel: 'Medium',
    badge: '',
    badgeType: '',
    isBestseller: false,
    isFeatured: false,
    image: '/images/products/marusthali-mango-jar.jpg',
    gallery: ['/images/products/marusthali-mango-jar.jpg'],
    packSizes: DEFAULT_PACK_SIZES,
    boxPricing: DEFAULT_BOXES,
    shortDesc: '',
    fullDesc: '',
    bullets: '',
    ingredients: '',
    shelfLife: '12 Months',
    storage: 'Store in a cool dry place. Use dry wooden or stainless steel spoon.'
  };

  const [formData, setFormData] = useState(initialFormState);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return allAdminProducts.filter(p => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesHindi = p.hindiName?.toLowerCase().includes(q);
        const matchesSlug = p.slug?.toLowerCase().includes(q);
        const matchesSku = p.sku?.toLowerCase().includes(q);
        const matchesCat = p.category?.toLowerCase().includes(q);
        if (!matchesName && !matchesHindi && !matchesSlug && !matchesSku && !matchesCat) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }

      // Stock status filter
      if (selectedStockFilter === 'in_stock' && (!p.inStock || p.stockCount <= 0)) {
        return false;
      }
      if (selectedStockFilter === 'low_stock' && (p.stockCount > 10 || p.stockCount <= 0)) {
        return false;
      }
      if (selectedStockFilter === 'out_of_stock' && p.stockCount > 0 && p.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [allAdminProducts, searchQuery, selectedCategory, selectedStatus, selectedStockFilter, sortBy]);

  // Paginated slices
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Handlers for Form
  const openCreateModal = () => {
    setIsEditing(false);
    setFormData(initialFormState);
    setFormErrors([]);
    setFormSuccess('');
    setModalActiveTab('basic');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setFormData({
      ...product,
      bullets: Array.isArray(product.bullets) ? product.bullets.join('\n') : (product.bullets || ''),
      ingredients: Array.isArray(product.ingredients) ? product.ingredients.join(', ') : (product.ingredients || ''),
      packSizes: Array.isArray(product.packSizes) && product.packSizes.length > 0 ? product.packSizes : DEFAULT_PACK_SIZES,
      boxPricing: Array.isArray(product.boxPricing) && product.boxPricing.length > 0 ? product.boxPricing : DEFAULT_BOXES,
      gallery: Array.isArray(product.gallery) && product.gallery.length > 0 ? product.gallery : [product.image]
    });
    setFormErrors([]);
    setFormSuccess('');
    setModalActiveTab('basic');
    setIsModalOpen(true);
  };

  const handleSlugifyName = (val) => {
    setFormData(prev => ({
      ...prev,
      name: val,
      slug: !isEditing || !prev.slug ? val.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : prev.slug
    }));
  };

  const handleSingleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setUploadError('Invalid file type. Only JPG, PNG, WEBP and GIF are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size exceeds the 10MB limit.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError('');
      const res = await uploadImage(file);
      if (res.success && res.url) {
        setFormData(prev => ({
          ...prev,
          image: res.url,
          gallery: prev.gallery.includes(res.url) ? prev.gallery : [res.url, ...prev.gallery]
        }));
      } else {
        setUploadError(res.error || 'Failed to upload image');
      }
    } catch (err) {
      setUploadError(err.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleMultipleImagesUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setUploadError('');
      const res = await uploadMultipleImages(files);
      if (res.success && Array.isArray(res.urls)) {
        setFormData(prev => {
          const combined = [...prev.gallery];
          res.urls.forEach(u => {
            if (!combined.includes(u)) combined.push(u);
          });
          return {
            ...prev,
            gallery: combined,
            image: prev.image || res.urls[0]
          };
        });
      } else {
        setUploadError(res.error || 'Failed to upload gallery images');
      }
    } catch (err) {
      setUploadError(err.message || 'Error uploading files');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSetPrimaryImage = (url) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleRemoveGalleryImage = (idxToRemove) => {
    setFormData(prev => {
      const updated = prev.gallery.filter((_, idx) => idx !== idxToRemove);
      return {
        ...prev,
        gallery: updated,
        image: prev.image === prev.gallery[idxToRemove] ? (updated[0] || '') : prev.image
      };
    });
  };

  const handleMoveGalleryImage = (idx, direction) => {
    setFormData(prev => {
      const arr = [...prev.gallery];
      const targetIdx = direction === 'left' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= arr.length) return prev;
      const temp = arr[idx];
      arr[idx] = arr[targetIdx];
      arr[targetIdx] = temp;
      return { ...prev, gallery: arr };
    });
  };

  // Variant (Pack Size) Handlers
  const handleAddVariant = () => {
    setFormData(prev => ({
      ...prev,
      packSizes: [
        ...prev.packSizes,
        { size: '750 g', price: Math.round(prev.price * 1.4), mrp: Math.round(prev.mrp * 1.4), stock: 30, sku: '' }
      ]
    }));
  };

  const handleRemoveVariant = (idx) => {
    setFormData(prev => ({
      ...prev,
      packSizes: prev.packSizes.filter((_, i) => i !== idx)
    }));
  };

  const handleUpdateVariant = (idx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.packSizes];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, packSizes: updated };
    });
  };

  // Box Sizes & Pricing Handlers
  const handleAddBox = () => {
    const nextCount = (formData.boxPricing?.length || 0) + 1;
    setFormData(prev => ({
      ...prev,
      boxPricing: [
        ...(prev.boxPricing || []),
        {
          boxType: `Special Gifting Box (${nextCount} Jars)`,
          packCount: nextCount,
          price: Math.round(prev.price * nextCount * 0.9),
          mrp: Math.round(prev.mrp * nextCount),
          description: 'Custom Handcrafted Gift Box with Personal Ribbon',
          stock: 20
        }
      ]
    }));
  };

  const handleRemoveBox = (idx) => {
    setFormData(prev => ({
      ...prev,
      boxPricing: prev.boxPricing.filter((_, i) => i !== idx)
    }));
  };

  const handleUpdateBox = (idx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.boxPricing];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, boxPricing: updated };
    });
  };

  // Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    // Client-side validations
    if (!formData.name?.trim()) errors.push('Product name is required.');
    if (!formData.category) errors.push('Category selection is required.');
    if (formData.price === undefined || Number(formData.price) < 0) errors.push('Valid non-negative selling price is required.');
    if (Number(formData.mrp) < Number(formData.price)) errors.push('MRP cannot be lower than selling price.');
    if (formData.stockCount === undefined || Number(formData.stockCount) < 0) errors.push('Stock count must be a non-negative number.');
    if (!formData.sku?.trim() && !isEditing) errors.push('SKU is required.');

    // Validate Variants
    formData.packSizes?.forEach((v, i) => {
      if (!v.size?.trim()) errors.push(`Variant #${i + 1} is missing a pack size label.`);
      if (v.price === undefined || Number(v.price) < 0) errors.push(`Variant #${i + 1} has an invalid price.`);
    });

    // Validate Boxes
    formData.boxPricing?.forEach((b, i) => {
      if (!b.boxType?.trim()) errors.push(`Box #${i + 1} is missing a box title/type.`);
      if (!b.packCount || Number(b.packCount) < 1) errors.push(`Box #${i + 1} pack count must be at least 1.`);
      if (b.price === undefined || Number(b.price) < 0) errors.push(`Box #${i + 1} has an invalid price.`);
    });

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setActionLoading(true);
      setFormErrors([]);

      const payload = {
        ...formData,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        salePrice: Number(formData.salePrice || formData.price),
        stockCount: Number(formData.stockCount),
        inStock: Number(formData.stockCount) > 0 && formData.inStock,
        bullets: typeof formData.bullets === 'string'
          ? formData.bullets.split('\n').map(s => s.trim()).filter(Boolean)
          : formData.bullets,
        ingredients: typeof formData.ingredients === 'string'
          ? formData.ingredients.split(',').map(s => s.trim()).filter(Boolean)
          : formData.ingredients,
        packSizes: formData.packSizes.map(v => ({
          ...v,
          price: Number(v.price),
          mrp: Number(v.mrp || Math.round(Number(v.price) * 1.2)),
          stock: Number(v.stock || 50)
        })),
        boxPricing: formData.boxPricing.map(b => ({
          ...b,
          packCount: Number(b.packCount),
          price: Number(b.price),
          mrp: Number(b.mrp || Math.round(Number(b.price) * 1.2)),
          stock: Number(b.stock || 50)
        }))
      };

      let res;
      if (isEditing) {
        res = await updateProduct(formData.id || formData._id, payload);
      } else {
        res = await createProduct(payload);
      }

      if (res.success) {
        setFormSuccess(`Product "${formData.name}" successfully ${isEditing ? 'updated' : 'created'}!`);
        setTimeout(() => {
          setIsModalOpen(false);
          setFormSuccess('');
        }, 1200);
      } else {
        setFormErrors([res.error || 'Failed to save product']);
      }
    } catch (err) {
      setFormErrors([err.message || 'Unexpected error occurred']);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Action Handler
  const confirmDelete = async (product) => {
    try {
      setActionLoading(true);
      const res = await deleteProduct(product.id || product._id);
      if (res.success) {
        setDeleteConfirmation(null);
      } else if (res.hasOrders) {
        // Show informative prompt to archive instead
        setDeleteConfirmation({
          product,
          hasOrders: true,
          orderCount: res.orderCount,
          error: res.error
        });
      } else {
        alert(res.error || 'Failed to delete product');
        setDeleteConfirmation(null);
      }
    } catch (err) {
      alert(err.message || 'Error deleting product');
      setDeleteConfirmation(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleArchiveInstead = async (product) => {
    try {
      setActionLoading(true);
      await updateProductStatus(product.id || product._id, 'archived');
      setDeleteConfirmation(null);
    } catch (err) {
      alert(err.message || 'Error archiving product');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Stat Cards */}
      <div className="bg-gradient-to-r from-[#2D1810] via-[#4A2511] to-[#2D1810] p-6 rounded-3xl text-white border-2 border-amber-500/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-amber-400/30">
              <Boxes className="w-3.5 h-3.5" />
              <span>DesiRasoi Store Admin • MongoDB Live Catalogue</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
              Products &amp; Box Pricing Manager
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-2xl">
              Add new pickle varieties, manage pack variants, configure multi-jar box pricing, upload authentic high-res imagery, and monitor live inventory across Rajasthan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={refetchProducts}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/20 cursor-pointer active:scale-95"
              title="Sync with MongoDB"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sync with DB</span>
            </button>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09210] text-[#1F110B] px-5 py-2.5 rounded-xl text-xs font-black shadow-md transition-all border border-amber-300 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-200/70">Total In Catalogue</div>
            <div className="text-2xl font-black mt-0.5 text-white">{adminStats?.total || allAdminProducts.length}</div>
          </div>
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Published Active</div>
            <div className="text-2xl font-black mt-0.5 text-emerald-400">{adminStats?.published || 0}</div>
          </div>
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Drafts / Inactive</div>
            <div className="text-2xl font-black mt-0.5 text-amber-400">{(adminStats?.draft || 0) + (adminStats?.inactive || 0)}</div>
          </div>
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">Archived / Low Stock</div>
            <div className="text-2xl font-black mt-0.5 text-rose-400">{adminStats?.archived || 0} / {adminStats?.lowStock || 0}</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDCD] shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name, SKU, slug, category..."
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-3 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-3 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Stock Filter Dropdown */}
          <div>
            <select
              value={selectedStockFilter}
              onChange={(e) => { setSelectedStockFilter(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-3 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
            >
              <option value="all">All Stock Levels</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock (≤10)</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Active Filter Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F2ECE1] text-xs text-[#8C7A6B]">
          <div className="font-bold">
            Showing <span className="text-[#1F110B] font-extrabold">{filteredProducts.length}</span> matching products
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-[#1F110B] cursor-pointer focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Products Data Table */}
      <div className="bg-white rounded-2xl border border-[#E8DDCD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF6EE] border-b border-[#E8DDCD] text-[11px] font-black uppercase tracking-wider text-[#8C7A6B]">
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Base Price</th>
                <th className="py-3 px-3">Box Pricing</th>
                <th className="py-3 px-3">Stock Level</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2ECE1] text-xs">
              {adminLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500 font-semibold">
                    Loading live products from MongoDB...
                  </td>
                </tr>
              ) : paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    <Package className="w-8 h-8 mx-auto text-gray-400 mb-2 stroke-[1.5]" />
                    <p className="font-bold text-gray-700">No products match your active search or filters.</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStatus('all'); setSelectedStockFilter('all'); }}
                      className="mt-3 text-xs font-bold text-amber-600 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map(product => {
                  const statusColors = {
                    published: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    draft: 'bg-amber-100 text-amber-800 border-amber-300',
                    inactive: 'bg-gray-100 text-gray-700 border-gray-300',
                    archived: 'bg-rose-100 text-rose-800 border-rose-300'
                  };

                  return (
                    <tr key={product.id || product._id} className="hover:bg-[#FCF9F3] transition-colors">
                      {/* Product Thumbnail & Title */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || '/images/products/marusthali-mango-jar.jpg'}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E8DDCD] shadow-2xs flex-shrink-0"
                            onError={(e) => { e.target.src = '/images/products/marusthali-mango-jar.jpg'; }}
                          />
                          <div className="min-w-0 max-w-xs">
                            <div className="font-bold text-[#1F110B] truncate text-sm" title={product.name}>
                              {product.name}
                            </div>
                            <div className="text-[11px] text-[#8C7A6B] truncate">
                              {product.hindiName || product.slug}
                            </div>
                            {product.badge && (
                              <span className="inline-block mt-1 text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3">
                        <span className="capitalize font-semibold text-[#1F110B] bg-[#FAF6EE] px-2 py-1 rounded-md border border-[#E8DDCD]">
                          {product.category}
                        </span>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-3 font-mono text-[11px] font-bold text-gray-700">
                        {product.sku || 'N/A'}
                      </td>

                      {/* Price & MRP */}
                      <td className="py-3.5 px-3">
                        <div className="font-extrabold text-[#1F110B] text-sm">
                          ₹{product.price}
                        </div>
                        {product.mrp && product.mrp > product.price && (
                          <div className="text-[11px] text-gray-400 line-through">
                            MRP ₹{product.mrp}
                          </div>
                        )}
                        {product.discount && (
                          <span className="text-[10px] text-emerald-700 font-bold">
                            {product.discount}
                          </span>
                        )}
                      </td>

                      {/* Box Pricing Preview */}
                      <td className="py-3.5 px-3">
                        {Array.isArray(product.boxPricing) && product.boxPricing.length > 0 ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200 text-[11px] font-bold">
                              <Boxes className="w-3 h-3 text-amber-700" />
                              <span>{product.boxPricing.length} Box Options</span>
                            </span>
                            <div className="text-[10px] text-gray-500">
                              Duo: ₹{product.boxPricing.find(b => b.packCount === 2)?.price || '—'} • 3-Jar: ₹{product.boxPricing.find(b => b.packCount === 3)?.price || '—'}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-[11px]">Standard Single</span>
                        )}
                      </td>

                      {/* Stock Level */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${product.stockCount <= 0 ? 'bg-red-500' : product.stockCount <= 10 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                          <span className="font-bold text-[#1F110B]">{product.stockCount} Jars</span>
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium">
                          {product.stockCount <= 0 ? 'Out of stock' : product.stockCount <= 10 ? 'Low stock' : 'Adequate'}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <select
                          value={product.status || 'published'}
                          onChange={(e) => updateProductStatus(product.id || product._id, e.target.value)}
                          className={`text-[11px] font-black uppercase px-2 py-1 rounded-lg border cursor-pointer ${statusColors[product.status || 'published']}`}
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="inactive">Inactive</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View on Public Store */}
                          <button
                            type="button"
                            onClick={() => onNavigate('product-detail', { productId: product.id || product.slug })}
                            className="p-1.5 text-gray-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                            title="View on Public Store"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Product */}
                          <button
                            type="button"
                            onClick={() => openEditModal(product)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit Product & Box Pricing"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete or Archive */}
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmation({ product, hasOrders: false, orderCount: 0 })}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete or Archive Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-[#FAF6EE] border-t border-[#E8DDCD] text-xs">
            <div className="text-gray-600 font-medium">
              Page <span className="font-extrabold text-[#1F110B]">{currentPage}</span> of {totalPages}
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-[#D5C7B8] disabled:opacity-40 hover:bg-white text-gray-700 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${currentPage === idx + 1 ? 'bg-[#B45309] text-white' : 'hover:bg-white text-gray-700'}`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-[#D5C7B8] disabled:opacity-40 hover:bg-white text-gray-700 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================= */}
      {/* PRODUCT CREATION & EDIT MODAL                            */}
      {/* ======================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-[#E8DDCD] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#2D1810] to-[#4A2511] text-white p-5 flex items-center justify-between border-b-2 border-amber-500">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-400/30">
                  <Package className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold">
                    {isEditing ? `Edit: ${formData.name}` : 'Add New Handcrafted Product'}
                  </h3>
                  <p className="text-xs text-amber-200/80">
                    Configure pricing, box multiples, pack sizes, stock, and photography.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div className="flex border-b border-[#E8DDCD] bg-[#FAF6EE] overflow-x-auto text-xs font-bold px-4">
              {[
                { id: 'basic', label: '1. Basic Info & SKU', icon: Tag },
                { id: 'pricing', label: '2. Pricing & Stock', icon: DollarSign },
                { id: 'variants', label: '3. Pack Sizes', icon: Layers },
                { id: 'boxes', label: '4. Box Pricing', icon: Boxes },
                { id: 'images', label: '5. Images & Gallery', icon: ImageIcon },
                { id: 'details', label: '6. Heritage & Story', icon: Info }
              ].map(t => {
                const IconComponent = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setModalActiveTab(t.id)}
                    className={`flex items-center gap-1.5 py-3 px-3.5 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${modalActiveTab === t.id ? 'border-[#B45309] text-[#B45309] bg-white' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              
              {/* Validation Alerts */}
              {formErrors.length > 0 && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-800 text-xs space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5 text-red-900 text-sm">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Please correct the following errors before saving:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 pt-1">
                    {formErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formSuccess && (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* TAB 1: BASIC INFO */}
              {modalActiveTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Product Name (English) *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleSlugifyName(e.target.value)}
                        placeholder="e.g. Traditional Marwari Ker Sangri"
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Hindi / Traditional Name
                      </label>
                      <input
                        type="text"
                        value={formData.hindiName}
                        onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                        placeholder="e.g. शाही मारवाड़ी कैर सांगरी अचार"
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Product Slug (URL Identifier) *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        placeholder="e.g. ker-sangri-achar"
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-mono font-semibold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                        required
                      />
                      <span className="text-[10px] text-gray-500 mt-0.5 block">Accessible at /product/{formData.slug || 'slug'}</span>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Primary SKU (Stock Keeping Unit) *
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                        placeholder="e.g. DR-KER-001"
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-mono font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Pickle Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          const cat = CATEGORIES.find(c => c.id === e.target.value);
                          setFormData({
                            ...formData,
                            category: e.target.value,
                            categoryName: cat?.name || `${e.target.value} Pickles`
                          });
                        }}
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Catalogue Status *
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                      >
                        <option value="published">Published (Visible in Shop)</option>
                        <option value="draft">Draft (Admin Only)</option>
                        <option value="inactive">Inactive (Hidden from Shop)</option>
                        <option value="archived">Archived (Purchases Blocked)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Spice Level
                      </label>
                      <select
                        value={formData.spiceLevel}
                        onChange={(e) => setFormData({ ...formData, spiceLevel: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                      >
                        <option value="Mild">Mild</option>
                        <option value="Medium">Medium</option>
                        <option value="Spicy">Spicy</option>
                        <option value="Extra Spicy">Extra Spicy</option>
                        <option value="Extra Hot">Extra Hot</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Promotional Badge (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        placeholder="e.g. Bestseller, New, Festive"
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-3">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1F110B]">
                      <input
                        type="checkbox"
                        checked={formData.isBestseller}
                        onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                        className="rounded border-[#D5C7B8] text-[#B45309] focus:ring-0"
                      />
                      <span>Mark as Bestseller on Homepage</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1F110B]">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="rounded border-[#D5C7B8] text-[#B45309] focus:ring-0"
                      />
                      <span>Feature in Top Highlights</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: PRICING & STOCK */}
              {modalActiveTab === 'pricing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Base Selling Price (₹) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={formData.price}
                        onChange={(e) => {
                          const p = Number(e.target.value);
                          const m = formData.mrp ? Number(formData.mrp) : Math.round(p * 1.2);
                          const disc = m > p ? `${Math.round(((m - p) / m) * 100)}% OFF` : '';
                          setFormData({ ...formData, price: p, mrp: m, discount: disc });
                        }}
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        MRP / Original Price (₹) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={formData.mrp}
                        onChange={(e) => {
                          const m = Number(e.target.value);
                          const p = Number(formData.price);
                          const disc = m > p ? `${Math.round(((m - p) / m) * 100)}% OFF` : '';
                          setFormData({ ...formData, mrp: m, discount: disc });
                        }}
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Computed Discount Tag
                      </label>
                      <input
                        type="text"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                        placeholder="e.g. 17% OFF"
                        className="w-full p-2.5 bg-gray-50 border border-[#D5C7B8] rounded-xl text-xs font-extrabold text-emerald-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Warehouse Stock Count (Jars) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={formData.stockCount}
                        onChange={(e) => {
                          const s = Number(e.target.value);
                          setFormData({ ...formData, stockCount: s, inStock: s > 0 });
                        }}
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-bold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                        required
                      />
                    </div>

                    <div className="flex items-center pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1F110B]">
                        <input
                          type="checkbox"
                          checked={formData.inStock}
                          onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                          className="rounded border-[#D5C7B8] text-[#B45309] focus:ring-0"
                        />
                        <span>Enable In-Stock Purchasing</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PACK VARIANTS */}
              {modalActiveTab === 'variants' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-[#1F110B] uppercase tracking-wide">
                        Jar Weight &amp; Pack Variants
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        Customers can choose different jar weights (e.g. 250g, 500g, 1kg) on the product page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#FAF6EE] hover:bg-[#F2ECE1] border border-[#D5C7B8] text-[#1F110B] px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Variant</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {formData.packSizes.map((variant, idx) => (
                      <div key={idx} className="flex flex-wrap items-center gap-2.5 p-3 bg-[#FAF6EE] border border-[#E8DDCD] rounded-2xl">
                        <div className="w-24">
                          <label className="text-[10px] font-bold text-gray-500">Weight</label>
                          <input
                            type="text"
                            value={variant.size}
                            onChange={(e) => handleUpdateVariant(idx, 'size', e.target.value)}
                            placeholder="e.g. 500 g"
                            className="w-full p-1.5 bg-white border border-[#D5C7B8] rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-[10px] font-bold text-gray-500">Price (₹)</label>
                          <input
                            type="number"
                            min="0"
                            value={variant.price}
                            onChange={(e) => handleUpdateVariant(idx, 'price', e.target.value)}
                            className="w-full p-1.5 bg-white border border-[#D5C7B8] rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-[10px] font-bold text-gray-500">MRP (₹)</label>
                          <input
                            type="number"
                            min="0"
                            value={variant.mrp}
                            onChange={(e) => handleUpdateVariant(idx, 'mrp', e.target.value)}
                            className="w-full p-1.5 bg-white border border-[#D5C7B8] rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div className="w-20">
                          <label className="text-[10px] font-bold text-gray-500">Stock</label>
                          <input
                            type="number"
                            min="0"
                            value={variant.stock}
                            onChange={(e) => handleUpdateVariant(idx, 'stock', e.target.value)}
                            className="w-full p-1.5 bg-white border border-[#D5C7B8] rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div className="flex-1 min-w-[120px]">
                          <label className="text-[10px] font-bold text-gray-500">Variant SKU</label>
                          <input
                            type="text"
                            value={variant.sku}
                            onChange={(e) => handleUpdateVariant(idx, 'sku', e.target.value)}
                            placeholder={`${formData.sku || 'SKU'}-${variant.size.replace(/\s+/g, '')}`}
                            className="w-full p-1.5 bg-white border border-[#D5C7B8] rounded-lg text-xs font-mono font-semibold"
                          />
                        </div>
                        {formData.packSizes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(idx)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 mt-3 cursor-pointer"
                            title="Remove variant"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: BOX SIZES & BOX PRICING */}
              {modalActiveTab === 'boxes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-[#1F110B] uppercase tracking-wide flex items-center gap-1.5">
                        <Boxes className="w-4 h-4 text-amber-700" />
                        <span>Multi-Jar Box Packaging &amp; Volume Pricing</span>
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        Configure Single, Duo, 3-Jar, 4-Jar or Festive Hampers. These options power combo and gift-box purchases.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddBox}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#FAF6EE] hover:bg-[#F2ECE1] border border-[#D5C7B8] text-[#1F110B] px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Box Option</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.boxPricing?.map((box, idx) => (
                      <div key={idx} className="p-3.5 bg-[#FAF6EE] border border-[#E8DDCD] rounded-2xl space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <div className="flex-1 min-w-[200px]">
                            <label className="text-[10px] font-bold text-gray-500">Box Presentation Title *</label>
                            <input
                              type="text"
                              value={box.boxType}
                              onChange={(e) => handleUpdateBox(idx, 'boxType', e.target.value)}
                              placeholder="e.g. Royal Gifting Box (3 Jars)"
                              className="w-full p-2 bg-white border border-[#D5C7B8] rounded-lg text-xs font-bold"
                              required
                            />
                          </div>
                          <div className="w-24">
                            <label className="text-[10px] font-bold text-gray-500">Jar Count *</label>
                            <input
                              type="number"
                              min="1"
                              value={box.packCount}
                              onChange={(e) => handleUpdateBox(idx, 'packCount', e.target.value)}
                              className="w-full p-2 bg-white border border-[#D5C7B8] rounded-lg text-xs font-bold"
                              required
                            />
                          </div>
                          <div className="w-28">
                            <label className="text-[10px] font-bold text-gray-500">Box Price (₹) *</label>
                            <input
                              type="number"
                              min="0"
                              value={box.price}
                              onChange={(e) => handleUpdateBox(idx, 'price', e.target.value)}
                              className="w-full p-2 bg-white border border-[#D5C7B8] rounded-lg text-xs font-bold text-amber-900"
                              required
                            />
                          </div>
                          <div className="w-28">
                            <label className="text-[10px] font-bold text-gray-500">Box MRP (₹)</label>
                            <input
                              type="number"
                              min="0"
                              value={box.mrp}
                              onChange={(e) => handleUpdateBox(idx, 'mrp', e.target.value)}
                              className="w-full p-2 bg-white border border-[#D5C7B8] rounded-lg text-xs font-bold"
                            />
                          </div>
                          {formData.boxPricing.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveBox(idx)}
                              className="p-2 text-rose-500 hover:text-rose-700 mt-3 cursor-pointer"
                              title="Remove Box Option"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500">Box Description &amp; Hamper Inclusions</label>
                          <input
                            type="text"
                            value={box.description}
                            onChange={(e) => handleUpdateBox(idx, 'description', e.target.value)}
                            placeholder="e.g. Silk ribbon tie box with brass serving spoon and handwritten greeting card"
                            className="w-full p-1.5 bg-white border border-[#D5C7B8] rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: IMAGES & GALLERY */}
              {modalActiveTab === 'images' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="font-extrabold text-xs text-[#1F110B] uppercase tracking-wide">
                      Product Photography &amp; Visual Gallery
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Upload high-resolution photography. The primary image is shown in cards, listings, and checkout.
                    </p>
                  </div>

                  {uploadError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {/* Primary Image Upload Card */}
                  <div className="p-4 bg-[#FAF6EE] border border-[#E8DDCD] rounded-2xl space-y-3">
                    <label className="block text-xs font-extrabold text-[#1F110B]">
                      Primary Product Image *
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <img
                        src={formData.image || '/images/products/marusthali-mango-jar.jpg'}
                        alt="Primary Preview"
                        className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-500 shadow-md flex-shrink-0"
                        onError={(e) => { e.target.src = '/images/products/marusthali-mango-jar.jpg'; }}
                      />
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="Image URL or upload below"
                          className="w-full p-2 bg-white border border-[#D5C7B8] rounded-xl text-xs font-mono"
                          required
                        />
                        <div className="flex items-center gap-2">
                          <label className="inline-flex items-center gap-1.5 bg-[#B45309] hover:bg-[#92400e] text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploading ? 'Uploading...' : 'Upload New Image'}</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              onChange={handleSingleImageUpload}
                              className="hidden"
                              disabled={isUploading}
                            />
                          </label>
                          <span className="text-[11px] text-gray-500">Max 10MB (JPG, PNG, WEBP)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gallery Multiple Images */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-extrabold text-[#1F110B]">
                        Additional Gallery Images ({formData.gallery?.length || 0})
                      </label>
                      <label className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Add Gallery Photos</span>
                        <input
                          type="file"
                          multiple
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={handleMultipleImagesUpload}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {formData.gallery?.map((imgUrl, idx) => (
                        <div key={idx} className="relative group bg-[#FAF6EE] rounded-2xl border border-[#E8DDCD] p-2 space-y-2">
                          <img
                            src={imgUrl}
                            alt={`Gallery ${idx}`}
                            className="w-full h-24 object-cover rounded-xl border border-gray-200"
                            onError={(e) => { e.target.src = '/images/products/marusthali-mango-jar.jpg'; }}
                          />
                          {formData.image === imgUrl && (
                            <span className="absolute top-3 left-3 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                              PRIMARY
                            </span>
                          )}
                          <div className="flex items-center justify-between text-[10px]">
                            {formData.image !== imgUrl ? (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImage(imgUrl)}
                                className="text-amber-700 hover:underline font-bold"
                              >
                                Set Primary
                              </button>
                            ) : (
                              <span className="text-emerald-700 font-bold">Main Photo</span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="text-rose-600 hover:text-rose-800 p-1"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {/* Reorder Buttons */}
                          <div className="flex justify-between items-center text-[10px] text-gray-400 pt-1 border-t border-gray-200">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveGalleryImage(idx, 'left')}
                              className="hover:text-black disabled:opacity-30 cursor-pointer"
                            >
                              ← Move Left
                            </button>
                            <button
                              type="button"
                              disabled={idx === formData.gallery.length - 1}
                              onClick={() => handleMoveGalleryImage(idx, 'right')}
                              className="hover:text-black disabled:opacity-30 cursor-pointer"
                            >
                              Move Right →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: DETAILS & STORY */}
              {modalActiveTab === 'details' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                      Short Tagline / Teaser Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.shortDesc}
                      onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                      placeholder="e.g. Handcrafted with fresh Ramkela mangoes, sun-cured with stone-ground spices and pure cold-pressed mustard oil."
                      className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                      Full Heritage &amp; Slow-Curing Story
                    </label>
                    <textarea
                      rows={4}
                      value={formData.fullDesc}
                      onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                      placeholder="Full traditional description, rural craftsmanship story, and sensory notes..."
                      className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Ingredients (Comma separated)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.ingredients}
                        onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                        placeholder="Raw Green Mangoes (62%), Cold-Pressed Mustard Oil (24%), Sendha Namak, Saunf, Methi, Hing..."
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Key Feature Bullets (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.bullets}
                        onChange={(e) => setFormData({ ...formData, bullets: e.target.value })}
                        placeholder="Handpicked sun-ripened lemons&#10;Pure mustard oil base&#10;Zero chemical preservatives"
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B] focus:outline-none focus:border-[#B45309]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Shelf Life
                      </label>
                      <input
                        type="text"
                        value={formData.shelfLife}
                        onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                        placeholder="e.g. 12 Months"
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#1F110B] mb-1">
                        Storage Instructions
                      </label>
                      <input
                        type="text"
                        value={formData.storage}
                        onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                        placeholder="e.g. Store in a cool dry place. Use dry wooden spoon."
                        className="w-full p-2.5 bg-[#FAF6EE] border border-[#D5C7B8] rounded-xl text-xs font-semibold text-[#1F110B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E8DDCD]">
                <div className="text-[11px] text-gray-500 font-semibold">
                  Changes save directly to MongoDB and instantly update the public storefront.
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2.5 bg-[#B45309] hover:bg-[#92400e] text-white text-xs font-black rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {actionLoading ? 'Saving to Database...' : isEditing ? 'Save Changes' : 'Publish Product'}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* DELETE / ARCHIVE CONFIRMATION MODAL                      */}
      {/* ======================================================= */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full border border-rose-200 shadow-2xl p-6 space-y-4">
            
            <div className="flex items-start gap-3">
              <div className="p-3 bg-rose-100 rounded-2xl text-rose-700 flex-shrink-0">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F110B]">
                  {deleteConfirmation.hasOrders ? 'Historical Orders Detected' : 'Confirm Permanent Deletion'}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {deleteConfirmation.hasOrders ? (
                    <span>
                      <strong>{deleteConfirmation.product?.name}</strong> has{' '}
                      <strong>{deleteConfirmation.orderCount} historical customer order(s)</strong>.
                      To preserve accounting and tax audit records, permanent database deletion is blocked.
                    </span>
                  ) : (
                    <span>
                      Are you sure you want to permanently delete <strong>{deleteConfirmation.product?.name}</strong> from MongoDB?
                    </span>
                  )}
                </p>
              </div>
            </div>

            {deleteConfirmation.hasOrders ? (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <Archive className="w-4 h-4 text-amber-700" />
                  <span>Recommended Action: Archive Product</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Archiving hides the product from the public shop catalogue and prevents any new customer orders, while keeping past customer receipts and invoices 100% intact.
                </p>
              </div>
            ) : null}

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              {deleteConfirmation.hasOrders ? (
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleArchiveInstead(deleteConfirmation.product)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-xl shadow cursor-pointer"
                >
                  {actionLoading ? 'Archiving...' : 'Archive Product (Recommended)'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => confirmDelete(deleteConfirmation.product)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow cursor-pointer"
                >
                  {actionLoading ? 'Deleting...' : 'Permanently Delete'}
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsAdminManager;
