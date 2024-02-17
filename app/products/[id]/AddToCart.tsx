"use client"

import React, { startTransition, useState, useTransition } from 'react';

interface AddToCartProps {
  productId: string | undefined;
  incrementProductQuantity: (productId: string)=>Promise<void>
}
 

export default function AddToCart({ productId, incrementProductQuantity }: AddToCartProps) {
  const [ success, setSuccess ] = useState(false);
  const [ isPending, startTransition ] = useTransition()

  const handleClick = () => {
    setSuccess(false);
    startTransition(async () => {
      await incrementProductQuantity(productId!);
      setSuccess(true)
    })
  };

  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-primary" onClick={handleClick}>
        Add to Cart
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h21.4 2M7 13h1014-8H5.4M7 13L5.4 5M7 13l-2.293 2.29"
          />
        </svg>
      </button>
      
        {/* {isAdded ? 'Added to Cart' : 'Add To Cart'} */}
        {isPending && <span className='loading loading-spinner loading-md' />}
        {!isPending && success && (<span className='text-success'>Added To Cart</span>)}
    </div>
  );
}
