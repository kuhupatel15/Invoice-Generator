import puppeteer from "puppeteer-core"
interface Product {
    product_name: string;
    product_qty: number;
    product_price: number;
    total_amount: number;
  }
interface Invoice {
    productList: Product[];  
    gst: number;             
    total_amount: number;   
    total_charge: number;    
    username?: string;        
    email?: string;          
    date?: string;            
}
export const generatePdf = async ({productList,gst,total_amount,total_charge,username,email,date}:Invoice) => {
    try {
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
            ,
            headless: true 
        
        });
        const page = await browser.newPage();
        const content =
            `
            <html>
<head>
    <title>Invoice Generator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto bg-white shadow-lg p-6 mb-6">
        <div class="flex justify-between mb-4">
            <h1 class="text-2xl font-semibold">INVOICE GENERATOR</h1>
            <div class="text-xs uppercase font-semibold">levitation</div>
        </div>
        <div class="bg-black relative text-white p-4 rounded-lg mb-6">
            <div class="mb-2">
                <span class="block text-sm text-gray-300">Traveller Name</span>
                <span class="block text-lg">${username}</span>
            </div>
            <div>
                <span class="block text-sm text-gray-300">${email}</span>
            </div>
            <div class="text-sm text-gray-300 absolute top-4 right-4">
                Date: ${date}
            </div>
        </div>
        <table class="w-full text-left mb-6">
            <thead class="rounded-lg">
                <tr>
                    <th class="pb-2">Product</th>
                    <th class="pb-2">Qty</th>
                    <th class="pb-2">Rate</th>
                    <th class="pb-2">Total Amount</th>
                </tr>
            </thead>
            <tbody>
            ${ productList?.map((p:any)=>{
                return(
                    `
                <tr>
                    <td>${p.product_name}</td>
                    <td>${p.product_qty}</td>
                    <td>${p.product_price}</td>
                    <td>${p.total_amount}</td>
                </tr>
                
            `
                )
            })
            
            }</tbody>
        </table>
        <div class="bg-gray-200 w-30 p-4 rounded-lg">
            <div class="flex justify-between mb-2">
                <span>Total Charges</span>
                <span>${total_amount}</span>
            </div>
            <div class="flex justify-between mb-2">
                <span>GST (18%)</span>
                <span>${gst}</span>
            </div>
            <div class="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>${total_charge}</span>
            </div>
        </div>
        <div class="text-xs text-center mt-6">
            <span class="block">Date: ${date}</span>
        </div>
    </div>
    <div class="max-w-2xl mx-auto text-center p-2 bg-white text-xs">
        <p>We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.</p>
    </div>
</body>
</html>
        `
        await page.setContent(content);
        await page.emulateMediaType('screen');
        await page.pdf({
            path:'invoice.pdf',
            format:'A4',
            
        })
        console.log("done")
        await browser.close();
    }
    catch (err) {
        console.log(err)
    }
}
