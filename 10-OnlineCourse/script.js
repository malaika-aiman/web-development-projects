let bagCount=0;
const count=document.querySelector('#count');
document.querySelectorAll('.add').forEach(button=>{
  button.addEventListener('click',()=>{
    bagCount++;
    count.textContent=bagCount;
    const oldText=button.textContent;
    button.textContent='Added ✓';
    setTimeout(()=>button.textContent=oldText,900);
  });
});
document.querySelectorAll('.heart').forEach(button=>{
  button.addEventListener('click',()=>button.textContent=button.textContent==='♡'?'♥':'♡');
});
document.querySelectorAll('.filters button').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.filters button').forEach(item=>item.classList.remove('active'));
    button.classList.add('active');
    const filter=button.dataset.filter;
    document.querySelectorAll('.product').forEach(product=>{
      product.style.display=filter==='all'||product.dataset.cat===filter?'block':'none';
    });
  });
});
document.querySelectorAll('.category').forEach(category=>{
  category.addEventListener('click',()=>{
    const wanted=category.dataset.category;
    document.querySelectorAll('.filters button').forEach(button=>{
      button.classList.toggle('active',button.dataset.filter===wanted);
    });
    document.querySelectorAll('.product').forEach(product=>{
      product.style.display=product.dataset.cat===wanted?'block':'none';
    });
  });
});
document.querySelector('#cartBtn').addEventListener('click',()=>alert(`Your bag has Rs. {bagCount} item(s).`));
document.querySelector('#searchBtn').addEventListener('click',()=>document.querySelector('#shop').scrollIntoView());
document.querySelector('#newsletter').addEventListener('submit',event=>{
  event.preventDefault();
  event.target.querySelector('button').textContent='You’re on the list ✓';
});
