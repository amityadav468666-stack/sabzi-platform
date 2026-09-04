import {db} from "./firebase.js";
import {collection,getDocs,query,limit} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const box=document.getElementById("products"),search=document.getElementById("search");
function cart(){return JSON.parse(localStorage.getItem("sabzigo_cart")||"[]")}
function render(items){
 if(!box)return;box.innerHTML="";
 items.forEach(p=>{const d=document.createElement("div");d.className="product";d.innerHTML=`${p.image?`<img src="${p.image}" alt="">`:""}<h3>${p.name}</h3><p>₹${p.price} / kg</p><p>Stock: ${p.stock} kg</p><button class="btn">कार्ट में डालें</button>`;d.querySelector("button").onclick=()=>{let c=cart(),i=c.findIndex(x=>x.id===p.id);i>=0?c[i].qty++:c.push({...p,qty:1});localStorage.setItem("sabzigo_cart",JSON.stringify(c));updateCount();alert("कार्ट में जोड़ दिया गया");};box.appendChild(d)})
}
async function load(){try{
 const s=await getDocs(query(collection(db,"products"),limit(50)));let a=s.docs.map(x=>({id:x.id,...x.data()}));
 if(!a.length)a=[{id:"demo1",name:"आलू",price:30,stock:100},{id:"demo2",name:"टमाटर",price:40,stock:100},{id:"demo3",name:"गाजर",price:50,stock:100}];
 render(a); window._products=a;
}catch(e){render([{id:"demo1",name:"आलू",price:30,stock:100},{id:"demo2",name:"टमाटर",price:40,stock:100}])}}
function updateCount(){const x=document.getElementById("cartCount");if(x)x.textContent=cart().reduce((a,b)=>a+b.qty,0)}
if(search)search.oninput=()=>render((window._products||[]).filter(p=>p.name.toLowerCase().includes(search.value.toLowerCase())));
load();updateCount();
