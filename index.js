const puppeteer = require('puppeteer');
const unzipper = require('unzipper');
const fs = require('fs');

(async () => {

	const wait = time => new Promise(resolve => setTimeout(resolve, time))
	
	var dir = './UB';
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	await fs.createReadStream('ub.zip').pipe(unzipper.Extract({ path: 'UB/' }))
	
	await wait(4000)

	const browser = await puppeteer.launch({
		headless: false,
		args: [
		`--load-extension=${__dirname}/UB/`,
		`--disable-extensions-except=${__dirname}/UB/`
			
		]
	
	});
	await wait(3000);
	const page = await browser.newPage();
	await page.goto('https://ouo.press/PffAIs');
	await page.waitForSelector('p[data-message="crowdBypassedInfo"]', {
		visible: true,
	});
	let element = await page.$('a')
	let text = await page.evaluate(el => el.textContent, element)
	console.log(text)
	await wait(5000);
	await browser.close();
})();