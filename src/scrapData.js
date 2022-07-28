import puppeteer from 'puppeteer';

// async function writeStockData(stockName) {
//     console.log('Stock Name: ', stockName.toUpperCase());
//     const browser = await puppeteer.launch({ headless: false });

//     const page = await browser.newPage();
//     await page.goto(`https://www.nseindia.com/get-quotes/equity?symbol=${stockName.toUpperCase()}`);

//     const date = await page.$$eval('#asondate', (options) =>
//         options.map((option) => option.textContent)
//     );
//     const name = await page.$$eval('#quoteName', (options) =>
//         options.map((option) => option.textContent)
//     );
//     const price = await page.$$eval('#quoteLtp', (options) =>
//         options.map((option) => option.textContent)
//     );
//     const basicIndustry = await page.$$eval(
//         '#equityInfo > tbody > tr > td:nth-child(6)',
//         (options) => options.map((option) => option.textContent)
//     );
//     const derivatives = await page.$$eval(
//         '#securityInfo > tbody > tr > td:nth-child(7)',
//         (options) => options.map((option) => option.textContent)
//     );
//     const change = await page.$$eval('#priceInfoStatus', (options) =>
//         options.map((option) => option.textContent)
//     );

//     console.log(date);
//     console.log(name);
//     console.log(price);
//     console.log(basicIndustry);
//     console.log(derivatives);
//     console.log(change);

//     if (
//         date.toString().trim() &&
//         name.toString().trim() &&
//         price.toString().trim() &&
//         basicIndustry.toString().trim() &&
//         derivatives.toString().trim() &&
//         change.toString().trim()
//     ) {
//         const writeData = `Date: ${date}\nName: ${name} \nPrice: ${price}\nBasic Industry: ${basicIndustry}\nDerivatives: ${derivatives}\nChange: ${change}\n\n`;

//         fs.appendFile('stocklist.txt', writeData, 'utf-8', (err) => {
//             if (err) console.log(err);
//         });
//         console.log('Done with writting');
//     }
//     await browser.close();
// }

const scrapData = async (stockName) => {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({ headless: false });

        const page = await browser.newPage();
        await page.goto(
            `https://www.nseindia.com/get-quotes/equity?symbol=${stockName.toUpperCase()}`
        );

        const date = await page.$$eval('#asondate', (options) =>
            options.map((option) => option.textContent)
        );
        const name = await page.$$eval('#quoteName', (options) =>
            options.map((option) => option.textContent)
        );
        const price = await page.$$eval('#quoteLtp', (options) =>
            options.map((option) => option.textContent)
        );
        const basicIndustry = await page.$$eval(
            '#equityInfo > tbody > tr > td:nth-child(6)',
            (options) => options.map((option) => option.textContent)
        );
        const derivatives = await page.$$eval(
            '#securityInfo > tbody > tr > td:nth-child(7)',
            (options) => options.map((option) => option.textContent)
        );
        const change = await page.$$eval('#priceInfoStatus', (options) =>
            options.map((option) => option.textContent)
        );
        await browser.close();
        resolve({ date, name, price, basicIndustry, derivatives, change });
    });
};

export default scrapData;
