import {auth,db} from "./firebase.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {addDoc,collection,getDocs,query,where,doc,setDoc} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const msg=document.getElementById("msg");
onAuthStateChanged(auth,async u=>{if(!u){location.href="login.html";return}});
document.getElementById("shopForm").onsubmit=async e=>{e.preventDefault();try{await setDoc(doc(db,"shops",auth.currentUser.uid),{ownerId:auth.currentUser.uid,name:shopName.value,address:shopAddress.value,active:true});msg.textContent="दुकान सेव हो गई";}catch(x){msg.textContent=x.message}};
document.getElementById("productForm").onsubmit=async e=>{e.preventDefault();try{await addDoc(collection(db,"products"),{ownerId:auth.currentUser.uid,name:pName.value,price:Number(pPrice.value),stock:Number(pStock.value),image:pImage.value||"",active:true,createdAt:Date.now()});msg.textContent="Product जोड़ दिया गया";load()}catch(x){msg.textContent=x.message}};
async function load(){const box=document.getElementById("myProducts");const s=await getDocs(query(collection(db,"products"),where("ownerId","==",auth.currentUser.uid)));box.innerHTML=s.docs.map(d=>{let p=d.data();return `<div class="product"><h3>${p.name}</h3><p>₹${p.price} | Stock ${p.stock} kg</p></div>`}).join("")}
setTimeout(()=>auth.currentUser&&load(),1000);
