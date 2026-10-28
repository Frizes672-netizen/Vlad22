const { chromium } = require('playwright'); const path=require('path');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1920,height:1080}});
 p.on('pageerror',e=>{console.error('ERR',e.message);process.exit(1)});
 await p.goto('file://'+path.resolve(process.argv[2])); await p.evaluate(()=>document.fonts.ready);
 for(const k of process.argv.slice(4)){ await p.evaluate(k=>window.draw(+k),k); await p.screenshot({path:`${process.argv[3]}_${k}.jpg`,quality:90}); }
 await b.close(); })();
