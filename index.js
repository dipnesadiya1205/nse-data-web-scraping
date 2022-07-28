import puppeteer from 'puppeteer';
import fs from 'fs';

const FMCGList = [
    'HINDUNILVR',
    'NESTLEIND',
    'RADICO',
    'GODREJCP',
    'DABUR',
    'MARICO',
    'UBL',
    'BRITANNIA',
    'MCDOWELL-N',
    'ITC',
    'PGHH',
    'COLPAL',
    'VBL',
    'EMAMILTD',
    'TATACONSUM',
];

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

async function writeStockData(stockName) {
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
}

(async () => {
    try {
        while (FMCGList.length !== 0) {
            for (let i = 0; i < FMCGList.length; i++) {
                const obj = await writeStockData(FMCGList[i]);

                if (
                    obj.date.toString().trim() &&
                    obj.name.toString().trim() &&
                    obj.price.toString().trim() &&
                    obj.basicIndustry.toString().trim() &&
                    obj.derivatives.toString().trim() &&
                    obj.change.toString().trim()
                ) {
                    const writeData = `Date: ${obj.date}\nName: ${obj.name} \nPrice: ${obj.price}\nBasic Industry: ${obj.basicIndustry}\nDerivatives: ${obj.derivatives}\nChange: ${obj.change}\n\n`;

                    fs.appendFileSync('FMCGList.txt', writeData, 'utf-8', (err) => {
                        if (err) reject(err);
                    });
                    console.log(`${FMCGList[i]} is appended in file`);
                    FMCGList.splice(i, 1);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
})();
