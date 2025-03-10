import puppeteer from "puppeteer";
import fs from "fs";

async function createBillPDF() {
  // Define the HTML content
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Final Bill & Receipt</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
          .container {
              padding: 20px;
          }
          h2 {
              text-align: center;
              margin-bottom: 20px;
              text-decoration: underline;
          }
          table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
          }
          table, th, td {
              border: 1px solid black;
          }
          th, td {
              padding: 8px;
              text-align: left;
          }
          .summary {
              margin-top: 20px;
              text-align: right;
          }
          .footer {
              margin-top: 30px;
              text-align: center;
              font-weight: bold;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h2>Final Bill & Receipt</h2>
          <p><b>IPD No:</b> IP/788/2024 &nbsp;&nbsp; <b>Bill Date:</b> 30/07/2024</p>
          <p><b>Patient Name:</b> MR. BABURAO G. NIMSE &nbsp;&nbsp; <b>Age & Gender:</b> 65 | Male</p>
          <p><b>Treating Doctor:</b> Dr. Shrikant Hande &nbsp;&nbsp; <b>Status:</b> Cashless | TATA AIG GIC</p>
          
          <table>
              <thead>
                  <tr>
                      <th>S.No</th>
                      <th>Service Name</th>
                      <th>Date</th>
                      <th>Rate</th>
                      <th>Qty</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>A</td>
                      <td>Bed Charges</td>
                      <td>26/07/2024</td>
                      <td>3000</td>
                      <td>1</td>
                      <td>3000.00</td>
                  </tr>
                  <!-- Add all rows similarly -->
              </tbody>
          </table>

          <div class="summary">
              <p><b>Total Final Bill Amount:</b> 41505.00</p>
              <p><b>Pending Amount:</b> 41505.00</p>
              <p><b>Paid Amount (In Words):</b> Forty-One Thousand Five Hundred Five Rupees Only</p>
          </div>

          <div class="footer">
              Thank You for Choosing Our Services!
          </div>
      </div>
  </body>
  </html>
  `;

  // Save HTML to a file (optional for debugging)
  fs.writeFileSync("bill.html", htmlContent);

  // Launch Puppeteer and generate the PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "load" });
  await page.pdf({
    path: "bill.pdf",
    format: "A4",
    printBackground: true,
  });
  await browser.close();

  console.log("PDF Generated Successfully!");
}

createBillPDF();
