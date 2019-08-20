const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fire = require('./datasets/fire_data');
const fireTesting = require('./datasets/fire_testing');

const trainingData = tf.tensor2d(fire.map(item => [
    item.weather_temp, item.sensor_temp, item.weather, item.moisture
]));
const outputData = tf.tensor2d(fire.map(item => [
    item.fire === "true",
    item.fire === "false"
]))
const testingData = tf.tensor2d(fireTesting.map(item => [
    item.weather_temp, item.sensor_temp, item.weather, item.moisture
]))

// build neural network
const model = tf.sequential()

model.add(tf.layers.dense({
    inputShape: [4],
    activation: "sigmoid",
    units: 1,
}))
model.add(tf.layers.dense({
    activation: "sigmoid",
    units: 1,
}))
model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.sgd(0.1)
})

// train/fit our network
const startTime = Date.now()
exports.train = () => {
    model.fit(trainingData, outputData, { epochs: 20 })
        .then((history) => {
            console.log(`done at ${Date.now() - startTime}`);
            //predict();
        });
}

exports.predict = () => {
    var result = model.predict(testingData);
    console.log(outputData);
    console.log(result.argMax().dataSync()[0]);
}
