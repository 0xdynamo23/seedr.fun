import React from 'react';

const ProductDetailPage: React.FC = ({params}:any) => {
    const id = params.id;
    return (
        <div>
            <h1>ProductDetailPage {id}</h1>
        </div>
    );
};

export default ProductDetailPage;
