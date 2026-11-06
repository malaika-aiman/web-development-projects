const doctors = [
 {id:"sara",name:"Dr. Sara Ahmed",specialty:"Cardiology",experience:"12 years",image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=85"},
 {id:"hamza",name:"Dr. Hamza Malik",specialty:"Neurology",experience:"10 years",image:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=85"},
 {id:"ayesha",name:"Dr. Ayesha Khan",specialty:"Paediatrics",experience:"9 years",image:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=85"},
 {id:"bilal",name:"Dr. Bilal Shah",specialty:"Orthopaedics",experience:"14 years",image:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85"},
 {id:"noor",name:"Dr. Noor Fatima",specialty:"Dermatology",experience:"8 years",image:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=85"},
 {id:"usman",name:"Dr. Usman Raza",specialty:"General Medicine",experience:"11 years",image:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=85"}
];
const STORE_KEY = "medoraAppointments";

function getAppointments(){
  try{return JSON.parse(localStorage.getItem(STORE_KEY))||[];}
  catch{return [];}
}
function saveAppointments(items){localStorage.setItem(STORE_KEY,JSON.stringify(items));}
function notify(message){
  let box=document.querySelector(".toast");
  if(!box){box=document.createElement("div");box.className="toast";document.body.append(box);}
  box.textContent=message;box.classList.add("show");
  clearTimeout(notify.timer);notify.timer=setTimeout(()=>box.classList.remove("show"),2500);
}
function doctorCard(doctor){
 return `<article class="doctor-card reveal"><div class="doctor-photo"><img src="${doctor.image}" alt="${doctor.name}" loading="lazy"></div><div class="doctor-info"><span class="eyebrow">${doctor.specialty}</span><h3>${doctor.name}</h3><p>${doctor.experience} of clinical experience</p><div class="doctor-meta"><span>Available for appointments</span><a href="appointment.html?doctor=${doctor.id}">Book visit ↗</a></div></div></article>`;
}
function renderDoctors(){
 const grid=document.querySelector("#doctor-grid");if(!grid)return;
 let search="",specialty="All";
 const update=()=>{
  const results=doctors.filter(d=>(specialty==="All"||d.specialty===specialty)&&`${d.name} ${d.specialty}`.toLowerCase().includes(search));
  grid.innerHTML=results.length?results.map(doctorCard).join(""):`<div class="empty-state">No doctors match your search.</div>`;
  revealItems();
 };
 document.querySelectorAll("[data-specialty]").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll("[data-specialty]").forEach(item=>item.classList.remove("active"));
  button.classList.add("active");specialty=button.dataset.specialty;update();
 }));
 document.querySelector("#doctor-search")?.addEventListener("input",event=>{search=event.target.value.toLowerCase().trim();update();});
 update();
}
function setupAppointment(){
 const form=document.querySelector("#appointment-form");if(!form)return;
 const doctorSelect=form.querySelector('[name="doctor"]');
 const params=new URLSearchParams(location.search);
 const selected=params.get("doctor");
 if(selected&&doctorSelect&&doctors.some(d=>d.id===selected))doctorSelect.value=selected;
 const dateField=form.querySelector('[name="date"]');
 if(dateField)dateField.min=new Date().toISOString().split("T")[0];
 form.addEventListener("submit",event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const data=Object.fromEntries(new FormData(form).entries());
  const doctor=doctors.find(item=>item.id===data.doctor);
  const appointments=getAppointments();
  appointments.push({...data,doctorName:doctor?.name||"Not selected",reference:`MD-${Date.now().toString().slice(-6)}`,status:"Pending"});
  saveAppointments(appointments);form.reset();
  notify("Appointment request saved. Your reference is "+appointments.at(-1).reference);
 });
}
function renderAppointments(){
 const body=document.querySelector("#appointment-rows");if(!body)return;
 const rows=getAppointments();
 body.innerHTML=rows.length?rows.slice().reverse().map(item=>`<tr><td>${item.reference}</td><td>${item.name}</td><td>${item.doctorName}</td><td>${item.date}</td><td>${item.time}</td><td><span class="status">${item.status}</span></td></tr>`).join(""):`<tr><td colspan="6" style="text-align:center;padding:35px;color:#738693">No appointment requests yet. New requests will appear here.</td></tr>`;
 const total=document.querySelector("#total-appointments");if(total)total.textContent=rows.length;
 const pending=document.querySelector("#pending-appointments");if(pending)pending.textContent=rows.filter(item=>item.status==="Pending").length;
 const today=document.querySelector("#today-appointments");if(today)today.textContent=rows.filter(item=>item.date===new Date().toISOString().split("T")[0]).length;
}
function setupNav(){
 const toggle=document.querySelector(".menu-toggle"),links=document.querySelector(".nav-links");
 toggle?.addEventListener("click",()=>{const open=links.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
 const current=location.pathname.split("/").pop()||"index.html";
 document.querySelectorAll(".nav-links a").forEach(link=>{if(link.getAttribute("href")===current)link.classList.add("active");});
}
function setupForms(){
 document.querySelectorAll("[data-demo-form]").forEach(form=>form.addEventListener("submit",event=>{
  event.preventDefault();if(!form.reportValidity())return;
  notify(form.dataset.success||"Thank you. Your message has been received in this demo.");form.reset();
 }));
}
function revealItems(){
 const items=document.querySelectorAll(".reveal:not(.visible)");
 if(!("IntersectionObserver" in window)){items.forEach(item=>item.classList.add("visible"));return;}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
 }),{threshold:.12});
 items.forEach(item=>observer.observe(item));
}
document.addEventListener("DOMContentLoaded",()=>{
 setupNav();renderDoctors();setupAppointment();renderAppointments();setupForms();revealItems();
 document.querySelectorAll("[data-year]").forEach(item=>item.textContent=new Date().getFullYear());
});
