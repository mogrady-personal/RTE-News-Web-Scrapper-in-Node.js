// Bring in Dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");
const express = require("express");

// Call Express
const app = express();

// Assign Port
const PORT = 8000;

// Assign URL
const url = "https://www.rte.ie/news/coronavirus/";

// Pass in URL through a promise HTTP request
axios(url)
    .then((response) => {
        const html = response.data;
        // console.log(response);
        const articles = [];

        // Assign variable $ to the HTML
        const $ = cheerio.load(html);

        // Define Empty Array to Store these Items

        // Look for elements within the HTML
        $("article", html).each(function() {
            const title = $(this).find(".underline").text();
            const link = url + $(this).find("a").attr("href");
            const img = $(this).find("img").attr("data-src");
            const alt = $(this).find("img").attr("alt");
            const categoryName = $(this).find(".category-name").text();

            articles.push({
                categoryName,
                alt,
                title,
                link,
                img,
            });
        });
        let x = articles.length;
        console.log("Number of Articles " + x);
        console.log(articles);
        console.log("Number of Articles " + x);
    })
    .catch((error) => console.log(error));

// Pass in callback to check it's working
app.listen(PORT), () => console.log(`Server is Running on Port ${PORT}`);