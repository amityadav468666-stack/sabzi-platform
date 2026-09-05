import {auth,db} from "./firebase.js";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut,updateProfile} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {doc,setDoc,getDoc} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const msg=document.getElementById("msg");
const signup=document.getElementById("signupForm");
if(signup) signup.addEventListener("submit",async e=>{
 e.preventDefault(); try{
  const name=document.getElementById("name").value.trim(),email=document.getElementById("email").value.trim(),password=document.getElementById("password").value,role=document.getElementById("role").value;
  const c=await createUserWithEmailAndPassword(auth,email,password); await updateProfile(c.user,{displayName:name});
  await setDoc(doc(db,"users",c.user.uid),{name,email,role,createdAt:Date.now()});
  location.href=role==="shopkeeper"?"shopkeeper.html":"index.html";
 }catch(x){msg.textContent=x.message}
});
const login=document.getElementById("loginForm");
if(login) login.addEventListener("submit",async e=>{
 e.preventDefault();try{await signInWithEmailAndPassword(auth,email.value,password.value);location.href="index.html"}catch(x){msg.textContent=x.message}
});
onAuthStateChanged(auth,async user=>{
 const l=document.getElementById("loginLink"),o=document.getElementById("logoutBtn");
 if(l&&o){l.classList.toggle("hidden",!!user);o.classList.toggle("hidden",!user);o.onclick=()=>signOut(auth).then(()=>location.reload())}
});
export async function requireUser(){if(auth.currentUser)return auth.currentUser;return new Promise(r=>onAuthStateChanged(auth,u=>r(u)))}
