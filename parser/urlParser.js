const parser = require('./parser');

module.exports = async (url) => {
    try {
        const ads = await parser(url) //'https://fishki.net/best/period-all/'
        return ads

    } catch (e) {
        console.log(e);
    }

    process.exit(0);
}



// start();