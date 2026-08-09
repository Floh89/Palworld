import fs from 'node:fs/promises';
const ok=(c,m)=>{if(!c)throw new Error(m)};
const b=await fs.readFile('data/boss-builder.js','utf8');
const index=await fs.readFile('index.html','utf8');
const must=[
  ['manual add binding',/\[data-manualadd\][\s\S]*?onclick[\s\S]*?add\(/],
  ['recommendation add binding',/\[data-addpal\][\s\S]*?onclick[\s\S]*?add\(/],
  ['remove binding',/\[data-removegroup\][\s\S]*?onclick/],
  ['detail binding',/\[data-detailpal\][\s\S]*?onclick/],
  ['auto fill binding',/autoBuild[\s\S]*?autoFill/],
  ['manual search binding',/bossManualSearch[\s\S]*?renderManual/],
  ['tower duplicate guard',/bossType==='tower'&&bossTeam\.includes\(id\)/],
  ['raid 15 slots',/bossType==='tower'\?5:15/],
  ['public add API',/PALWERK_BOSS_BUILDER[\s\S]*?add/]
];
for(const [name,re] of must)ok(re.test(b),`builder regression: ${name} missing`);
const forbidden=['data/ui-builder-start.js','data/ui-builder.js','data/ui-builder-interactive.js'];
for(const f of forbidden)ok(!index.includes(f),`unsafe builder wrapper re-enabled: ${f}`);
console.log('Builder interaction regression guard: OK');