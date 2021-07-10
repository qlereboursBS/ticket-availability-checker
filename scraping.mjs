import puppeteer from 'puppeteer';

export const getAvailability = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://madcoolfestival.es/en/tickets.php', { waitUntil: 'networkidle0' })

    let data = await page.evaluate(() => {
        const tab = document.getElementById('tickets-fnac');
        const offers = tab.getElementsByClassName('card');
        const results = [];
        for (let offer of offers) {
            const title = offer.getElementsByClassName('day-ticket')[0].innerText;
            const bookButton = offer.getElementsByClassName('buy-tickets')[0];
            // has class and content is soldOut
            const isSoldOut = bookButton.classList.contains('soldout')
                && bookButton.innerText.trim().toLowerCase() === 'sold out';
            results.push({ title, isSoldOut });
        }

        console.debug(results);
        return results;
    });

    await browser.close();
    return data;
}