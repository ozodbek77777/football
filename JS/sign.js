let userEL=document.getElementById('user')
let pass=document.getElementById('pass')
const select=document.getElementById('select')
let btn=document.getElementById('btn')

async function getToken(per){
    let human=await fetch('https://pressa-exem.herokuapp.com/register',{
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
        alert('inncorect sign')
     }
}

btn.addEventListener('click',()=>{
    const user={
        username:userEL.value,
        password:pass.value,
        gender:select.value
    }
    getToken(user)
})