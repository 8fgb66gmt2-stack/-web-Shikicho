/* 四季廳・行政統合管制室：既存公開索引を使うブラウザ内機能 */
(()=>{
'use strict';
const R=window.ShikiRegistryData,D=window.ShikiFourthData;
const $=(s,r=document)=>r.querySelector(s);
const make=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;};
const normalize=s=>String(s||'').normalize('NFKC').toLocaleLowerCase('ja').replace(/[\s　]/g,'');
const safeRead=key=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}};
const safeWrite=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
if(!R||!D){const t=$('[data-cc-results]');if(t)t.textContent='公開索引を読み込めませんでした。ページを再読み込みしてください。';return;}
const entries=[
...R.people.map(x=>({title:x.name,type:'人物',desc:x.role+'／'+x.unit+'／'+x.tags,url:x.url||x.related})),
...R.offices.map(x=>({title:x.name,type:'組織',desc:x.scope+'／所管：'+x.lead,url:x.url||(x.docs||[])[0]})),
...R.seasons.map(x=>({title:x.name+'・'+x.deity,type:'神籍',desc:x.registry+'／'+x.power+'／所管：'+x.bureau+'／護衛：'+x.guardian,url:x.url||x.record})),
...R.documents.map(x=>({title:x.title,type:'公文書',desc:x.number+'／'+x.class+'／'+x.department+'／'+x.date,url:x.url})),
...R.facilities.map(x=>({title:x.name,type:'施設',desc:x.zone+'／'+x.scope,url:x.url})),
...D.events.map(x=>({title:x.title,type:'年表',desc:x.date+'／'+x.kind+'／'+x.body,url:x.url}))
].filter(x=>x.title&&x.url);
const stats=[['PEOPLE','人物',R.people.length],['OFFICES','組織',R.offices.length],['DIVINE REGISTER','神籍',R.seasons.length],['DOCUMENTS','公文書',R.documents.length],['FACILITIES','施設',R.facilities.length],['CHRONICLE','年表',D.events.length],['RELATIONS','関係索引',D.relations.length]];
const statRoot=$('[data-cc-stats]');
if(statRoot){statRoot.replaceChildren();stats.forEach(x=>{const c=make('div','cc-stat');c.append(make('strong','',String(x[2])),make('span','',x[1]),make('small','',x[0]));statRoot.append(c);});}
const clockLong=$('[data-cc-clock]'),clockShort=$('[data-cc-clock-short]');
const tick=()=>{const now=new Date();if(clockLong)clockLong.textContent=new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',dateStyle:'long',timeStyle:'medium'}).format(now)+' JST';if(clockShort)clockShort.textContent=new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now)+' JST';};
tick();window.setInterval(tick,1000);
const query=$('[data-cc-query]'),filter=$('[data-cc-filter]'),results=$('[data-cc-results]'),meta=$('[data-cc-search-meta]');
const readFavourites=()=>safeRead('shikiThirdFavourites'),isSaved=url=>readFavourites().includes(url);
const renderSearch=()=>{
 if(!query||!filter||!results)return;
 const word=normalize(query.value),kind=filter.value;
 if(!word&&kind==='all'){results.replaceChildren(make('div','cc-empty','氏名・神籍番号・部署・資料番号を入力するか、分類を選択してください。'));if(meta)meta.textContent='検索待機中 ／ 公開索引 '+entries.length+' 項目';return;}
 const found=entries.filter(x=>(kind==='all'||x.type===kind)&&(!word||normalize([x.title,x.type,x.desc].join(' ')).includes(word)));
 if(meta)meta.textContent='該当 '+found.length+' 件 ／ 検索対象 '+entries.length+' 項目';
 results.replaceChildren();
 if(!found.length){results.append(make('div','cc-empty','該当する公開記録はありません。検索語または分類を変更してください。'));return;}
 found.slice(0,40).forEach(x=>{
  const row=make('article','cc-result'),info=make('div'),actions=make('div','cc-result-actions');
  info.append(make('small','',x.type.toUpperCase()+' / SHIKI PUBLIC INDEX'),make('h3','',x.title),make('p','',x.desc));
  const link=make('a','', '原資料 →');link.href=x.url;actions.append(link);
  const fav=make('button','',isSaved(x.url)?'★ 保存済':'☆ 保存');fav.type='button';
  fav.addEventListener('click',()=>{const saved=readFavourites(),next=saved.includes(x.url)?saved.filter(v=>v!==x.url):[...saved,x.url];safeWrite('shikiThirdFavourites',next);fav.textContent=next.includes(x.url)?'★ 保存済':'☆ 保存';renderFavourites();});
  actions.append(fav);row.append(info,actions);results.append(row);
 });
 if(found.length>40)results.append(make('p','q-muted','表示は先頭40件です。検索語を追加すると絞り込めます。'));
};
$('[data-cc-search]')?.addEventListener('click',renderSearch);query?.addEventListener('input',renderSearch);filter?.addEventListener('change',renderSearch);query?.addEventListener('keydown',e=>{if(e.key==='Enter')renderSearch()});
const favRoot=$('[data-cc-favourites]');
const renderFavourites=()=>{
 if(!favRoot)return;favRoot.replaceChildren();const saved=readFavourites();
 if(!saved.length){favRoot.append(make('div','cc-empty','保存済みの資料はありません。行政情報臺帳または検索結果から保存できます。'));return;}
 const byUrl=new Map(entries.map(x=>[x.url,x]));
 saved.forEach(url=>{const item=byUrl.get(url),row=make('div','cc-favourite'),link=make('a','',item?item.title:url),remove=make('button','', '保存解除');link.href=url;remove.type='button';remove.addEventListener('click',()=>{safeWrite('shikiThirdFavourites',readFavourites().filter(v=>v!==url));renderFavourites();renderSearch();});row.append(link,remove);favRoot.append(row);});
};
renderFavourites();
$('[data-cc-clear-favourites]')?.addEventListener('click',()=>{safeWrite('shikiThirdFavourites',[]);renderFavourites();renderSearch();});
const relations=D.relations||[],nodeSelect=$('[data-cc-node]'),graph=$('[data-cc-graph]'),relList=$('[data-cc-rel-list]');
const nodeNames=[...new Set(relations.flatMap(x=>x.slice(0,2)))].sort((a,b)=>a.localeCompare(b,'ja'));
const urlMap=new Map(),addUrl=(name,url)=>{if(name&&url)urlMap.set(normalize(name),url);};
addUrl('四季廳','index.html#home');
R.people.forEach(x=>addUrl(x.name,x.url||x.related));R.offices.forEach(x=>addUrl(x.name,x.url||(x.docs||[])[0]));
R.documents.forEach(x=>{addUrl(x.title,x.url);addUrl(x.number,x.url);addUrl(x.id,x.url);});
R.seasons.forEach(x=>{addUrl(x.name,x.url||x.record);addUrl(x.deity,x.url||x.record);addUrl(x.bureau,'index.html#departments');});
R.facilities.forEach(x=>addUrl(x.name,x.url));
addUrl('帝國大學','https://8fgb66gmt2-stack.github.io/https-8fgb66gmt2-stack.github.io-nippon-imperial-university-/');
addUrl('宮内廳','https://8fgb66gmt2-stack.github.io/-teikokukunaicho-offical-web-site/');
addUrl('國家治安機構','national-security/index.html');
addUrl('夏祭執行の儀令','gazette.html#notice-2370715');
const resolveUrl=name=>urlMap.get(normalize(name))||'';
if(nodeSelect){nodeNames.forEach(n=>{const o=make('option','',n);o.value=n;nodeSelect.append(o);});nodeSelect.value=nodeNames.includes('四季廳')?'四季廳':nodeNames[0];}
const NS='http://www.w3.org/2000/svg';
const svgEl=(tag,attrs,text)=>{const n=document.createElementNS(NS,tag);Object.entries(attrs||{}).forEach(([k,v])=>n.setAttribute(k,String(v)));if(text!==undefined)n.textContent=text;return n;};
const renderNetwork=()=>{
 if(!nodeSelect||!graph||!relList)return;
 const current=nodeSelect.value,connected=relations.filter(x=>x[0]===current||x[1]===current);
 const neighbours=connected.map(x=>({name:x[0]===current?x[1]:x[0],kind:x[2]}));
 $('[data-cc-node-title]').textContent=current;$('[data-cc-rel-count]').textContent='接続する公開関係 '+connected.length+' 件';
 graph.replaceChildren(svgEl('title',{},'「'+current+'」を中心とした相互参照図'),svgEl('desc',{},'公開索引に記載された関係先を円環状に表示します。'));
 const cx=360,cy=174,r=126,shown=neighbours.slice(0,8);
 shown.forEach((item,i)=>{
  const a=(-Math.PI/2)+(Math.PI*2*i/Math.max(1,shown.length)),x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
  graph.append(svgEl('line',{x1:cx,y1:cy,x2:x,y2:y,stroke:'#ad8b51','stroke-width':1.5,opacity:.78}));
  graph.append(svgEl('text',{x:(cx+x)/2,y:(cy+y)/2-5,'text-anchor':'middle','font-size':10,fill:'#92764b'},item.kind));
  graph.append(svgEl('circle',{cx:x,cy:y,r:38,fill:'#fffaf1',stroke:'#ad8b51','stroke-width':1.5}));
  graph.append(svgEl('text',{x,y:y+4,'text-anchor':'middle','font-size':11,fill:'#4b3c32'},item.name.length>8?item.name.slice(0,8)+'…':item.name));
 });
 graph.append(svgEl('circle',{cx,cy,r:53,fill:'#762b35',stroke:'#c6a86b','stroke-width':3}));
 graph.append(svgEl('circle',{cx,cy,r:44,fill:'none',stroke:'rgba(255,248,237,.55)','stroke-width':1}));
 graph.append(svgEl('text',{x:cx,y:cy+5,'text-anchor':'middle','font-size':15,fill:'#fff8ed'},current.length>6?current.slice(0,6)+'…':current));
 relList.replaceChildren();
 if(!connected.length){relList.append(make('div','cc-empty','この項目に接続する公開関係は登録されていません。'));return;}
 const list=make('div','cc-relations-list');
 connected.forEach(edge=>{
  const other=edge[0]===current?edge[1]:edge[0],item=make('div','cc-relation'),info=make('div'),button=make('button','', '起点にする');
  info.append(make('strong','',other),make('small','',edge[2]));button.type='button';button.addEventListener('click',()=>{nodeSelect.value=other;renderNetwork();});
  item.append(info,button);const url=resolveUrl(other);if(url){const link=make('a','cc-relation-source','原資料');link.href=url;item.append(link);}list.append(item);
 });
 relList.append(list);if(neighbours.length>8)relList.append(make('p','q-muted','関係 '+neighbours.length+' 件のうち、図には先頭8件を表示しています。一覧には全件を表示しています。'));
};
nodeSelect?.addEventListener('change',renderNetwork);renderNetwork();
const eventRoot=$('[data-cc-events]');
if(eventRoot){eventRoot.replaceChildren();const events=[...D.events].sort((a,b)=>(b.sort||0)-(a.sort||0));events.slice(0,6).forEach(x=>{const card=make('article','cc-event'),link=make('a','', '原資料を開く →');card.append(make('time','',x.date+' ／ '+x.kind),make('h3','',x.title),make('p','',x.body));link.href=x.url;card.append(link);eventRoot.append(card);});if(!events.length)eventRoot.append(make('p','q-muted','年表に登録された公開記録はありません。'));}
})();