var fs = require('fs');
const componentName = process.argv[2];
const splitter = process.argv[3] || "_"

function toCamelCase(str){
    if(typeof str !== "string") return str;
    var words = str.split(splitter);
    return words.map(word=> word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

fs.readFile('jsxtemplate.js', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/<<name>>/g, componentName).replace(/<<compname>>/g, toCamelCase(componentName));
    //var result = replace(/<<compname>>/g, toCamelCase(componentName));
    if (!fs.existsSync(componentName)) {
        fs.mkdirSync(componentName);
    }
    fs.writeFile(`${componentName}/${componentName}.component.jsx`, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});

fs.readFile('csstemplate.css', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/<<name>>/g, componentName).replace(/<<compname>>/g, toCamelCase(componentName));
    //var result = data.replace(/<<compname>>/g, toCamelCase(componentName));
    if (!fs.existsSync(componentName)) {
        fs.mkdirSync(componentName);
    }
    fs.writeFile(`${componentName}/${componentName}.style.css`, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});