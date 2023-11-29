import React, { useState } from 'react';

interface AddToCartProps {
  id: string;
}

export default function AddToCart({ id }: AddToCartProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    // Perform the logic to add the item to the cart here
    // For example, you can make an API call to add the item to the cart
    // and update the state to reflect the change
    setIsAdded(true);
  };

  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-primary" onClick={handleClick}>
        {isAdded ? 'Added to Cart' : 'Add To Cart'}
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
    </div>
  );
}
