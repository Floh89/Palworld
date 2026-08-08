(()=>{
  const baseRender=renderMode;
  let entered=false;
  const disabledCard=(title,sub)=>`<button class="builderpurpose disabled" disabled><span class="purposeicon">◇</span><b>${title}</b><small>${sub}</small><em>Später</em></button>`;
  function builderStart(){
    shell('Builder','Neues Team erstellen',`<section class="builderintro"><div class="eyebrow">1. EINSATZZWECK</div><h2>Was möchtest du optimieren?</h2><p>Wähle einen bereits verfügbaren Modus. Nicht implementierte Bereiche bleiben bewusst deaktiviert.</p></section><div class="builderpurposegrid"><button class="builderpurpose activepurpose" data-enterbuilder="tower"><span class="purposeicon">⚔︎</span><b>Boss / Tower</b><small>Interaktives 5er-Team für Normal und Schwer</small></button><button class="builderpurpose raidpurpose" data-enterbuilder="raid"><span class="purposeicon">✦</span><b>Raid</b><small>15 Pals gleichzeitig in der Base</small></button>${disabledCard('Farm / Loot','Noch kein eigener Builder-Modus')}${disabledCard('Erkundung','Noch kein eigener Builder-Modus')}${disabledCard('Basis','Noch kein eigener Builder-Modus')}${disabledCard('Spezial','Noch kein eigener Builder-Modus')}</div><section class="builderhint"><span>PALWERK</span><p>Bestehende Optimizer-Logik bleibt unverändert. Dieser Screen ändert ausschließlich die Navigation und Darstellung.</p></section>`);
    document.querySelectorAll('[data-enterbuilder]').forEach(b=>b.onclick=()=>{entered=true;const type=b.dataset.enterbuilder;baseRender();if(type==='raid')document.querySelector('[data-bosstype="raid"]')?.click()});
  }
  renderMode=function(){if(mode==='boss'&&!entered)builderStart();else baseRender()};
  window.PALWERK_BUILDER_HOME=()=>{entered=false;mode='boss';renderMode()};
  window.PALWERK_UI_PHASE='UI-4';
})();