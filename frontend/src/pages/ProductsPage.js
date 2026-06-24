import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty'];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 8 });
    if (keyword) params.set('keyword', keyword);
    if (category) params.set('category', category);

    axios.get(`/api/products?${params}`)
      .then(({ data }) => {
        setProducts(data.products);
        setTotal(data.total);
        setPages(data.pages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [keyword, category, page]);

  const setFilter = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    p.delete('page');
    setSearchParams(p);
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: 'flex', gap: 30 }}>
          {/* Sidebar Filters */}
          <aside style={{ width: 220, flexShrink: 0 }}>
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ marginBottom: 16, color: '#2C3E50' }}>Filters</h3>

              <div style={{ marginBottom: 20 }}>
                <h4 style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>CATEGORY</h4>
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => setFilter('category', cat === 'All' ? '' : cat)}
                    style={{
                      padding: '8px 10px',
                      marginBottom: 4,
                      borderRadius: 6,
                      cursor: 'pointer',
                      background: (cat === 'All' ? !category : category === cat) ? '#FF6B35' : 'transparent',
                      color: (cat === 'All' ? !category : category === cat) ? 'white' : '#333',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>

              <button
                className="btn btn-outline btn-block"
                onClick={() => setSearchParams({})}
                style={{ fontSize: 13 }}
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h1 className="page-title" style={{ margin: 0 }}>
                {category || keyword ? `Results for "${category || keyword}"` : 'All Products'}
              </h1>
              <span style={{ color: '#666', fontSize: 14 }}>{total} products</span>
            </div>

            {loading ? (
              <div className="spinner" />
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#666' }}>
                <p style={{ fontSize: 18 }}>No products found</p>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {products.map((p) => <ProductCard key={p._id} product={p} />)}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
                    {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setFilter('page', p)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 6,
                          border: 'none',
                          cursor: 'pointer',
                          background: p === page ? '#FF6B35' : '#eee',
                          color: p === page ? 'white' : '#333',
                          fontWeight: 600,
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
