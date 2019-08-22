const brain = require('brain.js');
const likely = require('brain.js/src/likely');
const fs = require('fs');
const fire_data = require('./datasets/fire_data.json');
const normalize = require('./preprecessing');

const config = {
    hiddenLayers: [4],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid',
    learningRate: 0.6,  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
}

const net = new brain.NeuralNetwork();

// var data_set = [
//     { input: { r: 0.03, g: 0.07, b: 0.05 }, output: { black: 1 } },
//     { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
//     { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
//     { input: { r: 0.04, g: 0.06, b: 0.08 }, output: { black: 1 } },
//     { input: { r: 0.02, g: 0.06, b: 0.04 }, output: { black: 1 } }
// ];

// var data_set = [
//     { input: { r: 0.51, g: 0.53, b: 0.45 }, output: { white: 1 } },
//     { input: { r: 0.67, g: 0.70, b: 0.85 }, output: { white: 1 } },
//     { input: { r: 0.62, g: 0.55, b: 0.86 }, output: { white: 1 } },
//     { input: { r: 0.040, g: 0.032, b: 0.018 }, output: { black: 1 } },
//     { input: { r: 0.010, g: 0.021, b: 0.034 }, output: { black: 1 } },
//     { input: { r: 0.043, g: 0.061, b: 0.011 }, output: { black: 1 } },
//     { input: { r: 0.015, g: 0.043, b: 0.024 }, output: { black: 1 } }
// ];

// var data_set = [
//     { input: { wtemp: 0.03, stemp: 0.032, h: 0.08, smoke: 0.02 }, output: { fire_status: 0 } },
//     { input: { wtemp: 0.04, stemp: 0.045, h: 0.09, smoke: 0.01 }, output: { fire_status: 0 } },
//     { input: { wtemp: 0.3, stemp: 0.50, h: 0.8, smoke: 0.3 }, output: { fire_status: 1 } },
//     { input: { wtemp: 0.44, stemp: 0.55, h: 0.5, smoke: 0.9 }, output: { fire_status: 1 } }
// ];

var data_set = [
    { input: { wtemp: 33, stemp: 32, h: 8, smoke: 2 }, output: { fire_status: 0 } },
    { input: { wtemp: 40, stemp: 45, h: 9, smoke: 1 }, output: { fire_status: 0 } },
    { input: { wtemp: 30, stemp: 50, h: 3, smoke: 7 }, output: { fire_status: 1 } },
    { input: { wtemp: 44, stemp: 55, h: 2, smoke: 9 }, output: { fire_status: 1 } }
];

exports.networkTrain = () => {
    net.train(normalize.preprocessing(data_set), { iterations: 5000, log: true });
    //console.log(normalize.preprocessing(data_set));
    //saveFile();
    console.log(net.run(normalize.preprocessing_p([{ wtemp: 44, stemp: 44, h: 2, smoke: 9 }])));
    return { data: "trained" };
}


exports.prediction = (req_data) => {
    result = loadFile(req_data);
    return { "white": result.white, "black": result.black };
}

function saveFile() {
    fs.writeFile("trained.json", JSON.stringify(net.toJSON()), 'utf8', function (err) {
        if (err)
            return console.error(err);
        console.log("the file was saved!");
    })
}


function loadFile(predict_data) {
    var obj = JSON.parse(fs.readFileSync('trained.json', 'utf8'));
    //console.log(obj.layers);
    net.fromJSON(obj);
    console.log(likely(predict_data, net));
    const output = net.run(predict_data);
    return output;
    //console.log("black -> " + output.black + " white -> " + output.white);

}

