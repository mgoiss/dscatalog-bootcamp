import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { Link } from 'react-router-dom';
import './styles.scss';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';

const Catalog = () => {
    const [ productsResponse, setProductsResponse ] = useState<ProductsResponse>();
    const [isLoader, setIsLoader] = useState(false);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 12
        }

        setIsLoader(true);

        makeRequest({ url: '/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(() => {
            setIsLoader(false);
        });
    }, [activePage]);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de Produtos
            </h1>
            <div className="catalog-products">
                {isLoader ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    ))
                    )}
            </div>
            {productsResponse && (
                <Pagination 
                    totalPages={productsResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    );
};

export default Catalog;