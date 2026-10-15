/* 四季廳 公開行政情報検索
   公開ページ上の既存情報を索引化し、元の掲載箇所へ案内する。 */
(() => {
  const root = document.querySelector('.shiki-admin-search');
  if (!root) return;
  const input = root.querySelector('#shiki-admin-query');
  const category = root.querySelector('#shiki-admin-category');
  const button = root.querySelector('#shiki-admin-submit');
  const results = root.querySelector('#shiki-admin-results');
  if (!input || !category || !button || !results) return;

  const specs = [
    {selector:'#news article', type:'notice', label:'官報・公告', section:'#news'},
    {selector:'#procurement article', type:'procurement', label:'調達・公募', section:'#procurement'},
    {selector:'#duties .duty-grid article', type:'duties', label:'業務案内', section:'#duties'},
    {selector:'#departments .org-grid article, #departments .shiki-department-registry article', type:'organization', label:'組織・各局・各課', section:'#departments'},
    {selector:'#related-agencies .related-agency', type:'agencies', label:'関係行政機關', section:'#related-agencies'}
  ];
  const records = [];
  specs.forEach(spec => {
    document.querySelectorAll(spec.selector).forEach((node, index) => {
      const titleNode = node.querySelector('a, h3, strong') || node;
      const title = (titleNode.textContent || '').replace(/\s+/g, ' ').trim();
      const body = (node.textContent || '').replace(/\s+/g, ' ').trim();
      if (!title && !body) return;
      const anchor = node.querySelector('a[href]');
      let href = anchor ? anchor.getAttribute('href') : spec.section;
      if (!href || href === '#contact') href = spec.section;
      records.push({type:spec.type,label:spec.label,title:title || spec.label,body,href,order:records.length + index});
    });
  });

  const normalize = value => (value || '').toLocaleLowerCase('ja').replace(/[\s　・／\/「」『』【】（）()、。,:：;；]/g,'');
  const render = () => {
    const query = normalize(input.value);
    const type = category.value;
    const found = records.filter(record => {
      const matchesType = type === 'all' || record.type === type;
      const haystack = normalize(record.title + ' ' + record.body + ' ' + record.label);
      const matchesQuery = !query || haystack.includes(query);
      return matchesType && matchesQuery;
    }).slice(0, 12);

    results.replaceChildren();
    const status = document.createElement('p');
    status.className = 'shiki-admin-search-status';
    status.setAttribute('aria-live','polite');
    status.textContent = input.value.trim() || type !== 'all'
      ? '検索結果：' + found.length + '件（最大12件を表示）'
      : 'キーワードを入力するか、分類を選択して検索してください。';
    results.appendChild(status);
    if (!input.value.trim() && type === 'all') return;
    if (!found.length) {
      const empty = document.createElement('div');
      empty.className = 'shiki-admin-empty';
      empty.textContent = '該当する公開情報は見つかりませんでした。別の語句・分類で検索してください。なお、公開目録にない資料の不存在を意味するものではありません。';
      results.appendChild(empty);
      return;
    }
    const list = document.createElement('div');
    list.className = 'shiki-admin-result-list';
    found.forEach(record => {
      const link = document.createElement('a');
      link.className = 'shiki-admin-result';
      link.href = record.href;
      const label = document.createElement('small');
      label.textContent = record.label;
      const title = document.createElement('strong');
      title.textContent = record.title;
      const desc = document.createElement('span');
      desc.textContent = record.body.length > 118 ? record.body.slice(0,118) + '…' : record.body;
      link.append(label,title,desc);
      list.appendChild(link);
    });
    results.appendChild(list);
  };
  button.addEventListener('click', render);
  input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); render(); } });
  category.addEventListener('change', () => { if (input.value.trim() || category.value !== 'all') render(); });
})();
