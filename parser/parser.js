const request = require('request');
const cheerio = require('cheerio');
const readline = require('readline');

const AUTOMATIC = false;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question + ' y/n(default y)', (answer) => {
            if (AUTOMATIC || !answer || answer === 'y') {
                return resolve(true);
            }

            return resolve(false);
        });
    })
}

async function getPage(url) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
            }
        }, (error, response, body) => {
            if (error) {
                return reject(error);
            }

            //Add "decodeEntities" flag to avoid decoding entities and be able to search by selectors
            return resolve(cheerio.load(body, {decodeEntities: false}));
        });
    });
}


async function getAdsFromPage(url, page) {
    let result = [];
    const $ = await getPage(url);

    const ads = $('.drag_list .drag_element').each((i, el) => {
        result.push($(el));
    });

    console.log(`Page ${page}: found ${ads.length}`);

    /*const nextPage = $('.paginator .paginator_r_block .paginator__arrow').first()
    if (nextPage.get(0) && await askQuestion('Next page?')) {
        const nextAds = await getAdsFromPage('https://fishki.net' + nextPage.attr('href'), ++page);
        result = result.concat(nextAds);
    }*/

    return result;
}

async function getDetails(url) {
    const $ = await getPage(url);
    const title = $('#post .content__title').text().trim();
    const postText = $('#post .paragraph').text().trim();
    let fullPostText = [];
    let photos = [];

    $('.container_gallery_description').each((i, el) => {
        const text = $(el).text().trim()
        if (text !== '') {
            fullPostText.push(text)
        }
    })
    $('.gallery h2').each((i, el) => {
        const text = $(el).text().trim()
        if (text !== '') {
            fullPostText.push(text)
        }
    })
    $('.paragraph p').each((i, el) => {
        const text = $(el).text().trim()
        if (text !== '') {
            fullPostText.push(text)
        }
    })
    $('.gallery p').each((i, el) => {
        const text = $(el).text().trim()
        if (text !== '') {
            fullPostText.push(text)
        }
    })


    $('.paragraph img').each((i, el) => {
        const img = $(el);
        photos.push('https://fishki.net' + img.attr('src'));
    });

    $('.gallery img').each((i, el) => {
        const img = $(el);
        photos.push(img.attr('src'));
    });

    return {
        title: title,
        postText: postText,
        fullPostText: fullPostText,
        photos: photos
    };
}

async function run(url) {
    const result = [];
    const ads = await getAdsFromPage(url, 1);
    let total = ads.length;
    console.log('Total ads found: ' + ads.length);

    for (const ad of ads) {
        /*if (!await askQuestion('Open this ad: ' + ad.find('.content__text span').text().trim() + '?')) {
            console.log('left: ' + (--total) + ' ads');
            continue;
        }*/

        let offerData = {
            postName: ad.find('.content__text span').text().trim(),
            href: ad.find('.content__text a').attr('href')
        };

        const details = await getDetails('https://fishki.net' + offerData.href);
        offerData = Object.assign(offerData, details);

        result.push(offerData);
        console.log('left: ' + (--total) + ' ads');
    }

    return result;
}

module.exports = async function (url) {
    try {
        const ads = await run(url);
        return ads;
    } catch (e) {
        throw e;
    }
};