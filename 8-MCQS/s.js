const questions=[
 {q:'Which keyword is used to create a class in Java?',a:['object','class','struct','define'],c:1,t:'JAVA BASICS'},
 {q:'Which method is the entry point of a Java application?',a:['start()','run()','main()','init()'],c:2,t:'JAVA BASICS'},
 {q:'What is the size of an int in Java?',a:['8 bits','16 bits','32 bits','64 bits'],c:2,t:'DATA TYPES'},
 {q:'Which concept allows one class to acquire properties of another?',a:['Encapsulation','Inheritance','Abstraction','Compilation'],c:1,t:'OOP CONCEPTS'},
 {q:'Which collection does not allow duplicate elements?',a:['List','ArrayList','Set','Queue'],c:2,t:'COLLECTIONS'},
 {q:'What does JVM stand for?',a:['Java Variable Machine','Java Virtual Machine','Java Verified Mode','Java Visual Model'],c:1,t:'JAVA BASICS'},
 {q:'Which keyword prevents a method from being overridden?',a:['static','private','final','constant'],c:2,t:'OOP CONCEPTS'},
 {q:'Which operator compares two values for equality?',a:['=','==','!=','=>'],c:1,t:'OPERATORS'},
 {q:'Which loop is guaranteed to execute at least once?',a:['for','while','do-while','foreach'],c:2,t:'CONTROL FLOW'},
 {q:'Which package contains the Scanner class?',a:['java.io','java.util','java.lang','java.net'],c:1,t:'INPUT & OUTPUT'}
];
let index=0,score=0,selected=false,time=30,interval;
const $=id=>document.getElementById(id);
function startQuiz(){ $('quiz').scrollIntoView({behavior:'smooth'}); index=0;score=0;selected=false;$('quizContent').style.display='block';$('result').style.display='none';loadQuestion(); }
function loadQuestion(){const x=questions[index];$('questionText').textContent=x.q;$('questionCounter').textContent=`Question ${index+1} of ${questions.length}`;$('progressBar').style.width=`${((index+1)/questions.length)*100}%`;document.querySelector('.question-label').textContent=x.t;$('feedbackText').textContent='Choose the best answer to continue.';$('nextBtn').disabled=true;selected=false;time=30;clearInterval(interval);interval=setInterval(()=>{time--; $('timer').textContent=`00:${String(time).padStart(2,'0')}`;if(time<=0){clearInterval(interval);if(!selected) choose(-1)}},1000);$('timer').textContent='00:30';$('options').innerHTML=x.a.map((v,i)=>`<button class="option" data-index="${i}"><span class="letter">${String.fromCharCode(65+i)}</span>${v}</button>`).join('');document.querySelectorAll('.option').forEach(b=>b.addEventListener('click',()=>choose(+b.dataset.index)));}
function choose(choice){if(selected)return;selected=true;clearInterval(interval);const x=questions[index];document.querySelectorAll('.option').forEach((b,i)=>{b.disabled=true;if(i===x.c)b.classList.add('correct');if(i===choice&&choice!==x.c)b.classList.add('wrong');});if(choice===x.c){score++;$('feedbackText').textContent='Correct! Nice one.'}else $('feedbackText').textContent=choice===-1?'Time is up!':'Not quite—review this concept.';$('nextBtn').disabled=false;}
$('nextBtn').addEventListener('click',()=>{if(index<questions.length-1){index++;loadQuestion()}else finish()});function finish(){clearInterval(interval);$('quizContent').style.display='none';$('result').style.display='block';$('finalScore').textContent=`${score}/${questions.length}`;$('resultTitle').textContent=score>=8?'Java star unlocked!':score>=5?'Solid progress!':'Keep practicing!';$('resultText').textContent=`You answered ${score} correctly. Every attempt makes your Java foundation stronger.`}$('heroStart').addEventListener('click',startQuiz);$('navStart').addEventListener('click',startQuiz);$('retryBtn').addEventListener('click',startQuiz);
