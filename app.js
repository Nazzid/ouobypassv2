const express = require("express")
const app = express()
const puppeteer = require('puppeteer');

app.use(express.static("public"))

app.get("/", async function(req, res) {
    if (!req.query.link) {
        return res.json({
            "code": 404,
            "result": "Wheres The Link ?"
        })
    } else {
        var link = req.query.link.match(/https:\/\/ouo\.press\/(.+)/);
        if (!link) {
            return res.json({
                "code": 404,
                "result": "Link doesn't Match"
            })
        }
    }
    console.log(link[0])
    linkzippy = ""
    const wait = time => new Promise(resolve => setTimeout(resolve, time))
        //const browser = await puppeteer.launch({headless: true});
    const browser = await puppeteer.launch({
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    try {
        const page = await browser.newPage();
        await page.goto(link[0]);
        console.log(page.url());

        current_url1 = page.url();
        let isDataLoaded1 = false
        while (!isDataLoaded1) {
            console.log(page.url());
            try {
                ouo2 = page.url();
                if (current_url1 !== ouo2) {
                    isDataLoaded1 = true
                } else if (ouo2.match(/https:\/\/(.+?).zippyshare.com\/(.+)/)) {
                    isDataLoaded1 = true
                }
                await page.click('#btn-main');
            } catch {
                try {
                    await page.click('#btn-main');
                } catch {
                    console.log("button ilang");
                }
            }
            await wait(10000);
        }

        console.log(page.url());
        current_url = page.url();
        console.log(current_url);
        try {
            await page.click('#btn-main');
        } catch {}
        let isDataLoaded = false

        while (!isDataLoaded) {
            console.log(page.url());
            try {
                linkzippy = page.url();
                if (current_url !== linkzippy) {
                    isDataLoaded = true
                } else if (ouo2.match(/https:\/\/(.+?).zippyshare.com\/(.+)/)) {
                    isDataLoaded = true
                }
                await page.click('#btn-main');
            } catch {
                try {
                    await page.click('#btn-main');
                } catch {
                    console.log("button ilang");
                }
            }
            await wait(10000);
        }
        await browser.close();
    } catch {
        await browser.close();
    }
    res.json({
        "code": 200,
        "result": linkzippy
    })
})

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));