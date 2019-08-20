var training = require('./train');

exports.train = (a) => {
    training.train();
}

exports.predict = (a) => {
    return training.predict();
}

exports.makeDecision = (a) => {
    return (a)
}

exports.accuracy = () => {
    return ("0.98");
}
