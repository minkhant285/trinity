const brain = require('brain.js');

function loadFile(predict_data) {
    //console.log(predict_data);
    var obj = JSON.parse(fs.readFileSync('trained.json', 'utf8'));
    console.log(obj.layers);
    net.fromJSON(obj);
    console.log("file loaded");
    const output = net.run(predict_data);
    return output;
    //console.log("black -> " + output.black + " white -> " + output.white);
}