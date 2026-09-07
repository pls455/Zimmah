const $=s=>document.querySelector(s);
const replacements={
  'لك عند الآخرين':'إلي عند الناس',
  'عليك للآخرين':'عليّ للناس',
  'صافي الذمم':'الفرق',
  'هو مدين لي':'إلي عنده',
  'أنا مدين له':'إله عندي',
  'عليه لك':'إلي عنده',
  'عليك له':'إله عندي',
  '>لي<':'>إلي<',
  '>علي<':'>عليّ<',
  'الديون القريبة من الاستحقاق':'مواعيد قريبة',
  'الديون المتأخرة':'متأخرة',
  'إضافة معاملة':'إضافة دين',
  'المعاملات':'الحركات',
  'إدارة ذممك الشخصية، حتى لما الإنترنت يقرر يختفي.':'إدارة ديونك ومصاريك ببساطة.',
  'سجلها مرة، والباقي على النظام. حتى لو النت أخذ إجازة.':'سجّلها مرة، والباقي علينا.',
  'حساب مستقل لكل شخص، والرصيد ناتج من المعاملات.':'لكل شخص حسابه، والرصيد يتحدث تلقائيًا.',
  'ابحث بالاسم أو الهاتف...':'ابحث عن شخص...',
  'ابحث بالسبب أو الملاحظات أو الشخص...':'ابحث عن شخص أو سبب...',
  'إضافة شخص':'إضافة شخص',
  'تسجيل دفعة':'تسجيل دفعة',
  'إدارة ديونك':'ديونك'
};
function forceDark(){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark'}
function replaceText(){const root=$('#content');if(!root)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{let v=n.nodeValue;Object.entries(replacements).forEach(([a,b])=>{v=v.split(a).join(b)});if(v!==n.nodeValue)n.nodeValue=v});root.querySelectorAll('input[placeholder]').forEach(el=>{if(el.placeholder==='ابحث بالسبب أو الملاحظات أو الشخص...')el.placeholder='ابحث عن شخص أو سبب...';if(el.placeholder==='ابحث بالاسم أو الهاتف...')el.placeholder='ابحث عن شخص...'});}
function ensureWalletHost(){const content=$('#content');if(!content)return;const title=content.querySelector('.page-title')?.textContent?.trim()||'';const isDashboard=title.includes('مرحبًا')||title.includes('ذِمّة');let host=$('#walletWidget');if(!isDashboard){if(host)host.remove();return}const stats=content.querySelector('.stats.section');if(!host){host=document.createElement('section');host.id='walletWidget';host.className='section wallet-widget';host.setAttribute('aria-label','أموالي');if(stats)stats.insertAdjacentElement('afterend',host);else content.prepend(host)}host.hidden=false;host.style.display='block';host.style.visibility='visible';host.style.opacity='1'}
function run(){forceDark();ensureWalletHost();replaceText()}
function boot(){run();const content=$('#content');if(content)new MutationObserver(()=>{clearTimeout(window.__uxTimer);window.__uxTimer=setTimeout(run,30)}).observe(content,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
