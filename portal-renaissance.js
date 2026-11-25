/* 玲瓏浪漫・総合行政ポータル：窓口検索 */
(()=>{
'use strict';
const root=document.querySelector('.portal-renaissance');
if(!root)return;
const cards=[...root.querySelectorAll('[data-pr-card]')];
const query=root.querySelector('[data-pr-query]');
const category=root.querySelector('[data-pr-category]');
const count=root.querySelector('[data-pr-count]');
const empty=root.querySelector('[data-pr-empty]');
const normalize=value=>String(value||'').normalize('NFKC').toLocaleLowerCase('ja').replace(/[\s　]/g,'');
const render=()=>{
 const word=normalize(query?.value||'');
 const selected=category?.value||'all';
 let visible=0;
 cards.forEach(card=>{
  const matchesCategory=selected==='all'||card.dataset.category===selected;
  const matchesWord=!word||normalize((card.dataset.search||'')+' '+card.textContent).includes(word);
  const show=matchesCategory&&matchesWord;
  card.hidden=!show;
  if(show)visible++;
 });
 if(count)count.textContent=visible+' ／ '+cards.length+' 系統を表示';
 if(empty)empty.hidden=visible!==0;
};
query?.addEventListener('input',render);
category?.addEventListener('change',render);
query?.addEventListener('keydown',event=>{if(event.key==='Escape'){query.value='';render();}});
document.addEventListener('keydown',event=>{
 if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.altKey){
  const target=event.target;
  if(target instanceof HTMLElement&&(/INPUT|TEXTAREA|SELECT/.test(target.tagName)||target.isContentEditable))return;
  event.preventDefault();query?.focus();
 }
});
render();
})();