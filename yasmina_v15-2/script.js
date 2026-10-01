const STORE_KEY="yasmina-admin-data-v2";
const PHOTO_LIBRARY={
  window:"https://images.pexels.com/photos/35324617/pexels-photo-35324617/free-photo-of-elegant-woman-in-abaya-sitting-by-a-window.jpeg?auto=compress&dpr=1&w=1400",
  embroidered:"https://images.pexels.com/photos/17833527/pexels-photo-17833527/free-photo-of-woman-in-hijab-and-abaya.jpeg?auto=compress&dpr=1&w=1400",
  portrait:"https://images.pexels.com/photos/34251176/pexels-photo-34251176/free-photo-of-smiling-woman-in-traditional-islamic-clothing-portrait.jpeg?auto=compress&dpr=1&w=1400",
  blackEmbroidered:"https://images.pexels.com/photos/33429344/pexels-photo-33429344/free-photo-of-elegant-portrait-of-woman-in-hijab-with-embroidered-abaya.jpeg?auto=compress&dpr=1&w=1400",
  black:"https://images.pexels.com/photos/8422432/pexels-photo-8422432.jpeg?auto=compress&dpr=1&w=1400",
  prayer:"https://images.pexels.com/photos/8422437/pexels-photo-8422437.jpeg?auto=compress&dpr=1&w=1400",
  mosque:"https://images.pexels.com/photos/37558000/pexels-photo-37558000.jpeg?cs=srgb&w=1400"
};
const fallbackProducts=[
{id:"P001",name:"Satin Noor Dress",category:"Dresses",price:169000,stock:12,badge:"NEW",img:PHOTO_LIBRARY.window},
{id:"P002",name:"Mira Everyday Abaya",category:"Abayas",price:199000,stock:7,badge:"BESTSELLER",img:PHOTO_LIBRARY.embroidered},
{id:"P003",name:"Ivory Grace Set",category:"Sets",price:149000,stock:3,badge:"NEW",img:PHOTO_LIBRARY.portrait},
{id:"P004",name:"Luna Black Abaya",category:"Abayas",price:219000,stock:9,badge:"SIGNATURE",img:PHOTO_LIBRARY.black},
{id:"P005",name:"Soft Sand Coat",category:"Outerwear",price:249000,stock:2,badge:"LIMITED",img:PHOTO_LIBRARY.blackEmbroidered},
{id:"P006",name:"Silk Cloud Scarf",category:"Scarves",price:59000,stock:24,badge:"ESSENTIAL",img:PHOTO_LIBRARY.prayer},
{id:"P007",name:"Ramadan Grace Abaya",category:"Abayas",price:229000,stock:8,badge:"RAMADAN EDIT",img:PHOTO_LIBRARY.mosque},
{id:"P008",name:"Pearl Occasion Dress",category:"Dresses",price:239000,stock:6,badge:"EID EDIT",img:PHOTO_LIBRARY.window}
];
const localDb=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||"null")}catch{return null}};
let live=localDb();
let products=(live?.products||fallbackProducts).map((p,i)=>({...p,price:+p.price||0,img:p.img||Object.values(PHOTO_LIBRARY)[i%Object.values(PHOTO_LIBRARY).length]}));
let settings={categories:["Dresses","Abayas","Sets","Outerwear","Scarves"],name:"Yasmina Collection",phone:"+998 91 190 87 40",address:"Seoul Street 190, Tashkent",heroTitle:"Modest looks. Quiet luxury.",heroLead:"Thoughtfully designed fashion for women who love elegance, comfort and beautiful coverage.",ramadanEnabled:true,instagramUrl:"",telegramUrl:"",mapUrl:"https://yandex.com/maps/?text=Seoul%20Street%20190%2C%20Tashkent",...(live?.settings||{})};
let cart=JSON.parse(localStorage.getItem("yasmina-cart")||"[]");
let activeFilter=new URLSearchParams(location.search).get("category")||"all";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function refreshStore(){const d=localDb();if(!d)return;products=(d.products||[]).map((p,i)=>({...p,price:+p.price||0,img:p.img||Object.values(PHOTO_LIBRARY)[i%Object.values(PHOTO_LIBRARY).length]}));settings={...settings,...(d.settings||{})};applySettings();renderAll()}
function applySettings(){
 document.title=`${settings.name||"Yasmina Collection"} — Modest Fashion`;
 const heroTitle=$("#heroTitle");
 if(heroTitle)heroTitle.innerHTML=(settings.heroTitle||"Modest looks. Quiet luxury.").replace(/\./g,".<br>");
 const lead=$("#heroLead");if(lead)lead.textContent=settings.heroLead||"Thoughtfully designed fashion for women who love elegance, comfort and beautiful coverage.";
 $$('[data-shop-name]').forEach(e=>e.textContent=settings.name||"Yasmina Collection");
 const phone=$("#shopPhonePublic");if(phone){phone.textContent=settings.phone||"";phone.href=`tel:${(settings.phone||"").replace(/[^+\d]/g,"")}`;}
 const topPhone=$("#topPhone");if(topPhone){topPhone.querySelector("b").textContent=settings.phone||"";topPhone.href=`tel:${(settings.phone||"").replace(/[^+\d]/g,"")}`;}
 const address=$("#shopAddressPublic");if(address){address.textContent=(settings.address||"")+" ↗";address.href=settings.mapUrl||`https://yandex.com/maps/?text=${encodeURIComponent(settings.address||"")}`;}
 const topAddress=$("#topAddress");if(topAddress){topAddress.querySelector("b").textContent=settings.address||"";topAddress.href=settings.mapUrl||`https://yandex.com/maps/?text=${encodeURIComponent(settings.address||"")}`;}
 const socials={instagram:settings.instagramUrl,telegram:settings.telegramUrl};
 $$('.social-link').forEach(a=>{const u=socials[a.dataset.social]||"";a.href=u||"#";a.style.display=u?"":"none";});
 const ram=$("#ramadanSection");if(ram)ram.style.display=settings.ramadanEnabled===false?"none":"grid";
 const aboutTitle=$("#aboutTitlePublic");if(aboutTitle)aboutTitle.textContent=settings.aboutTitle||"About Yasmina Collection";
 const aboutText=$("#aboutTextPublic");if(aboutText)aboutText.textContent=settings.aboutText||"Yasmina Collection is a Tashkent boutique focused on modest women’s fashion and religious goods.";
 const hours=$("#openingHoursPublic");if(hours)hours.textContent=settings.openingHours||"10:00–21:00 daily";
 const aboutAddr=$("#aboutAddressPublic");if(aboutAddr)aboutAddr.textContent=settings.address||"Seoul Street 190, Tashkent";
 const aboutNote=$("#aboutNotePublic");if(aboutNote)aboutNote.textContent=settings.aboutNote||"";
}

function money(n){return new Intl.NumberFormat("uz-UZ").format(n||0)+" сум"}
function save(){localStorage.setItem("yasmina-cart",JSON.stringify(cart));renderAll()}
function count(){return cart.reduce((a,i)=>a+i.qty,0)}
function totals(){const subtotal=cart.reduce((s,i)=>{const p=products.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0)},0);const delivery=subtotal>=300000?0:(subtotal?30000:0);return{subtotal,delivery,total:subtotal+delivery}}
function renderAll(){updateCount();renderCategoryFilters();renderProducts(activeFilter);renderProductDetail();if($("#orderItems"))renderOrder();if($("#drawerItems"))renderDrawer();applySettings();if(document.body.dataset.page==="clothes")renderPageTitle();setTimeout(initScrollReveal,0)}
function updateCount(){$("#cartCount").textContent=count()}
function getCategories(){const cats=Array.isArray(settings.categories)?settings.categories:[];return cats.length?cats:[...new Set(products.map(p=>p.category).filter(Boolean))]}
function renderCategoryFilters(){
 const box=$("#filters");if(!box)return;const cats=getCategories();
 box.innerHTML=`<button class="filter ${activeFilter==="all"?'active':''}" data-filter="all">All</button>`+cats.map(c=>`<button class="filter ${activeFilter===c?'active':''}" data-filter="${String(c).replace(/"/g,'&quot;')}">${c}</button>`).join('');
 $$('.filter').forEach(btn=>btn.addEventListener('click',()=>{activeFilter=btn.dataset.filter;$$('.filter').forEach(b=>b.classList.toggle('active',b===btn));history.replaceState(null,'',activeFilter==='all'?'clothes.html':`clothes.html?category=${encodeURIComponent(activeFilter)}`);renderProducts(activeFilter);renderPageTitle()}));
}
function renderProducts(filter="all",search=""){
 let list=products.filter(p=>(filter==="all"||filter==="featured"||p.category===filter)&&(!search||`${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())));
 if(document.body.dataset.page!=="clothes" && filter==="all"){
   const preferred=["BESTSELLER","NEW","LIMITED","RAMADAN EDIT","SIGNATURE","EID EDIT"];
   list=products.filter(p=>preferred.includes(String(p.badge||"").toUpperCase())).slice(0,6);
 }
 $("#products").innerHTML=list.length?list.map(p=>`<article class="product-card"><a class="product-card-link" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="product-badge">${p.badge||"YASMINA"}</span><button class="product-like" aria-label="Favorite ${p.name}" onclick="event.preventDefault();favorite(this)">♡</button><div class="product-hover"><button type="button" ${p.stock<=0?'disabled':''} onclick="event.preventDefault();add('${p.id}')">${p.stock<=0?'OUT OF STOCK':'ADD TO BAG'} · ${money(p.price)}</button></div></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.category}</p></div><strong class="product-price">${money(p.price)}</strong></div></a></article>`).join(""):`<div class="empty" style="grid-column:1/-1">No pieces found. Try another search.</div>`;
}
function favorite(btn){btn.textContent=btn.textContent==="♡"?"♥":"♡";toast(btn.textContent==="♥"?"Saved to favorites":"Removed from favorites")}
function add(id){const p=products.find(x=>x.id===id);if(!p||p.stock<=0){toast("This piece is currently unavailable");return}const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();toast("Added to your bag");openDrawer()}
function change(id,n){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function removeItem(id){cart=cart.filter(i=>i.id!==id);save();toast("Item removed")}
function itemMarkup(i){const p=products.find(x=>x.id===i.id);if(!p)return "";return `<div class="item"><div class="thumb" style="background-image:url('${p.img}')"></div><div><h4>${p.name}</h4><small>${money(p.price)}</small><div class="qty"><button onclick="change('${p.id}',-1)">−</button><span>${i.qty}</span><button onclick="change('${p.id}',1)">+</button></div></div><div class="item-total">${money(p.price*i.qty)}<button class="remove" onclick="removeItem('${p.id}')">remove</button></div></div>`}
function renderOrder(){const box=$("#orderItems");if(!box)return;box.innerHTML=cart.length?cart.map(itemMarkup).join(""):`<div class="empty">Your bag is waiting.<br><a href="clothes.html">Explore the collection →</a></div>`;const t=totals();if($("#subtotal"))$("#subtotal").textContent=money(t.subtotal);if($("#delivery"))$("#delivery").textContent=t.delivery?money(t.delivery):"FREE";if($("#total"))$("#total").textContent=money(t.total)}
function renderDrawer(){const box=$("#drawerItems");if(!box)return;box.innerHTML=cart.length?cart.map(itemMarkup).join(""):`<div class="empty">Your bag is empty.<br><a href="clothes.html" onclick="closeDrawer()">Start shopping →</a></div>`;if($("#drawerSubtotal"))$("#drawerSubtotal").textContent=money(totals().subtotal)}
function openDrawer(){$("#cartDrawer").classList.add("open");$("#drawerBackdrop").classList.add("show")};function closeDrawer(){$("#cartDrawer").classList.remove("open");$("#drawerBackdrop").classList.remove("show")}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),1800)}

$$('.category-strip a').forEach(a=>a.addEventListener('click',()=>{if(a.href.includes("clothes.html")) return;activeFilter=a.dataset.filter;$$('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===activeFilter));renderProducts(activeFilter)}));
if($("#openCart"))$("#openCart").onclick=openDrawer;if($("#closeCart"))$("#closeCart").onclick=closeDrawer;if($("#drawerBackdrop"))$("#drawerBackdrop").onclick=closeDrawer;if($("#viewOrder"))$("#viewOrder").onclick=closeDrawer;if($("#drawerCheckout"))$("#drawerCheckout").onclick=()=>{closeDrawer();openCheckout()};
function openCheckout(){if(!cart.length){toast("Add a product first");if(document.body.dataset.page==="clothes")location.href="clothes.html";else location.hash="shop";return}if(!$("#checkoutModal")){location.href="index.html#order";return}$("#checkoutModal").classList.add("show")}
if($("#checkoutBtn"))$("#checkoutBtn").onclick=openCheckout;if($("#closeModal"))$("#closeModal").onclick=()=>$("#checkoutModal").classList.remove("show");if($("#checkoutModal"))$("#checkoutModal").onclick=e=>{if(e.target.id==="checkoutModal")$("#checkoutModal").classList.remove("show")};
if($("#checkoutForm"))$("#checkoutForm").onsubmit=async e=>{e.preventDefault();const form=new FormData(e.currentTarget),t=totals();const order={name:String(form.get("name")||""),phone:String(form.get("phone")||""),country:String(form.get("country")||"Uzbekistan"),address:String(form.get("address")||""),items:cart.map(i=>{const p=products.find(x=>x.id===i.id);return[p?.name||i.id,i.qty]}),total:t.total};const button=e.currentTarget.querySelector("button[type=submit]");button.disabled=true;button.textContent="Sending order…";try{if(!location.protocol.startsWith("http"))throw Error("Run the website through the Node server to place orders.");const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});const d=await r.json();if(!r.ok||!d.ok)throw Error(d.error||"Could not create order");cart=[];save();$("#checkoutModal").classList.remove("show");toast(`Order ${d.order.id} received`);}catch(err){toast(err.message||"Order failed")}finally{button.disabled=false;button.innerHTML="Proceed to payment <span>↗</span>"}};
if($("#openSearch"))$("#openSearch").onclick=()=>{$("#searchOverlay").classList.add("show");$("#searchInput").focus();renderSearch("")};if($("#closeSearch"))$("#closeSearch").onclick=()=>$("#searchOverlay").classList.remove("show");if($("#searchInput"))$("#searchInput").addEventListener("input",e=>renderSearch(e.target.value));
function renderSearch(q){const list=products.filter(p=>`${p.name} ${p.category}`.toLowerCase().includes(q.toLowerCase()));$("#searchResults").innerHTML=list.map(p=>`<div class="search-result" onclick="add('${p.id}')"><img src="${p.img}" alt="${p.name}"><strong>${p.name}</strong><small>${p.category} · ${money(p.price)}</small></div>`).join("")}
if($("#openMenu"))$("#openMenu").onclick=()=>$("#mobileMenu").classList.add("open");if($("#closeMenu"))$("#closeMenu").onclick=()=>$("#mobileMenu").classList.remove("open");$$('.mobile-menu a').forEach(a=>a.onclick=()=>$("#mobileMenu").classList.remove("open"));
function renderProductDetail(){
 if(document.body.dataset.page!=="product")return;
 const id=new URLSearchParams(location.search).get("id");const p=products.find(x=>x.id===id);
 const root=$("#productDetail");if(!root)return;if(!p){root.innerHTML='<div class="empty">Product not found. <a href="clothes.html">Back to clothes →</a></div>';return;}
 document.title=`${p.name} — ${settings.name||'Yasmina Collection'}`;
 root.innerHTML=`<div class="detail-product"><div class="detail-product-image"><img src="${p.img}" alt="${p.name}"></div><div class="detail-product-copy"><p class="eyebrow">${p.category}</p><h1>${p.name}</h1><p class="detail-price">${money(p.price)}</p><p>${p.description||'A refined modest piece from Yasmina Collection, designed for comfortable, elegant everyday wear.'}</p><div class="detail-meta"><span>${p.stock>0?`${p.stock} available`:'Out of stock'}</span><span>${p.badge||'YASMINA'}</span></div><button class="primary-btn" ${p.stock<=0?'disabled':''} onclick="add('${p.id}')">${p.stock>0?'ADD TO BAG':'OUT OF STOCK'}</button><a class="text-link" href="clothes.html?category=${encodeURIComponent(p.category)}">← More ${p.category}</a></div></div>`;
}
function renderPageTitle(){const title=$("#clothesTitle");const active=$("#activeCategory");if(title){title.innerHTML=activeFilter==="all"?"All <em>clothes.</em>":`${activeFilter} <em>collection.</em>`}if(active)active.textContent=activeFilter==="all"?"Showing every piece from Yasmina Collection.":`Showing all ${activeFilter.toLowerCase()} from Yasmina Collection.`}


/* Premium scroll choreography: reveals repeat whenever an element re-enters the viewport. */
let scrollRevealObserver=null;
function initScrollReveal(){
 const targets=[...document.querySelectorAll('main > section:not(.hero), .product-card, .ramadan-note, .value-card, .editorial-copy, .order-box, .order-intro, .about-copy, .about-visual')];
 targets.forEach((el,i)=>{
   el.classList.add('reveal');
   el.classList.remove('reveal-delay-1','reveal-delay-2','reveal-delay-3','reveal-delay-4');
   el.classList.add(`reveal-delay-${(i%4)+1}`);
   if(!el.dataset.motionVariant){
     const mod=i%9; el.dataset.motionVariant=mod===3?'left':mod===6?'right':mod===8?'scale':'up';
   }
   el.classList.toggle('reveal-left',el.dataset.motionVariant==='left');
   el.classList.toggle('reveal-right',el.dataset.motionVariant==='right');
   el.classList.toggle('reveal-scale',el.dataset.motionVariant==='scale');
 });
 if(scrollRevealObserver)scrollRevealObserver.disconnect();
 if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){targets.forEach(el=>el.classList.add('is-visible'));return;}
 scrollRevealObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
     if(entry.isIntersecting){
       /* Remove/re-add the state so the transition can replay on every re-entry. */
       entry.target.classList.remove('is-visible');
       requestAnimationFrame(()=>requestAnimationFrame(()=>entry.target.classList.add('is-visible')));
     }else{
       entry.target.classList.remove('is-visible');
     }
   });
 },{threshold:.08,rootMargin:'-8% 0px -8% 0px'});
 targets.forEach(el=>scrollRevealObserver.observe(el));
}
function initScrollMotion(){
 if(!document.querySelector('.scroll-progress')){const bar=document.createElement('div');bar.className='scroll-progress';document.body.appendChild(bar)}
 const update=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;const pct=h>0?(window.scrollY/h)*100:0;document.querySelector('.scroll-progress').style.width=`${Math.min(100,Math.max(0,pct))}%`};
 window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});update();
}
initScrollMotion();
initScrollReveal();

window.addEventListener('storage',e=>{if(e.key===STORE_KEY)refreshStore()});
if('BroadcastChannel' in window){const bc=new BroadcastChannel('yasmina-store');bc.onmessage=refreshStore}
refreshStore();renderAll();
const THEME_KEY="yasmina-theme";
function applyTheme(theme){document.documentElement.dataset.theme=theme;localStorage.setItem(THEME_KEY,theme);$$('.theme-option').forEach(b=>b.classList.toggle('active',b.dataset.themeChoice===theme));}
function initTheme(){applyTheme(localStorage.getItem(THEME_KEY)||"light");}
function openTheme(){const o=$("#themeOverlay");if(o){o.classList.add("show");o.setAttribute("aria-hidden","false")}}
function closeTheme(){const o=$("#themeOverlay");if(o){o.classList.remove("show");o.setAttribute("aria-hidden","true")}}
if($("#openTheme"))$("#openTheme").onclick=openTheme;if($("#openThemeMobile"))$("#openThemeMobile").onclick=()=>{openTheme();$("#mobileMenu")?.classList.remove("open")};if($("#closeTheme"))$("#closeTheme").onclick=closeTheme;if($("#themeOverlay"))$("#themeOverlay").onclick=e=>{if(e.target.id==="themeOverlay")closeTheme()};$$('.theme-option').forEach(b=>b.onclick=()=>{applyTheme(b.dataset.themeChoice);closeTheme()});
initTheme();
async function syncStorefront(){if(!location.protocol.startsWith('http'))return;try{const r=await fetch('/api/store',{cache:'no-store'});if(!r.ok)return;const remote=await r.json();if(remote&&Array.isArray(remote.products)&&remote.products.length){localStorage.setItem(STORE_KEY,JSON.stringify(remote));refreshStore()}}catch(e){}}
syncStorefront();

/* User preferences: region, language and theme */
const PREF_KEY="yasmina-user-preferences";
const defaultPrefs={region:"UZ",language:"en",theme:localStorage.getItem("yasmina-theme")||"light"};
let prefs={...defaultPrefs,...(JSON.parse(localStorage.getItem(PREF_KEY)||"{}")||{})};
const translations={
 en:{settings:"Settings",preferences:"PREFERENCES",settingsTitle:'Your <em>settings.</em>',settingsNote:"Choose your region, language and theme. Your choices are saved on this device.",region:"Region",language:"Language",theme:"Theme",light:"Light",dark:"Dark",lightNote:"Soft Yasmina",darkNote:"Evening elegance",saved:"Saved",home:"Home",clothes:"Clothes",story:"Our story",order:"Order",featured:"FEATURED PIECES",viewAll:"View all clothes"},
 uz:{settings:"Sozlamalar",preferences:"SOZLAMALAR",settingsTitle:'Sizning <em>sozlamalaringiz.</em>',settingsNote:"Hudud, til va mavzuni tanlang. Tanlovlaringiz ushbu qurilmada saqlanadi.",region:"Hudud",language:"Til",theme:"Mavzu",light:"Yorug‘",dark:"Tungi",lightNote:"Yumshoq Yasmina",darkNote:"Kechki nafislik",saved:"Saqlandi",home:"Bosh sahifa",clothes:"Kiyimlar",story:"Biz haqimizda",order:"Buyurtma",featured:"TANLANGAN MAHSULOTLAR",viewAll:"Barcha kiyimlarni ko‘rish"},
 ru:{settings:"Настройки",preferences:"НАСТРОЙКИ",settingsTitle:'Ваши <em>настройки.</em>',settingsNote:"Выберите регион, язык и тему. Ваш выбор сохраняется на этом устройстве.",region:"Регион",language:"Язык",theme:"Тема",light:"Светлая",dark:"Тёмная",lightNote:"Мягкая Yasmina",darkNote:"Вечерняя элегантность",saved:"Сохранено",home:"Главная",clothes:"Одежда",story:"О нас",order:"Заказ",featured:"ИЗБРАННЫЕ МОДЕЛИ",viewAll:"Смотреть всю одежду"}
};
function persistPrefs(){localStorage.setItem(PREF_KEY,JSON.stringify(prefs));}
function applyLanguage(lang){prefs.language=lang;const t=translations[lang]||translations.en;document.documentElement.lang=lang;$$('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(t[key]!=null)el.innerHTML=t[key]});const navs=$$('.desktop-nav a');if(navs.length>=4){["home","clothes","story","order"].forEach((k,i)=>{if(t[k])navs[i].textContent=t[k]})}const mobile=$$('.mobile-menu a');if(mobile.length>=4){["home","clothes","story","order"].forEach((k,i)=>{if(t[k])mobile[i].textContent=t[k]})}if(document.body.dataset.page==="clothes")renderPageTitle();persistPrefs();}
function applyRegion(region){prefs.region=region;document.documentElement.dataset.region=region;persistPrefs();}
function openSettings(){const o=$("#settingsOverlay");if(!o)return;o.classList.add("show");o.setAttribute("aria-hidden","false");if($("#regionSelect"))$("#regionSelect").value=prefs.region;if($("#languageSelect"))$("#languageSelect").value=prefs.language;applyTheme(prefs.theme);}
function closeSettings(){const o=$("#settingsOverlay");if(o){o.classList.remove("show");o.setAttribute("aria-hidden","true")}}
function showPrefSaved(){const el=$("#settingsSaved");if(!el)return;el.textContent=(translations[prefs.language]||translations.en).saved+" ✓";clearTimeout(window.__prefSaved);window.__prefSaved=setTimeout(()=>el.textContent="",1400)}
if($("#openSettings"))$("#openSettings").onclick=openSettings;
if($("#openSettingsMobile"))$("#openSettingsMobile").onclick=()=>{openSettings();$("#mobileMenu")?.classList.remove("open")};
if($("#closeSettings"))$("#closeSettings").onclick=closeSettings;
if($("#settingsOverlay"))$("#settingsOverlay").onclick=e=>{if(e.target.id==="settingsOverlay")closeSettings()};
if($("#regionSelect"))$("#regionSelect").onchange=e=>{applyRegion(e.target.value);showPrefSaved()};
if($("#languageSelect"))$("#languageSelect").onchange=e=>{applyLanguage(e.target.value);showPrefSaved()};
$$('.theme-option').forEach(b=>b.onclick=()=>{prefs.theme=b.dataset.themeChoice;applyTheme(prefs.theme);persistPrefs();showPrefSaved()});
(function initPreferences(){applyTheme(prefs.theme);applyLanguage(prefs.language);if($("#regionSelect"))$("#regionSelect").value=prefs.region;if($("#languageSelect"))$("#languageSelect").value=prefs.language;})();
