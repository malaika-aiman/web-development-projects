const menuBtn=document.getElementById("menuBtn"),navLinks=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const programData={
 strength:{title:"Strength Training",text:"A focused program for building strength, improving technique and becoming more capable in everyday movement.",details:["3 sessions / week","All levels","60 min sessions"]},
 hiit:{title:"HIIT",text:"Fast, focused workouts that combine strength and cardio to keep your training challenging and efficient.",details:["3 sessions / week","Beginner friendly","35 min sessions"]},
 yoga:{title:"Yoga & Mobility",text:"Slow down, move with intention and build better mobility, balance and body awareness.",details:["4 sessions / week","All levels","50 min sessions"]},
 cardio:{title:"Cardio",text:"Energetic sessions designed to build endurance and make movement feel easier over time.",details:["4 sessions / week","All levels","45 min sessions"]},
 functional:{title:"Functional Fitness",text:"Train useful movement patterns with sessions that help you feel stronger outside the gym too.",details:["3 sessions / week","All levels","50 min sessions"]},
 personal:{title:"Personal Training",text:"One-to-one coaching built around your goals, your experience and the way you want to train.",details:["Flexible sessions","1-to-1 coaching","Custom plan"]}
};
const modal=document.getElementById("programModal");
document.querySelectorAll(".program-btn").forEach(btn=>btn.addEventListener("click",e=>{
 const key=e.currentTarget.closest(".program-card").dataset.program,d=programData[key];
 document.getElementById("modalTitle").textContent=d.title;
 document.getElementById("modalText").textContent=d.text;
 document.getElementById("modalDetails").innerHTML=d.details.map(x=>`<span>${x}</span>`).join("");
 modal.classList.add("show");
}));
document.getElementById("modalClose").onclick=()=>modal.classList.remove("show");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});

document.querySelectorAll("#trainerFilters .filter").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll("#trainerFilters .filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 const filter=btn.dataset.filter;
 document.querySelectorAll(".trainer-card").forEach(card=>card.classList.toggle("hidden",filter!=="all"&&card.dataset.type!==filter));
}));

document.querySelectorAll("#scheduleTabs .filter").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll("#scheduleTabs .filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 const filter=btn.dataset.class;
 document.querySelectorAll("td[data-kind]").forEach(td=>td.classList.toggle("dim",filter!=="all"&&td.dataset.kind!==filter));
}));

document.getElementById("bmiBtn").addEventListener("click",()=>{
 const h=Number(document.getElementById("height").value),w=Number(document.getElementById("weight").value),box=document.getElementById("bmiResult");
 if(!h||!w||h<80||w<20){box.textContent="Please enter a valid height and weight.";box.classList.remove("success");return}
 const bmi=(w/((h/100)**2)).toFixed(1);
 let status=bmi<18.5?"Below the typical adult range":bmi<25?"Within the typical adult range":bmi<30?"Above the typical adult range":"High BMI range";
 box.innerHTML=`Your BMI: <b>${bmi}</b> — ${status}. <small>This is a general screening tool, not a diagnosis.</small>`;
 box.classList.add("success");
});

const plans={
 strength:{beginner:["Full-body strength • 3 days/week","Squat pattern • Push • Pull • Core"],intermediate:["Upper/lower split • 4 days/week","Compound lifts • Accessories • Core"],advanced:["Strength split • 5 days/week","Progressive overload • Compound work • Recovery"]},
 fitness:{beginner:["Full-body fitness • 3 days/week","Light cardio • Bodyweight • Mobility"],intermediate:["Mixed training • 4 days/week","Intervals • Strength circuits • Mobility"],advanced:["Performance mix • 5 days/week","Intervals • Strength • Conditioning"]},
 weight:{beginner:["Movement routine • 3 days/week","Brisk cardio • Strength basics • Mobility"],intermediate:["Conditioning • 4 days/week","Intervals • Full-body strength • Recovery"],advanced:["Conditioning split • 5 days/week","Intervals • Strength • Endurance work"]}
};
document.getElementById("planBtn").addEventListener("click",()=>{
 const goal=document.getElementById("goal").value,level=document.getElementById("level").value,p=plans[goal][level],box=document.getElementById("planResult");
 box.innerHTML=`<b>Your plan</b><br>${p[0]}<br><span>${p[1]}</span>`;box.classList.add("success");
});

let workouts=Number(localStorage.getItem("fitoraWorkouts"))||12;
document.getElementById("workoutCount").textContent=workouts;
document.getElementById("progressBtn").addEventListener("click",()=>{
 workouts++;localStorage.setItem("fitoraWorkouts",workouts);
 document.getElementById("workoutCount").textContent=workouts;
 const percent=Math.min(95,78+Math.min(12,workouts-12));
 document.getElementById("progressNumber").textContent=percent+"%";
 document.getElementById("circleProgress").style.background=`conic-gradient(var(--accent) ${percent}%,#292426 0)`;
 document.getElementById("saveNote").textContent="Nice. Today's workout was added to your progress.";
 showToast("Workout completed ✓");
});

document.querySelectorAll(".plan-select").forEach(btn=>btn.addEventListener("click",()=>{
 localStorage.setItem("fitoraPlan",btn.dataset.plan);showToast(`${btn.dataset.plan} plan selected ✓`);
}));

document.querySelectorAll(".faq-item button").forEach(btn=>btn.addEventListener("click",()=>{
 const item=btn.parentElement;
 document.querySelectorAll(".faq-item").forEach(x=>{if(x!==item)x.classList.remove("open")});
 item.classList.toggle("open");
}));

document.getElementById("joinForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.getElementById("name").value.trim(),email=document.getElementById("email").value.trim(),msg=document.getElementById("formMessage");
 if(!name||!email){msg.textContent="Please add your name and email.";return}
 msg.textContent=`Thanks, ${name}! Your request has been received.`;
 e.target.reset();
});

function showToast(text){const t=document.getElementById("toast");t.textContent=text;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
