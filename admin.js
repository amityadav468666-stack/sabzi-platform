import {auth,db} from "./firebase.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {collection,getDocs,query,orderBy,doc,updateDoc} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
onAuthStateChanged(auth,async u=>{if(!u){location.href="login.html";return}const us=await getDocs(collection(db,"users"));const sh=await getDocs(collection(db,"shops"));const os=await getDocs(collection(db,"orders"));document.getElementById("users").textContent=us.size;document.getElementById("shops").textContent=sh.size;document.getElementById("orders").textContent=os.size;
const box=document.getElementById("adminOrders");box.innerHTML=os.docs.map(d=>{let x=d.data();return `<div class="card"><b>${d.id}</b><p>₹${x.total} | ${x.status}</p><select data-id="${d.id}"><option>pending</option><option>accepted</option><option>packed</option><option>delivered</option><option>cancelled</option></select></div>`}).join("");
box.querySelectorAll("select").forEach(s=>{const id=s.dataset.id;s.value=[...s.options].some(o=>o.value===os.docs.find(d=>d.id===id).data().status)?os.docs.find(d=>d.id===id).data().status:"pending";s.onchange=()=>updateDoc(doc(db,"orders",id),{status:s.value})});
}).catch(e=>document.getElementById("msg").textContent=e.message)});
