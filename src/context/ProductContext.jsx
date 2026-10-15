import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as fallbackProducts } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [allAdminProducts, setAllAdminProducts] = useState([]);
  const [adminStats, setAdminStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    inactive: 0,
    archived: 0,
    lowStock: 0
  });
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch published products for the public storefront
  const fetchPublicProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products?limit=100');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
          setError(null);
          return;
        }
      }
      // If server returned empty or error, fallback gracefully
      setProducts(fallbackProducts);
    } catch (err) {
      console.warn('[ProductContext] Using fallback product catalogue:', err.message);
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all products (including draft/inactive/archived) for Admin Panel
  const fetchAdminProducts = useCallback(async (filters = {}) => {
    try {
      setAdminLoading(true);
      const params = new URLSearchParams({ admin: 'true', limit: '100' });
      if (filters.search) params.append('search', filters.search);
      if (filters.category && filters.category !== 'all') params.append('category', filters.category);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.sort) params.append('sort', filters.sort);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setAllAdminProducts(data.products);
          if (data.stats) setAdminStats(data.stats);
          return data;
        }
      }
      throw new Error('Failed to fetch admin products');
    } catch (err) {
      console.error('[ProductContext] Error fetching admin products:', err);
      return { success: false, error: err.message };
    } finally {
      setAdminLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublicProducts();
    fetchAdminProducts();
  }, [fetchPublicProducts, fetchAdminProducts]);

  // Helper to get a product by ID or slug
  const getProductByIdOrSlug = useCallback((idOrSlug) => {
    if (!idOrSlug) return null;
    const lower = idOrSlug.toLowerCase();
    // First search in loaded products
    const found = products.find(p => p.id === idOrSlug || p.slug?.toLowerCase() === lower);
    if (found) return found;
    // Next search in admin products (if viewing from admin)
    const adminFound = allAdminProducts.find(p => p.id === idOrSlug || p.slug?.toLowerCase() === lower);
    if (adminFound) return adminFound;
    // Finally fallback
    return fallbackProducts.find(p => p.id === idOrSlug || p.slug?.toLowerCase() === lower) || null;
  }, [products, allAdminProducts]);

  // Admin Actions:
  // 1. Create Product
  const createProduct = async (productData) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create product');
      }

      // Optimistically sync state
      await Promise.all([fetchPublicProducts(), fetchAdminProducts()]);
      return { success: true, product: data.product };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // 2. Update Product
  const updateProduct = async (id, productData) => {
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update product');
      }

      // Sync state across public and admin
      await Promise.all([fetchPublicProducts(), fetchAdminProducts()]);
      return { success: true, product: data.product };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // 3. Quick Status Toggle (published, draft, inactive, archived)
  const updateProductStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update product status');
      }

      await Promise.all([fetchPublicProducts(), fetchAdminProducts()]);
      return { success: true, product: data.product };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // 4. Safe Delete Product (checks historical orders)
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Failed to delete product',
          hasOrders: data.hasOrders,
          orderCount: data.orderCount
        };
      }

      await Promise.all([fetchPublicProducts(), fetchAdminProducts()]);
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // 5. Upload Single Image
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload/single', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }
      return { success: true, url: data.url };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // 6. Upload Multiple Images
  const uploadMultipleImages = async (files) => {
    try {
      const formData = new FormData();
      Array.from(files).forEach(f => formData.append('images', f));
      const res = await fetch('/api/upload/multiple', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload images');
      }
      return { success: true, urls: data.urls };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        allAdminProducts,
        adminStats,
        loading,
        adminLoading,
        error,
        fetchPublicProducts,
        fetchAdminProducts,
        refetchProducts: async () => {
          await Promise.all([fetchPublicProducts(), fetchAdminProducts()]);
        },
        getProductByIdOrSlug,
        createProduct,
        updateProduct,
        updateProductStatus,
        deleteProduct,
        uploadImage,
        uploadMultipleImages
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
