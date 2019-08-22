const math = require('mathjs');

// var data_set = [
//     { input: { r: 30, g: 50, b: 70 }, output: { black: 1 } },
//     { input: { r: 16, g: 90, b: 20 }, output: { white: 1 } },
//     { input: { r: 50, g: 50, b: 10 }, output: { white: 1 } },
//     { input: { r: 40, g: 60, b: 80 }, output: { black: 1 } },
//     { input: { r: 20, g: 60, b: 40 }, output: { black: 1 } },
//     { input: { r: 3, g: 67560, b: 48046 }, output: { black: 1 } }
// ];

//console.log(preprocessing_p([{ r: 100, g: 200, b: 300 }]));

exports.preprocessing = (data) => {
    var modified_data = [];
    var key = [];
    var output = [];
    for (var i = 0; i < Object.keys(data[0].input).length; i++) {
        key.push(Object.keys(data[0].input)[i]);
    }
    console.log(key);
    for (var i = 0; i < data.length; i++) {
        for (var j = i; j <= i; j++) {
            // console.log(data[j].input.r);
            // console.log(data[j].input.g);
            // console.log(data[j].input.b);
            output.push(data[j].output);
            var normalisedData = normalize([data[j].input.r, data[j].input.g, data[j].input.b]);
            modified_data.push({ input: { [key[0]]: normalisedData[0], [key[1]]: normalisedData[1], [key[2]]: normalisedData[2], [key[3]]: normalisedData[3] }, output: output[j] });
        }
    }
    // console.log(modified_data);
    return modified_data;
    // console.log(output);
}

exports.preprocessing_p = (data) => {
    var modified_data = [];
    var key = [];
    for (var i = 0; i < Object.keys(data[0]).length; i++) {
        key.push(Object.keys(data[0])[i]);
    }
    // console.log(key);
    for (var i = 0; i < data.length; i++) {
        for (var j = i; j <= i; j++) {
            var normalisedData = normalize([data[j].r, data[j].g, data[j].b]);
            modified_data.push({ [key[0]]: normalisedData[0], [key[1]]: normalisedData[1], [key[2]]: normalisedData[2] });
        }
    }
    console.log(modified_data);
    // console.log(output);
    return modified_data;

}

function normalize(input_data) {
    //console.log(input_data);
    var forInput = [];
    for (var i = 0; i < input_data.length; i++) {
        forInput.push(input_data[i] - math.min(input_data) / math.max(input_data) - math.min(input_data));
    }
    return forInput;
}

exports.normalise = (data) => {
    normalize(data);
}