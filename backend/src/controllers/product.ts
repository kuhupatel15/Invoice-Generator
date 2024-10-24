import { Request, Response } from 'express';
import { env_config } from '../configs/env-config';
import { Invoice } from '../models/invoice';
import path from 'path'
import { generatePdf } from '../puppeteer';

export const AddProduct = async (req: Request, res: Response) =>{
    try{
        const {productList,total_charge,gst,total_amount} = req.body;
        const products= await new Invoice({
            products:productList,
            gst,
            total_amount,
            total_charge
        })
        const user=req.user;
        const username=user?.username;
        const email=user?.email;
        generatePdf({productList,total_charge,gst,total_amount,username,email});
        const options = {
            root: path.join('./')
        };
    
        const fileName = 'invoice.pdf';
        res.status(200).sendFile(fileName, options, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            } else {
                console.log('Sent:', fileName);
            }
        });

    }catch(err){
        console.log(err)
    }
}



