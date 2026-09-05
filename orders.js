import {auth,db} from "./firebase.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {addDoc,collection,getDocs,query,where,orderBy,serverTimestamp} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const form=document.getElementById("checkoutForm"),msg=document.getElementById("msg"),list=document.getElementById("orders");
if(form)form.onsubmit=async e=>{e.preventDefault();const u=auth.currentUser;if(!u){location.href="login.html";return}let items=JSON.parse(localStorage.getItem("sabzigo_cart")||"[]");if(!items.length){msg.textContent="कार्ट खाली है";return}const total=items.reduce((s,p)=>s+p.price*p.qty,0);try{
 const ref=await addDoc(collection(db,"orders"),{userId:u.uid,items,total,address:address.value,phone:phone.value,paymentMethod:payment.value,paymentStatus:payment.value==="cod"?"pending":"payment_pending",status:"pending",createdAt:serverTimestamp()});
 if(payment.value==="online") alert("Online payment के लिए payment gateway का secure server/backend जोड़ना होगा। Order ID: "+ref.id);
 localStorage.removeItem("sabzigo_cart");msg.textContent="ऑर्डर सफलतापूर्वक बन गया। Order ID: "+ref.id;
}catch(x){msg.textContent=x.message}};
onAuthStateChanged(auth,async u=>{if(!list)return;if(!u){list.innerHTML="<p>पहले लॉगिन करें।</p>";return}try{
 const s=await getDocs(query(collection(db,"orders"),where("userId","==",u.uid),orderBy("createdAt","desc")));list.innerHTML=s.docs.map(d=>{let x=d.data();return `<div class="card"><b>Order: ${d.id}</b><p>कुल ₹${x.total}</p><p>Status: ${x.status}</p><p>Payment: ${x.paymentStatus}</p></div>`}).join("")||"<p>कोई ऑर्डर नहीं।</p>"
}catch(e){list.innerHTML="<p>ऑर्डर लोड नहीं हो सके।</p>"}});
