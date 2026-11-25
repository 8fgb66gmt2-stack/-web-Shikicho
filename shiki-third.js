/* 四季廳 第三次大型拡張・操作層 */
(() => {
  'use strict';
  const data = window.ShikiRegistryData;
  if (!data) return;
  const $ = (selector, root=document) => root.querySelector(selector);
  const make = (tag, className, text) => { const el=document.createElement(tag); if(className)el.className=className; if(text!==undefined)el.textContent=text; return el; };
  const safeRead = key => { try { return JSON.parse(localStorage.getItem(key)||'[]'); } catch { return []; } };
  const safeWrite = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)); } catch {} };
  const clock = () => {
    const target=$('[data-third-clock]');
    if(!target)return;
    const update=()=>{target.textContent=new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',dateStyle:'long',timeStyle:'medium'}).format(new Date())+' JST';};
    update(); window.setInterval(update,1000);
  };
  const astrarium = () => {
    const root=$('[data-astrarium]'); if(!root)return;
    const detail=$('[data-astrarium-detail]',root);
    const render = id => {
      const s=data.seasons.find(x=>x.id===id)||data.seasons[0];
      root.querySelectorAll('[data-season-select]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.seasonSelect===s.id)));
      detail.replaceChildren();
      detail.append(make('span','third-kicker',s.roman+' / DIVINE REGISTER'));
      detail.append(make('h3','',s.name+'　'+s.deity+(s.alias?'／'+s.alias:'')));
      detail.append(make('p','',s.note));
      const dl=make('dl');
      const dlPairs=[['神籍',s.registry],['神性',s.power],['所管局',s.bureau],['局長',s.director],['専属護衛官',s.guardian],['巡行状況',s.status],['神域・保全','神域保全課および'+s.bureau+'の所管資料を参照']];
      for(const [k,v] of dlPairs){dl.append(make('dt','',k),make('dd','',v));}
      detail.append(dl);
      const link=make('a','third-button','関連資料を開く　→');link.href=s.record;detail.append(link);
    };
    root.querySelectorAll('[data-season-select]').forEach(b=>b.addEventListener('click',()=>render(b.dataset.seasonSelect)));
    render('spring');
  };
  const registrySearch = () => {
    const root=$('[data-registry-search]'); if(!root)return;
    const input=$('[data-registry-query]',root), category=$('[data-registry-category]',root), results=$('[data-registry-results]',root);
    const entries=[
      ...data.people.map(x=>({...x,type:'人物',category:'people',description:x.role+'／'+x.unit+'／'+x.tags,related:x.related})),
      ...data.offices.map(x=>({...x,title:x.name,type:'組織',category:'offices',description:x.scope+'／'+x.lead,related:x.docs?.[0]})),
      ...data.documents.map(x=>({...x,title:x.title,type:'公文書',category:'documents',description:x.id+'／'+x.class+'／'+x.department+'／'+x.people+'／'+x.event,related:x.url})),
      ...data.facilities.map(x=>({...x,title:x.name,type:'施設',category:'facilities',description:x.zone+'／'+x.scope,related:x.url})),
      ...data.seasons.map(x=>({...x,title:x.name+'・'+x.deity,type:'神籍',category:'seasons',description:x.registry+'／'+x.power+'／'+x.bureau+'／'+x.guardian,related:x.url}))
    ];
    const render=()=>{
      const q=input.value.trim().toLocaleLowerCase(), cat=category.value;
      const found=entries.filter(x=>(cat==='all'||x.category===cat)&&(!q||(x.title||x.name||'').toLocaleLowerCase().includes(q)||(x.description||'').toLocaleLowerCase().includes(q)));
      results.replaceChildren();
      const summary=make('p','third-muted',q||cat!=='all'?found.length+'件の公開記録が該当しました。':'公開登録 '+entries.length+'件。氏名・組織・神籍・資料番号・業務内容から横断検索できます。');
      results.append(summary);
      const list=make('div','third-result-list');
      found.forEach(x=>{
        const row=make('article','third-result'), left=make('div');
        left.append(make('span','third-kicker',x.type+' / '+(x.id||x.registry||x.number||'')));
        left.append(make('h3','',x.title||x.name));
        left.append(make('p','',x.description||''));
        const actions=make('div','third-result-actions');
        const link=make('a','', '原資料を開く →');link.href=x.url||x.related||'#';actions.append(link);
        const fav=make('button','third-button',safeRead('shikiThirdFavourites').includes(x.url||x.related)?'★ 保存済':'☆ 保存');
        fav.type='button';fav.addEventListener('click',()=>{
          const key=x.url||x.related;if(!key)return;
          const saved=safeRead('shikiThirdFavourites');const next=saved.includes(key)?saved.filter(v=>v!==key):[...saved,key];safeWrite('shikiThirdFavourites',next);fav.textContent=next.includes(key)?'★ 保存済':'☆ 保存';
        });actions.append(fav);
        row.append(left,actions);list.append(row);
      });
      if(!found.length)list.append(make('p','third-notice','該当する公開記録はありません。語句を変えるか、分類を「すべて」に戻してください。'));
      results.append(list);
    };
    $('[data-registry-submit]',root).addEventListener('click',render);
    input.addEventListener('keydown',e=>{if(e.key==='Enter')render();});
    category.addEventListener('change',render);
    render();
  };
  const facilityMap = () => {
    const root=$('[data-facility-map]');if(!root)return;
    const zones=[...new Set(data.facilities.map(x=>x.zone))], zoneRoot=$('[data-facility-zones]',root), map=$('[data-facility-rooms]',root), detail=$('[data-facility-detail]',root);
    let active=zones[0];
    const showDetail=f=>{
      detail.replaceChildren(make('span','third-kicker','FACILITY DIRECTORY / '+f.zone));
      detail.append(make('h3','',f.name),make('p','',f.scope),make('p','third-muted','關連事項：'+f.related));
      const a=make('a','third-button','所管案内を開く →');a.href=f.url;detail.append(a);
    };
    const render=()=>{
      zoneRoot.replaceChildren();zones.forEach(z=>{const b=make('button','',z);b.type='button';b.setAttribute('aria-pressed',String(z===active));b.addEventListener('click',()=>{active=z;render();});zoneRoot.append(b);});
      map.replaceChildren();data.facilities.filter(f=>f.zone===active).forEach(f=>{const b=make('button','facility-room');b.type='button';b.setAttribute('aria-pressed','false');b.append(make('strong','',f.name),make('small','',f.related));b.addEventListener('click',()=>{map.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');showDetail(f);});map.append(b);});
      const first=data.facilities.find(f=>f.zone===active);if(first)showDetail(first);
    };
    render();
  };
  const inquiry = () => {
    const root=$('[data-inquiry]');if(!root)return;
    const KEY='shikiThirdInquiry', saved=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
    let progress=saved();
    const tasks=[
      {id:'one',title:'第十五號の照合',hint:'記録に残る「帰る場所」を確認する。',answer:'春',url:'record15.html'},
      {id:'two',title:'第十八號・第十九號の照合',hint:'春季巡行欠落と保護記録を続けて読む。',answer:'花葉雛菊',url:'record19.html'},
      {id:'three',title:'諸廳合同照合',hint:'官報枢府・宮内廳・四季廳の識別符を照合する。',answer:'SHIKI-04KUNAICHO-02KANPO-12',url:'https://8fgb66gmt2-stack.github.io/-The-Official-Portal-of-the-Imperial-Cabinet-Privy-Council/record-zero.html'}
    ];
    const list=$('[data-inquiry-list]',root), status=$('[data-inquiry-status]',root), bar=$('[data-inquiry-progress]',root);
    const render=()=>{
      list.replaceChildren();let complete=0;
      tasks.forEach((t,i)=>{
        const done=!!progress[t.id];if(done)complete++;
        const card=make('article','third-card');
        card.append(make('span','third-kicker','CASE FILE / 0'+(i+1)),make('h3','',t.title),make('p','',t.hint));
        if(done){card.append(make('span','third-status','照合済'));const a=make('a','','該当資料を開く →');a.href=t.url;card.append(a);}
        else{
          const form=make('form','third-searchbar'),input=make('input');input.type='text';input.autocomplete='off';input.placeholder='照合語を入力';input.setAttribute('aria-label',t.title+'の照合語');
          const button=make('button','third-button','照合');button.type='submit';form.append(input,button);
          const feedback=make('p','third-muted','照合語は関連資料の記載から確認してください。');
          form.addEventListener('submit',e=>{e.preventDefault();const value=input.value.trim().replace(/[\s　]/g,'').toLocaleUpperCase();const answer=t.answer.replace(/[\s　]/g,'').toLocaleUpperCase();if(value===answer){progress[t.id]=true;localStorage.setItem(KEY,JSON.stringify(progress));render();}else feedback.textContent='照合不成立。関連資料をもう一度確認してください。';});
          card.append(form,feedback);
        }
        list.append(card);
      });
      bar.style.width=(complete/tasks.length*100)+'%';bar.setAttribute('aria-valuenow',String(complete));
      status.textContent=complete+' / '+tasks.length+' 件の照合を完了。進捗はこのブラウザに保存されます。';
    };
    const reset=$('[data-inquiry-reset]',root);if(reset)reset.addEventListener('click',()=>{progress={};localStorage.removeItem(KEY);render();});
    render();
  };
  const localReaderServices = () => {
    const path=location.pathname.split('/').pop()||'index.html';
    const title=document.title||path;
    try {
      const history=JSON.parse(localStorage.getItem('shikiThirdHistory')||'[]');
      const next=[{path,title,visitedAt:new Date().toISOString()},...history.filter(x=>x.path!==path)].slice(0,12);
      localStorage.setItem('shikiThirdHistory',JSON.stringify(next));
    } catch {}
    const historyRoot=$('[data-third-history]');
    if(historyRoot){
      let items=[];try{items=JSON.parse(localStorage.getItem('shikiThirdHistory')||'[]')}catch{}
      historyRoot.replaceChildren();
      if(!items.length)historyRoot.append(make('p','third-muted','閲覧履歴はありません。'));
      items.forEach(item=>{const row=make('p','',item.title);const a=make('a','','開く →');a.href=item.path;row.append('　',a);historyRoot.append(row);});
    }
    const card=$('[data-reader-card]');
    if(card){
      let id='';try{id=localStorage.getItem('shikiThirdReaderId')||'';if(!id){id='SHIKI-'+Math.random().toString(36).slice(2,8).toUpperCase();localStorage.setItem('shikiThirdReaderId',id);}}catch{id='SESSION-ONLY';}
      card.replaceChildren(make('span','third-kicker','VISITOR PASS / LOCAL BROWSER ONLY'),make('h3','',id),make('p','third-muted','この閲覧者証は当該ブラウザ内だけで使用する仮想識別票です。本人確認・認証・アクセス権限を付与するものではありません。'));
    }
    $('[data-third-print]')?.addEventListener('click',()=>window.print());
  };
  clock();localReaderServices();astrarium();registrySearch();facilityMap();inquiry();
})();
