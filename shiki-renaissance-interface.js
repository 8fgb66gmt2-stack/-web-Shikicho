/* 四季廳本廳舍・玲瓏浪漫インターフェース
   - 左側目次の現在位置を同期
   - 天象儀で選んだ季節をサイト意匠に反映
   既存の探索・保存・検索機能には干渉しない。
*/
(()=>{
  'use strict';
  const body=document.body;
  if(body?.dataset?.shikiPage!=='index')return;

  // ページ内目次の現在位置を示す。リンク先の既存IDだけを対象とする。
  const railLinks=[...document.querySelectorAll('.rail-nav a[href^="#"]')];
  const linkMap=new Map();
  railLinks.forEach(link=>{
    const id=decodeURIComponent(link.getAttribute('href').slice(1));
    const target=document.getElementById(id);
    if(target)linkMap.set(target,link);
  });
  const activate=target=>{
    railLinks.forEach(link=>link.removeAttribute('aria-current'));
    const link=linkMap.get(target);
    if(link)link.setAttribute('aria-current','location');
  };
  if('IntersectionObserver' in window && linkMap.size){
    const observer=new IntersectionObserver(entries=>{
      const candidates=entries
        .filter(entry=>entry.isIntersecting)
        .sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(candidates.length)activate(candidates[0].target);
    },{root:null,rootMargin:'-17% 0px -67% 0px',threshold:[0,.12,.35]});
    linkMap.forEach((_,section)=>observer.observe(section));
  }

  // 四季領域の選択を、天象儀だけでなくサイト全体の細部にも反映。
  const seasons=new Set(['spring','summer','autumn','winter']);
  const setSeason=value=>{
    if(!seasons.has(value))return;
    body.dataset.shikiSeasonFocus=value;
    document.documentElement.style.setProperty('--shiki-selected-season',value);
  };
  document.querySelectorAll('[data-season-select],[data-season]').forEach(button=>{
    button.addEventListener('click',()=>{
      const value=button.dataset.seasonSelect||button.dataset.season;
      setSeason(value);
    });
  });
  const selected=document.querySelector('[data-season-select][aria-pressed="true"]')
    ||document.querySelector('.god-tab.active[data-season]');
  if(selected)setSeason(selected.dataset.seasonSelect||selected.dataset.season);
})();
