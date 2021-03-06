async function handleUpDelRes(resPromise, res) {
    let result = await resPromise;
    res.status(result ? 204 : 404).json({});
}

function checkDupErr(err, res) {
    console.log(err);
    res.status(err.code === 11000 ? 409 : 500).send(err);
}

module.exports = { handleUpDelRes, checkDupErr };