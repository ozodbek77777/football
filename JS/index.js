
let userEL=document.getElementById('user')
let pass=document.getElementById('pass')
let btn=document.getElementById('btn')
async function getToken(per){
    let human=await fetch('https://pressa-exem.herokuapp.com/login',{
        method:'post',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(per)
    })

     let res=await human.json()
     console.log(human);
     if(res.token && res.token!=null&&userEL.value!=''&&pass.value!=''){
       window.localStorage.setItem('token',res.token)
       window.location.replace('/HTMLS/index.html')
       window.localStorage.setItem('user',userEL.value)
     }else{
        alert('inncorect login')
     }
}

btn.addEventListener('click',()=>{
    const user={
        username:userEL.value,
        password:pass.value
    }
    getToken(user)
})