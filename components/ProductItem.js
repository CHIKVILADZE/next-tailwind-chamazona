/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItems({ product }) {
  return (
    <div className="mb-5 block rounded-lg border border-gray-200 shadow-md">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="roundnen bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 acive:bg-amber-500 "
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
