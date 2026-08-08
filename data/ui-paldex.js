(()=>{
  const elementOrder=['Alle','Feuer','Wasser','Elektro','Gras','Eis','Drache','Dunkel','Neutral','Boden'];
  const paldexCard=p=>{const pa=partner(p),native=(p.innatePassives||[])[0];return `<article class="paldexrow">
    <button class="paldexopen" data-key="${esc(uid(p))}">
      <div class="paldexart">${art(p)}</div>
      <div class="paldexmain">
        <span class="palnumber">#${p.id}</span>
        <b>${p.name}</b>
        <div class="elementline">${(p.elements||[]).map(e=>`<span class="elementpill element-${String(e).toLowerCase()}">${icons[e]||''} ${e}</span>`).join('')}</div>
        <div class="paldexmeta">${p.isBoss?'<span>Boss</span>':''}${native?`<span>★ ${native.name}</span>`:''}${pa?.name?`<span>${pa.name}</span>`:''}</div>
      </div>
    </button>
    <div class="paldexactions">
      <button data-fav="${esc(uid(p))}" aria-label="${isFav(p)?'Favorit entfernen':'Als Favorit markieren'}">${isFav(p)?'★':'☆'}</button>
      <button data-compare="${esc(uid(p))}" ${compare.includes(uid(p))||compare.length>=4?'disabled':''} aria-label="Zum Vergleich hinzufügen">${compare.includes(uid(p))?'✓':'＋'}</button>
    </div>
  </article>`};
  function activeFilterMarkup(){const rows=[];if(element!=='Alle')rows.push(['element',`${icons[element]||''} ${element}`]);if(purpose!=='Alle')rows.push(['purpose',purpose]);if(ability!=='Alle')rows.push(['ability',ability]);if(passive!=='Alle')rows.push(['passive',passive]);if(work!=='Alle')rows.push(['work',work]);if(loot!=='Alle')rows.push(['loot',loot]);return rows.map(([k,l])=>`<button class="filterchip" data-clearfilter="${k}">${l}<span>×</span></button>`).join('')}
  function bindFilterClears(render){document.querySelectorAll('[data-clearfilter]').forEach(b=>b.onclick=()=>{const k=b.dataset.clearfilter;if(k==='element')element='Alle';if(k==='purpose'){purpose='Alle';ability='Alle'}if(k==='ability')ability='Alle';if(k==='passive')passive='Alle';if(k==='work')work='Alle';if(k==='loot')loot='Alle';paldeck()})}
  paldeck=function(){
    shell('Paldex','Alle Pals, Fähigkeiten, Drops und Details entdecken',`<div class="paldexbar"><div class="searchwrap"><span>⌕</span><input class="search" id="q" placeholder="Suche nach Pal, Fähigkeit, Arbeit oder Beute…"></div><button class="filterbutton filtericon" id="filterBtn" aria-label="Filter öffnen">≡</button></div>
      <div class="elementchips" id="elementChips">${elementOrder.map(e=>`<button data-elementchip="${e}" class="${element===e?'active':''}">${e==='Alle'?'Alle':`${icons[e]||''} ${e}`}</button>`).join('')}</div>
      <div class="activefilters" id="activeFilters"></div>
      <div class="paldexsummary"><b id="count"></b><button class="sorttrigger" id="filterSortBtn">Sortierung: ${sort}</button></div>
      <div class="paldexlist" id="paldexList"></div>
      <div class="filtersheet" id="filterSheet" hidden>
        <button class="sheetbackdrop" id="sheetBackdrop" aria-label="Filter schließen"></button>
        <section class="sheetpanel" role="dialog" aria-modal="true" aria-label="Paldex Filter">
          <div class="sheethandle"></div><div class="sheethead"><div><span class="eyebrow">FILTER</span><h2>Paldex eingrenzen</h2></div><button class="sheetclose" id="sheetClose">×</button></div>
          <div class="sheetcontent">${select('Element','elementSelect',elementOrder,element)}${select('Zweck der Partnerfähigkeit','purposeSelect',purposeOptions(),purpose)}${select('Detail-Effekt','abilitySelect',clusters(),ability)}${select('Nativ / exklusive Passivfähigkeit','passiveSelect',passiveNames(),passive)}${select('Arbeitsfähigkeit','workSelect',workNames(),work)}${select('Beute / Item','lootSelect',lootNames(),loot)}${select('Sortierung','sortSelect',['Paldeck','Name','Angriff','HP','Verteidigung'],sort)}</div>
          <div class="sheetfooter"><button class="reset" id="reset">Alle zurücksetzen</button><button class="applyfilter" id="applyFilter">Ergebnisse anzeigen</button></div>
        </section>
      </div>`);
    const q=document.querySelector('#q');
    const render=()=>{const ps=sortPals(filtered(q.value));document.querySelector('#paldexList').innerHTML=ps.map(paldexCard).join('')||'<div class="empty">Keine Pals für diese Auswahl.</div>';document.querySelector('#count').textContent=`${ps.length} Pals`;document.querySelector('#activeFilters').innerHTML=activeFilterMarkup();bindCards();bindFilterClears(render)};
    const sheet=document.querySelector('#filterSheet');const openSheet=()=>{sheet.hidden=false;document.body.classList.add('sheetopen')};const closeSheet=()=>{sheet.hidden=true;document.body.classList.remove('sheetopen')};
    document.querySelector('#filterBtn').onclick=openSheet;document.querySelector('#filterSortBtn').onclick=openSheet;document.querySelector('#sheetBackdrop').onclick=closeSheet;document.querySelector('#sheetClose').onclick=closeSheet;document.querySelector('#applyFilter').onclick=()=>{closeSheet();render()};
    document.querySelectorAll('[data-elementchip]').forEach(b=>b.onclick=()=>{element=b.dataset.elementchip;paldeck()});
    bindSelect('elementSelect',v=>element=v,render);bindSelect('purposeSelect',v=>{purpose=v;if(v==='Alle')ability='Alle'},render);bindSelect('abilitySelect',v=>ability=v,render);bindSelect('passiveSelect',v=>passive=v,render);bindSelect('workSelect',v=>work=v,render);bindSelect('lootSelect',v=>loot=v,render);bindSelect('sortSelect',v=>sort=v,()=>paldeck());
    document.querySelector('#reset').onclick=()=>{element=purpose=ability=passive=work=loot='Alle';sort='Paldeck';closeSheet();paldeck()};q.oninput=render;render();
  };
  window.PALWERK_UI_PHASE='UI-2';
})();