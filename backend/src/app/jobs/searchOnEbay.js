import soapRequest from 'easy-soap-request';
import xml2js, { parseString } from 'xml2js';
import alertMail from './AlertMail';

const url = process.env.EBAY_SERVICE_URL;
const sampleHeaders = {
  'X-EBAY-SOA-SECURITY-APPNAME': process.env.X_EBAY_SOA_SECURITY_APPNAME,
  'X-EBAY-SOA-OPERATION-NAME': process.env.X_EBAY_SOA_OPERATION_NAME,
};

// Usage of Module
const searchOnEbay = async search_phrase => {
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

  const productsFinal = [];

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
      mapEbay.map(products => {
        const listProducts = products;
        const { count } = listProducts.ebay;
        console.log(`COUNT: ${count}`);

        const mapItem = listProducts.child.item;
        mapItem.map(item => {
          const product = item;
          const { title, viewItemURL } = product.child;
          const price = product.child.sellingStatus;
          let finalValue;
          price.map(prices => {
            const unity = prices;
            const coins = unity.child.currentPrice;
            coins.map(coin => {
              const real = coin;
              const dolar = real.ebay.currencyId;
              const value = real._;
              finalValue = dolar + value;
            });
          });
          // Disparar email com os dados coletado
          console.log(`TITLE: ${title}`);
          console.log(`PRICE: ${finalValue}`);
          return console.log(`LINK: ${viewItemURL}`);
        });
      });
    }
  );
};

export default searchOnEbay;
