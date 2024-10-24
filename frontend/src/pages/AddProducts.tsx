import React, { useState } from 'react'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import { Button, Button2 } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { GeneratePDF } from '../fetchData'
export interface Product {
  product_name: string;
  product_qty: number;
  product_price: number;
  total_amount: number;
}
const AddProducts = () => {
  const navigate = useNavigate()
  const [total_amount, settotal_amount] = useState(0)
  const [total_charge, settotal_charge] = useState(0)
  const [gst, setgst] = useState(0)
  const [pdfUrl, setPdfUrl] = useState('');

  const [product, setproduct] = useState<Product>({
    product_name: "", product_qty: 0, product_price: 0, total_amount: 0
  })
  const [productList, setproductList] = useState<Product[]>([]);
  let totalCharge = 0;
  let totalAmount = 0;
  let g = 0;

  const add =  () => {
    let ta = product.product_price * product.product_qty;

    const newProduct = {
      ...product,
      total_amount: ta
    };

    setproductList(prevList => {
      // Create a new product list with the new product
      const updatedProductList = [...prevList, newProduct];

      // Calculate new total charges and GST
      const newTotalCharge = updatedProductList.reduce((acc, p) => acc + p.total_amount, 0);
      const newGst = (18 / 100) * newTotalCharge;
      const newTotalAmount = newTotalCharge + newGst;

      // Update state with new totals
      settotal_charge(newTotalCharge);
      setgst(newGst);
      settotal_amount(newTotalAmount);

      return updatedProductList; // Return the updated product list
  });
    setproduct({
      product_name: "", product_qty: 0, product_price: 0, total_amount: 0
    })
  }
  const handleGenerate=async()=>{
    const res=await GeneratePDF({productList,gst,total_amount,total_charge});
    if (res) {
      const blob = new Blob([res.data], { type: 'application/pdf' }); // Get the PDF as a blob
      const url = window.URL.createObjectURL(blob); // Create a URL for the blob
      setPdfUrl(url); // Set the URL to the state
  } else {
      console.error('Failed to fetch PDF');
  }
  }
  const logouthandler = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  return (
    <div className='text-white bg-neutral-950  min-w-screen min-h-screen'>
      <div className='spotlight3 z-10'></div>
      <div className='bg-neutral-800/50  py-2 px-4 w-full sticky z-50 flex justify-between items-center'>
        <img src="../../public/logo.png" alt="" className='w-25 h-10' />
        <Link to='/'><Button title='LogOut' onclick={logouthandler} /></Link>
      </div>
      <div className='sticky z-50 py-8 px-4 md:px-12'>
        <h1 className='text-xl font-bold md:text-3xl'>Add Products</h1>
        <p className='text-xs md:text-sm text-neutral-500 mt-2'>This is basic signup page which is used for levitation assignment purpose. </p>
        <div className='grid  grid-row-3 md:grid-cols-3 md:gap-8 w-full'>
          <Input value={product.product_name} onchange={(e) => setproduct({ ...product, product_name: e.target.value })} type="text" label="Product Name" placeholder='Enter the product name' />
          <Input value={product.product_price} onchange={(e) => setproduct({ ...product, product_price: +e.target.value })} type="text" label="Product price" placeholder='Enter the price' />
          <Input value={product.product_qty} onchange={(e) => setproduct({ ...product, product_qty: +e.target.value })} type="text" label="Quantity" placeholder='Enter the quantity' />
        </div>
        <Button2 onClick={add} title="Add Product" />
        {productList.length>0&&<div className="grid mt-2 grid-cols-6 md:w-[92.5vw] place-items-center rounded-t-md bg-white text-black border border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 md:col-span-3 flex items-center p-2">
            <p className="font-medium">Product Name</p>
          </div>
          <div className="col-span-1  items-center  p-2">
            <p className="font-medium">Price</p>
          </div>
          <div className="col-span-1 flex items-center p-2">
            <p className="font-medium">Quantity</p>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center ml-8 md:ml-0 p-2">
            <p className="font-medium">Total Amount</p>
          </div>
        </div>}

        {productList.map((product, key) => (
          <div
            className="grid grid-cols-6 place-items-center border md:w-[92.5vw] border-stroke py-4.5 px-4  sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-2 md:col-span-3 text-sm text-white flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center p-2">

                <p className="text-sm">
                  {product.product_name}
                </p>
              </div>
            </div>
            <div className="col-span-1  items-center  p-2">
              <p className="text-sm ">
                {product.product_price}
              </p>
            </div>
            <div className="col-span-1 flex items-center p-2">
              <p className="text-sm ">
                {product.product_qty}
              </p>
            </div>
            <div className="col-span-1 md:col-span-2 flex items-center p-2">
              <p className="text-sm ">{product.total_amount}</p>
            </div>
          </div>
        ))}
        {productList.length > 0 && <div
          className="grid rounded-b-md  grid-cols-6 place-items-center border md:w-[92.5vw] border-stroke py-4.5 px-4  sm:grid-cols-8 md:px-6 2xl:px-7.5"
        >

          <div className="col-span-1 col-start-5 flex items-center p-2">
            <p className="text-sm text-meta-3">+ GST 18%</p>
          </div>
          <div className="col-span-2 col-start-6 flex items-center p-2">
            <p className="text-sm text-meta-3">{total_amount}</p>
          </div>
        </div>
        }
        <div className='flex justify-center mt-2'><Button2 title='Generate PDF Invoice' onClick={handleGenerate}/></div>
      </div>
      {pdfUrl ? (
               <div> <iframe
                    src={pdfUrl} // Use the blob URL
                    width="100%"
                    height="600px"
                    title="PDF Viewer"
                />
                <a href={pdfUrl} download="invoice.pdf">Download PDF</a>
                </div>
            ) : (
                <p>Loading PDF...</p> // Loading state
            )}

    </div>
  )
}

export default AddProducts