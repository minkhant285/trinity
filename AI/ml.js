const brain = require('brain.js');
const fs = require('fs');
const fire_data = require('./datasets/fire_data.json');

const config = {
    hiddenLayers: [4],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid',
    learningRate: 0.6  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
}

const net = new brain.NeuralNetwork(config);

exports.networkTrain = () => {
    net.train([{ input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
    { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
    { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
    { input: { r: 0.8, g: 0.9, b: 1.0 }, output: { black: 1 } }
    ],
        { iterations: 100, log: true });
    saveFile();
    return { data: "trained" };
}

exports.prediction = (req_data) => {
    result = loadFile(req_data);
    return { "white": result.white, "black": result.black };
}

function saveFile() {
    fs.writeFile("trained.json", JSON.stringify(net.toJSON()), function (err) {
        if (err)
            return console.error(err);
        console.log("the file was saved!");
    })
}

function loadFile(predict_data) {
    //console.log(predict_data);
    var obj = JSON.parse(fs.readFileSync('trained.json', 'utf8'));
    //console.log(obj.layers);
    net.fromJSON(obj);
    console.log("file loaded");
    const output = net.run(predict_data);
    return output;
    //console.log("black -> " + output.black + " white -> " + output.white);
}