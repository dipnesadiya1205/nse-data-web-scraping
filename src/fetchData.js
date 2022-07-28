import fs from 'fs';
import scrapData from './scrapData.js';

const fetchingData = async (list, sector) => {
    try {
        while (list.length !== 0) {
            for (let i = 0; i < list.length; i++) {
                const obj = await scrapData(list[i]);

                if (
                    obj.date.toString().trim() &&
                    obj.name.toString().trim() &&
                    obj.price.toString().trim() &&
                    obj.basicIndustry.toString().trim() &&
                    obj.derivatives.toString().trim() &&
                    obj.change.toString().trim()
                ) {
                    const writeData = `Date: ${obj.date}\nName: ${obj.name} \nPrice: ${obj.price}\nBasic Industry: ${obj.basicIndustry}\nDerivatives: ${obj.derivatives}\nChange: ${obj.change}\n\n`;

                    let fileName = new Date(obj.date.toString().trim());
                    fileName = `${fileName.getFullYear()}-${
                        fileName.getMonth() + 1
                    }-${fileName.getDate()}`;

                    fs.appendFileSync(`./StockList/${sector}/${fileName}.txt`, writeData, 'utf-8');
                    console.log(`${list[i]} is appended in file`);
                    list.splice(i, 1);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const FMCG = async () => {
    try {
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

        await fetchingData(FMCGList, 'FMCG');

        console.log('Data fetched successfully');
        return;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const AUTO = async () => {
    try {
        const AUTOlist = [
            'ASHOKLEY',
            'BAJAJ-AUTO',
            'BALKRISIND',
            'BHARATFORG',
            'BOSCHLTD',
            'EICHERMOT',
            'ESCORTS',
            'HEROMOTOCO',
            'MRF',
            'M&M',
            'MARUTI',
            'SONACOMS',
            'TVSMOTOR',
            'TATAMOTORS',
            'TIINDIA',
        ];

        await fetchingData(AUTOlist, 'AUTO');

        console.log('Data fetched successfully');
        return;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export { FMCG, AUTO };
