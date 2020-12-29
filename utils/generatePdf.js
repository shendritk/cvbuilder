const puppeteer = require("puppeteer");
const inlineCss = require("inline-css");
const pug = require("pug");
const { v4: uuid } = require("uuid");

module.exports = async (data, template) => {
  // Launch a new chrome instance
  const browser = await puppeteer.launch({
    headless: true,
  });

  // Create a new page
  const page = await browser.newPage();

  // Convert the pug file to an HTML String
  const templateUrl = `${__dirname}/../templates/template${template}.pug`;

  const html = await pug.renderFile(templateUrl, {
    data,
  });

  // Add the inline css to the HTML String
  const htmlWithCss = await inlineCss(html, {
    url: `${process.env.HOST_URL}`,
  });

  await page.setContent(htmlWithCss, {
    waitUntil: "domcontentloaded",
  });

  const filePath = uuid();

  // Create the pdf file
  await page.pdf({
    width: "1000px",
    height: "1400px",
    path: `${__dirname}/../pdf-files/${filePath}.pdf`,
  });

  // Close the browser
  await browser.close();

  const url = `${process.env.HOST_URL}/api/v1/cv/${filePath}`;
  return url;
};
