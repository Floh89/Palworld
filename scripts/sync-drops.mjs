import fs from 'node:fs/promises';
const BASE='https://raw.githubusercontent.com/zhudikangta/paltoolbox/main/PalToolbox/%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/%E5%B9%BB%E5%85%BD%E5%B8%95%E9%B2%811.0/%E6%95%B0%E6%8D%AE%E5%8C%85/';
const [dr,pr]=await Promise.all([fetch(BASE+'%E6%8E%89%E8%90%BD.json'),fetch(BASE+'%E5%B8%95%E9%B2%81.json')]);
if(!dr.ok||!pr.ok)throw new Error(`Source HTTP drops=${dr.status} pals=${pr.status}`);
const drops=await dr.json(),pals=await pr.json();const ORDINARY=new Set(['基础','亚种','泰拉瑞亚']);
const byId={};for(const p of pals){if(!ORDINARY.has(p['分类']))continue;const num=p['图鉴编号'];if(num==null||Number(num)<=0)continue;const id=String(num)+String(p['图鉴后缀']||'');const rec=drops.palDrops?.[p.id];if(!rec)continue;byId[id]={sourcePalId:p.id,items:(rec.items||[]).map(x=>({itemId:x.itemID,name:x.nameCN||x.itemID,chance:Number(x.rate),min:Number(x.min),max:Number(x.max)}))};}
const out={meta:{gameVersion:'v1.0.0',generatedAt:new Date().toISOString(),source:'Palworld DT_PalDropItem-derived dataset',count:Object.keys(byId).length,rawDropCharacters:drops.meta?.statistics?.totalDropCharacters||null},byId};
if(out.meta.count<190)throw new Error(`Expected >=190 Pal drop records, got ${out.meta.count}`);
await fs.mkdir('data',{recursive:true});await fs.writeFile('data/drops-local.json',JSON.stringify(out,null,2)+'\n');console.log(`Wrote ${out.meta.count} exact ordinary Pal drop records`);