/* 404 middelware*/

const middlewareNotFound = (req, res, next) => {
    res.status(404).send({error: 'Page not found'});
}

module.exports = middlewareNotFound;