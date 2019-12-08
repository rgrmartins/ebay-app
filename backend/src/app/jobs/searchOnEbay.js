import soapRequest from 'easy-soap-request';
import fs from 'fs';

const url = process.env.EBAY_SERVICE_URL;
const sampleHeaders = {
  'X-EBAY-SOA-SECURITY-APPNAME': process.env.X_EBAY_SOA_SECURITY_APPNAME,
  'X-EBAY-SOA-OPERATION-NAME': process.env.X_EBAY_SOA_OPERATION_NAME,
};

const xml = fs.readFileSync(process.env.DIR_XML_EBAY, 'utf-8');

// Usage of Module
const searchOnEbay = async () => {
  const { response } = await soapRequest({
    url,
    headers: sampleHeaders,
    xml,
  });
  const { headers, body, statusCode } = response;
  console.log(`HEADERS ======> ${headers}`);
  console.log(`BODY ======> ${body}`);
  console.log(`STATUS CODE ======> ${statusCode}`);
};

export default searchOnEbay;
