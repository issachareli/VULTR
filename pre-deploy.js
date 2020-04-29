var manifest = require('./build/asset-manifest');
var fs = require('fs');

var a = "";

for (let key in manifest){
  if (key.includes('static') && key.includes('chunk') ){
    var newKey = 'extra.';
    if (key.endsWith('.js'))
      newKey+='js'
    else if (key.endsWith('.css'))
      newKey+='css'
    else if (key.endsWith('.js.map'))
      newKey+='js.map'
    else if (key.endsWith('.css.map'))
      newKey+='css.map'

    a+= `/${newKey} \t ${manifest[key]}\n`;}
  else
    a+= `/${key} \t ${manifest[key]}\n`;
}
console.log(a);

fs.writeFile("build/_redirects", a, (err) => {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});
