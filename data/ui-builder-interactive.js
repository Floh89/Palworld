(()=>{
  function enhanceBuilder(){
    if(mode!=='boss')return;
    const root=document.querySelector('.shell:not(.detail)');if(!root)return;
    const bossmode=root.querySelector('.bossmode');
    if(bossmode&&!root.querySelector('.builderhomebtn')){
      const b=document.createElement('button');b.className='builderhomebtn';b.textContent='‹ Builder Start';b.onclick=()=>window.PALWERK_BUILDER_HOME?.();bossmode.before(b);
    }
    const slots=[...root.querySelectorAll('.buildpal')];
    slots.forEach((el,i)=>{
      el.classList.toggle('mainpal',i===0);
      const info=el.children[1];
      if(info&&!info.querySelector('.slotrole')){const role=document.createElement('span');role.className='slotrole';role.textContent=i===0?'HAUPTPAL':'TEAM';info.prepend(role)}else if(info?.querySelector('.slotrole'))info.querySelector('.slotrole').textContent=i===0?'HAUPTPAL':'TEAM';
    });
    const manual=root.querySelector('.bossmanual');if(manual)manual.classList.add('manualbuildercard');
  }
  function enhanceDetail(){
    if(mode!=='boss')return;
    const detailRoot=document.querySelector('.newdetail');if(!detailRoot||detailRoot.querySelector('.buildercontext'))return;
    const identity=detailRoot.querySelector('.detailidentity');if(!identity)return;
    const name=identity.querySelector('h1')?.textContent||'';
    const anchor=window.PALWERK_BOSS_BUILDER?.anchor;
    const chip=document.createElement('span');chip.className='buildercontext';chip.textContent=`Builder · ${anchor?.name===name?'Hauptpal':'Team-Pal'}`;identity.prepend(chip);
  }
  function addFromButton(button){
    if(!button||button.disabled||mode!=='boss')return false;
    const raw=button.dataset.addboss??button.dataset.manualadd;
    if(raw==null)return false;
    const api=window.PALWERK_BOSS_BUILDER;
    if(!api?.add)return false;
    api.add(unesc(raw));
    return true;
  }
  /* UI interaction bridge: the visual redesign may wrap/redecorate builder rows,
     but team actions must always continue to call the existing builder engine. */
  app.addEventListener('click',e=>{
    if(mode!=='boss')return;
    const addButton=e.target.closest?.('[data-addboss],[data-manualadd]');
    if(addButton){
      e.preventDefault();e.stopPropagation();
      addFromButton(addButton);
      return;
    }
    const row=e.target.closest?.('.bossrec,.bosssearchrow');
    if(row&&!e.target.closest?.('button,input,select,a')){
      const rowAdd=row.querySelector('[data-addboss],[data-manualadd]');
      if(rowAdd&&!rowAdd.disabled){e.preventDefault();addFromButton(rowAdd)}
    }
  },true);
  const obs=new MutationObserver(()=>{enhanceBuilder();enhanceDetail()});obs.observe(app,{childList:true,subtree:true});enhanceBuilder();enhanceDetail();
  window.PALWERK_UI_PHASE='UI-6';
})();