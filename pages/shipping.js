import Layout from '@/components/Layout';
import React from 'react';
import CheckoutWizard from '@/components/CheckoutWizard';
import { useForm } from 'react-hook-form';
import { Store } from '@/utils/Store';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAdress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAdress.fullName);
    setValue('adress', shippingAdress.adress);
    setValue('city', shippingAdress.city);
    setValue('postalCode', shippingAdress.postalCode);
    setValue('country', shippingAdress.country);
  }, [setValue, shippingAdress]);

  const submitHandler = ({ fullName, adress, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADRESS',
      payload: { fullName, adress, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAdress: {
          fullName,
          adress,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push('/payment');
  };

  return (
    <Layout title="Shipping Adress">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Adress</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', { required: 'Please enter full name' })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="adress">Adress</label>
          <input
            className="w-full"
            id="adress"
            autoFocus
            {...register('adress', {
              required: 'Please enter adress',
              minLength: { value: 3, message: 'Adress is more than 2 chars' },
            })}
          />
          {errors.adress && (
            <div className="text-red-500">{errors.adress.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="w-full"
            id="postalCode"
            autoFocus
            {...register('postalCode', {
              required: 'Please enter postal code',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            className="w-full"
            id="country"
            autoFocus
            {...register('country', {
              required: 'Please enter country',
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="roundnen bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 acive:bg-amber-500">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
