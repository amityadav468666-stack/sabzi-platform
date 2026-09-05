import {auth,db} from './firebase.js';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import {doc,setDoc,serverTimestamp} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';
const msg=t=>{const e=document.querySelector('#msg');if(e)e.textContent=t};
const sf=document.querySelector('#signupForm'); if(sf) sf.addEventListener('submit',async e=>{e.preventDefault();try{const c=await createUserWithEmailAndPassword(auth,email.value,password.value);await setDoc(doc(db,'users',c.user.uid),{name:name.value,phone:phone?.value||'',role:role?.value||'Customer',createdAt:serverTimestamp()});location.href='shop.html'}catch(x){msg(x.message)}});
const lf=document.querySelector('#loginForm'); if(lf) lf.addEventListener('submit',async e=>{e.preventDefault();try{await signInWithEmailAndPassword(auth,email.value,password.value);location.href='shop.html'}catch(x){msg(x.message)}});
window.SabziGoLogout=async()=>{await signOut(auth);location.href='index.html'};
