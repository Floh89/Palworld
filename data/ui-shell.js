(()=>{
  const icon=(name)=>({
    paldex:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h4v17H7a2.5 2.5 0 0 0-2.5 2V5.5Zm15 0A2.5 2.5 0 0 0 17 3h-4v17h4a2.5 2.5 0 0 1 2.5 2V5.5Z"/></svg>',
    builder:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 4 13 13-3 3L4 7l3-3Zm10-1 4 4-5 5-4-4 5-5ZM3 17l4 4 5-5-4-4-5 5Z"/></svg>',
    inventory:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Zm0 0 8 4.5 8-4.5M12 12v9"/></svg>',
    teams:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5-1a2.5 2.5 0 1 0 0-5M3 20c.4-4 2.4-6 6-6s5.6 2 6 6H3Zm12-6c3.3.2 5.2 2.2 5.5 5H17"/></svg>'
  }[name]);
  const paldexModes=new Set(['paldeck','finder','passives','loot','work','compare','favorites']);
  const subItems=[['paldeck','Paldex'],['finder','Partner'],['passives','Passives'],['loot','Loot'],['work','Arbeit'],['compare','Vergleich'],['favorites','Favoriten']];
  const bottomMarkup=()=>{
    const section=mode==='boss'?'builder':paldexModes.has(mode)?'paldex':'';
    return `<nav class="bottomnav" aria-label="Hauptnavigation">
      <button data-mode="paldeck" class="${section==='paldex'?'active':''}">${icon('paldex')}<span>Paldex</span></button>
      <button data-mode="boss" class="${section==='builder'?'active':''}">${icon('builder')}<span>Builder</span></button>
      <button class="future" disabled aria-label="Bestand – noch nicht implementiert">${icon('inventory')}<span>Bestand</span><small>Später</small></button>
      <button class="future" disabled aria-label="Teams – noch nicht implementiert">${icon('teams')}<span>Teams</span><small>Später</small></button>
    </nav>`;
  };
  nav=function(){
    const showSub=paldexModes.has(mode);
    const sub=showSub?`<nav class="toolnav" aria-label="Paldex Werkzeuge">${subItems.map(([k,l])=>`<button data-mode="${k}" class="${mode===k?'active':''}">${l}${k==='compare'&&compare.length?` <b>${compare.length}</b>`:''}</button>`).join('')}</nav>`:'';
    return `${sub}${bottomMarkup()}`;
  };
  const baseDetail=detail;
  detail=function(id){
    baseDetail(id);
    const root=document.querySelector('.shell.detail');
    if(root&&!root.querySelector('.bottomnav')){
      root.insertAdjacentHTML('beforeend',bottomMarkup());
      root.querySelectorAll('.bottomnav [data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;renderMode()});
    }
  };
  window.PALWERK_UI_PHASE='UI-1';
})();