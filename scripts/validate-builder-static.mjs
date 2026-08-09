import fs from 'node:fs/promises';

const ok=(condition,message)=>{if(!condition)throw new Error(message)};
const b=await fs.readFile('data/boss-builder.js','utf8');
const index=await fs.readFile('index.html','utf8');

// Guard only stable public/DOM contracts that the current working builder actually uses.
// Avoid ordering-sensitive regexes: minified/refactored code may move bindings without changing behavior.
const requiredTokens=[
  ['manual add control','data-manualadd'],
  ['manual add handler',"querySelectorAll('[data-manualadd]')"],
  ['manual search input','bossManualSearch'],
  ['manual search renderer','renderManual'],
  ['recommendation control','data-addpal'],
  ['recommendation handler',"querySelectorAll('[data-addpal]')"],
  ['remove control','data-removegroup'],
  ['remove handler',"querySelectorAll('[data-removegroup]')"],
  ['detail control','data-detailpal'],
  ['detail handler',"querySelectorAll('[data-detailpal]')"],
  ['auto fill control','autoBuild'],
  ['auto fill function','autoFill'],
  ['tower duplicate guard',"bossType==='tower'&&bossTeam.includes(id)"],
  ['raid slot rule',"bossType==='tower'?5:15"],
  ['public builder API','PALWERK_BOSS_BUILDER']
];

for(const [name,token] of requiredTokens){
  ok(b.includes(token),`builder regression: ${name} missing`);
}

const forbidden=['data/ui-builder-start.js','data/ui-builder.js','data/ui-builder-interactive.js'];
for(const file of forbidden){
  ok(!index.includes(file),`unsafe builder wrapper re-enabled: ${file}`);
}

console.log('Builder interaction regression guard: OK');