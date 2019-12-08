import soapRequest from 'easy-soap-request';
import xml2js, { parseString } from 'xml2js';
import Queue from '../../lib/Queue';
import AlertMail from './AlertMail';

const url = process.env.EBAY_SERVICE_URL;
const sampleHeaders = {
  'X-EBAY-SOA-SECURITY-APPNAME': process.env.X_EBAY_SOA_SECURITY_APPNAME,
  'X-EBAY-SOA-OPERATION-NAME': process.env.X_EBAY_SOA_OPERATION_NAME,
};

// Usage of Module
const searchOnEbay = async alert => {
  const { name, email, search_phrase } = alert;
  const ebayMold = {
    findCompletedItemsRequest: {
      $: {
        xmlns: process.env.XMLS_EBAY,
      },
      keywords: search_phrase,
      sortOrder: 'PricePlusShippingLowest',
      paginationInput: {
        entriesPerPage: 3,
        pageNumber: 1,
      },
    },
  };

  const builder = new xml2js.Builder();
  const xml = builder.buildObject(ebayMold);

  const { response } = await soapRequest({
    url,
    headers: sampleHeaders,
    xml,
  });
  const { body } = response;

  let productsFinal = [];

  parseString(
    body,
    {
      trim: true,
      firstCharLowerCase: true,
      stripPrefix: true,
      attrkey: 'ebay',
      explicitChildren: true,
      childkey: 'child',
    },
    (err, result) => {
      const mapEbay = result.findCompletedItemsResponse.child.searchResult;
      mapEbay.forEach(products => {
        const listProducts = products;
        const { count } = listProducts.ebay;
        if (count == 0) {
          productsFinal = null;
        } else {
          const mapItem = listProducts.child.item;
          mapItem.forEach(item => {
            const product = item;
            const { title, viewItemURL } = product.child;
            const price = product.child.sellingStatus;
            let finalValue;
            price.forEach(prices => {
              const unity = prices;
              const coins = unity.child.currentPrice;
              coins.forEach(coin => {
                const real = coin;
                const dolar = real.ebay.currencyId;
                const value = real._;
                finalValue = `${dolar} ${value}`;
              });
            });
            // send email with collected data
            const finalProduct = {
              title,
              finalValue,
              viewItemURL,
            };
            productsFinal.push(finalProduct);
          });
        }
      });
    }
  );
  console.log(`ENVIANDO EMAIL: ${email}, para ${name}`);
  await Queue.add(AlertMail.key, {
    name,
    email,
    search_phrase,
    productsFinal,
  });
};

export default searchOnEbay;
