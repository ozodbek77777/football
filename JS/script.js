
if (!window.localStorage.getItem('token')) {
	window.location.replace('./login.html')
}
const api_key = 'eb5134123bf7fefa7c1c529471e8c8d7fc2a4282b18fb3f70de94cd08fc16cf1'
const avatar = document.querySelector(".avatar")
const acc = document.getElementById('head_img')
const cointainer = document.querySelector('.container')
const ul = document.querySelector('.list')
const score = document.querySelector('.score')
var scores = []
const con = document.getElementById('hello')
const start = document.querySelector('.start')
const sec = document.querySelector('.sec')
const hi = document.createElement('section')
const scores1 = document.querySelector('.scores')
const jio = document.querySelector('.jio')
var user = []
const title4 = document.getElementById('title')
const gien = document.querySelector('.gien')
const btns = document.querySelector('.btns')
const login = document.getElementById('login')
const sign = document.getElementById('sign')
login.addEventListener('click', () => {
	window.location.replace('/HTMLS/login.html')
	window.localStorage.removeItem('token')
	window.localStorage.removeItem('user')
})
let submit = document.createElement('button')
let imgh = document.createElement('img')
let inputF = document.createElement('input')
inputF.setAttribute('id', "uploadImage")
inputF.setAttribute('accept', "image/*")
inputF.setAttribute('onchange', 'PreviewImage()')
inputF.type = 'file'
let inputUs = document.createElement('input')
inputUs.setAttribute('maxlength', '6')
title4.innerHTML = localStorage.getItem('change')
acc.addEventListener('click', () => {
	avatar.innerHTML = ' '
	imgh.setAttribute('id', 'uploadPreview')
	// imgh.src = '/img/user.png'
	cointainer.style.opacity = '0.1'
	avatar.style.display = 'flex'
	let download = document.createElement('button')
	download.textContent = 'download'
	download.className = 'down'
	inputUs.type = 'text'
	inputUs.placeholder = 'ENTER NAME'
	submit.textContent = 'SUBMIT'
	submit.className = 'submit'
	let removeBtn=document.createElement('button')
	removeBtn.className='remove'
	removeBtn.innerHTML=`<i class="fa-solid fa-x"></i>`
	removeBtn.addEventListener('click',()=>{
		avatar.style.display='none'
		cointainer.style.opacity = '1'
	})
	avatar.append(imgh, inputF, inputUs, download, submit,removeBtn)
	submit.addEventListener('click', () => {
		let hro = setInterval(() => {
			avatar.style.display = 'none'
			imgh.src = localStorage.getItem('img')
		acc.src = localStorage.getItem('img')
			cointainer.style.opacity = '1'
			localStorage.setItem('change', inputUs.value)
			title4.textContent = localStorage.getItem('change')
		}, 1000)
		setTimeout(() => {
			clearInterval(hro)
		}, 2000)
	})
	download.addEventListener('click', () => {
		inputF.click()
	})
})
submit.disabled = true
inputUs.addEventListener('keyup', () => {
	if (inputUs.value == '') {
		submit.disabled = true
	} else if (typeof inputUs.value == 'string') {
		submit.disabled = false
	}
})
imgh.src = localStorage.getItem('img')
acc.src = localStorage.getItem('img')
function PreviewImage() {
	var oFReader = new FileReader();
	oFReader.readAsDataURL(inputF.files[0]);
	console.log(oFReader)
	oFReader.onload = function (oFREvent) {
		localStorage.setItem('img', oFREvent.target.result)
	};

};
if (!localStorage.getItem('user')) {
	imgh.src = '/img/user.png'
	acc.src = '/img/user.png'
} else if (localStorage.getItem('user')) {
	imgh.src = localStorage.getItem('img')
}
fetch(`https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=${api_key}`)
	.then(response => response.json())
	.then(response => {
		user = response.result
		ren(gien, user)
		const btn4 = document.getElementById('btn4')
		btn4.addEventListener('click', () => {
			// btns.style.display='flex'
			sec.style.display = 'none'
			gien.style.display = 'block'
			jio.style.display = 'none'
			score.style.display = 'none'
			ren(gien, user)
		})
	})

function ren(list, arr) {
	list.innerHTML = ' '

	arr.forEach(e => {
		let ul = document.createElement('ul')
		ul.className = 'list'
		ul.addEventListener('click', () => {
			let url = `https://en.wikipedia.org/wiki/${e.country_name}_national_football_team`
			window.open(url, '_self')
		})
		let img = document.createElement('img')
		img.className = 'logo-img'
		img.src = e.country_logo

		let li1 = document.createElement('li')
		li1.className = 'list-item1'
		li1.textContent = e.country_name.toUpperCase()
		if (e.country_name === 'Worldcup' || e.country_name === 'World' || e.country_name === 'World cup') {
			ul.style.display = 'none'
		}

		let li2 = document.createElement('li')
		li2.className = 'list-item2'
		li2.textContent = e.country_iso2
		if (e.country_iso2 == null) {
			li2.textContent = e.country_name.slice(0, 2)
		}


		ul.append(img, li1, li2)
		list.append(ul)
	})

}
const btn = document.getElementById('btn')

fetch(`https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${api_key}`)
	.then(response => response.json())
	.then(response => {
		scores = response.result
		console.log(scores)
		const btn2 = document.getElementById('btn23')
		btn2.addEventListener('click', () => {
			jio.style.display = 'none'
			sec.style.display = 'none'
			score.style.display = 'block'
			scores1.style.display = 'none'
			gien.style.display = 'none'
			get(score, scores)
		})


	})

///LIVE SCORE

function get(list, arr) {
	list.innerHTML = ' '
	arr.forEach((e) => {
		const div = document.createElement('div')
		div.className = 'fall'


		const team = document.createElement('div')
		team.className = 'team1'

		const img = document.createElement('img')
		img.src = e.home_team_logo

		const title = document.createElement('h2')
		title.className = 'title'
		title.textContent = e.event_home_team


		const score = document.createElement('div')
		score.className = 'team_score1'
		score.innerHTML = e.event_final_result

		const team2 = document.createElement('div')
		team2.className = 'team2'

		const img2 = document.createElement('img')
		img2.src = e.away_team_logo

		const title2 = document.createElement('h2')
		title2.className = 'title'
		title2.textContent = e.event_away_team

		const time = document.createElement('h4')
		time.className = 'h4'

		time.textContent = e.event_status
		score.appendChild(time)


		div.append(team, score, team2)
		team.append(img, title)
		team2.append(img2, title2)
		list.append(div)

		if (e.away_team_logo === null && e.home_team_logo === null) {
			img.scr = "download.jpg"
			img2.src = "download.jpg"
		}
	})

}
///STANDINGS
const btn1 = document.getElementById('btn')
var hero = []



fetch(`https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=3&APIkey=${api_key}`)
	.then((res) => res.json())
	.then((data) => {
		hero = data.result.total
		console.log(hero);

		btn1.addEventListener('click', () => {
			sec.style.display = 'block'
			let ak = hero.filter(e => e.league_round == 'Group A')
			ye(start, ak)
			jio.style.display = 'none'
			score.style.display = 'none'
			hi.classList.add('high')
			sec.style.display = 'block'
			start.append(hi)
			scores1.style.display = 'flex'
			gien.style.display = 'none'
		})


		const a = document.getElementById('a')
		const b = document.getElementById('b')
		const c = document.getElementById('c')
		const d = document.getElementById('d')
		const op = document.getElementById('e')
		const f = document.getElementById('f')
		const g = document.getElementById('g')
		const h = document.getElementById('h')
		a.addEventListener('click', () => {
			let ak = hero.filter(e => e.league_round == 'Group A')
			ye(start, ak)
			console.log(hero);
			hi.classList.add('high')
			start.append(hi)
		})
		b.addEventListener('click', () => {
			let ak = hero.filter(e => e.league_round == 'Group B')
			ye(start, ak)
			hi.classList.add('high')
			start.append(hi)
		})
		c.addEventListener('click', () => {
			let ak = hero.filter(e => e.league_round == 'Group C')
			ye(start, ak)
			hi.classList.add('high')
			start.append(hi)
		})
		d.addEventListener('click', () => {
			let ak = hero.filter(e => e.league_round == 'Group D')
			ye(start, ak)
			hi.classList.add('high')
			start.append(hi)
		})
		op.addEventListener('click', () => {
			let ak = hero.filter(e => e.league_round == 'Group E')
			ye(start, ak)
			start.append(hi)
			hi.classList.add('high')
		})
		f.addEventListener('click', () => {
			let ak = hero.filter(e => e.league_round == 'Group F')
			ye(start, ak)
			hi.classList.add('high')
			start.append(hi)
		})
		g.addEventListener('click', () => {
			let ak = hero.filter(e => e.league_round == 'Group G')
			ye(start, ak)
			hi.classList.add('high')
			start.append(hi)
		})
		h.addEventListener('click', () => {
			let ak = hero.filter(e => e.league_round == 'Group H')
			ye(start, ak)
			hi.classList.add('high')
			start.append(hi)
		})


	})

let h1 = document.querySelector('.h1')
function ye(list, arr) {

	list.innerHTML = ' '

	arr.forEach((e) => {

		let group = document.createElement('div')
		group.className = 'group'
		//
		let results = document.createElement('div')
		results.className = 'result1'
		//
		let lists = document.createElement('ul')
		lists.className = 'lists'
		//
		let item = document.createElement('li')
		item.className = 'item'
		//
		let played = document.createElement('h2')
		played.textContent = e.standing_P
		//
		let wins = document.createElement('h2')
		wins.textContent = e.standing_W
		//
		let draws = document.createElement('h2')
		draws.textContent = e.standing_D
		//
		let loses = document.createElement('h2')
		loses.textContent = e.standing_L
		//
		let goals = document.createElement('h2')
		goals.textContent = e.standing_GD
		//
		let names = document.createElement('h4')
		names.textContent = e.standing_team


		h1.textContent = e.league_round


		let pts = document.createElement('h2')
		pts.textContent = e.standing_PTS
		//
		let img1 = document.createElement('img')
		fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${e.team_key}&APIkey=${api_key}`)
			.then((res) => res.json())
			.then((data) => {
				data.result.forEach((el) => {
					img1.src = el.team_logo
				})
			})

		console.log()
		results.append(played, wins, draws, loses, goals, pts)
		item.append(group, results)
		lists.appendChild(item)

		group.append(img1, names)

		list.append(lists)
	})
}
///ucl top scorers

const vi = document.getElementById('vi')
const btn3 = document.getElementById("btn3")
fetch(`https://allsportsapi.com/api/football/?&met=Standings&leagueId=545&APIkey=${api_key}`)
	.then(res => res.json())
	.then(data => {
		console.log(data.result)
		btn3.addEventListener('click', () => {
			scores1.style.display = 'flex'
			sec.style.display = 'none'
			score.style.display = 'none'
			jio.style.display = 'block'
			gien.style.display = 'none'
			liga(con, data.result.total)
		})
	}
	)


function liga(list, arr) {
	list.innerHTML = ' '

	arr.forEach((e) => {
		let group = document.createElement('div')
		group.className = 'group'
		//
		let results = document.createElement('div')
		results.className = 'result1'
		//
		let lists = document.createElement('ul')
		lists.className = 'lists'
		//
		let item = document.createElement('li')
		item.className = 'item'
		item.style.background = 'rgba(255, 255, 255, 777)'
		//
		let played = document.createElement('h2')
		played.textContent = e.standing_P
		//
		let wins = document.createElement('h2')
		wins.textContent = e.standing_W
		//
		let draws = document.createElement('h2')
		draws.textContent = e.standing_D
		//
		let loses = document.createElement('h2')
		loses.textContent = e.standing_L
		//
		let goals = document.createElement('h2')
		goals.textContent = e.standing_GD
		//
		let names = document.createElement('h4')
		names.textContent = e.standing_team

		let pts = document.createElement('h2')
		pts.textContent = e.standing_PTS
		//
		let h2 = document.createElement('h2')
		h2.textContent = e.standing_place
		let img1 = document.createElement('img')
		fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${e.team_key}&APIkey=${api_key}`)
			.then((res) => res.json())
			.then((data) => {
				data.result.forEach((el) => {
					img1.src = el.team_logo
					if (el.team_logo === null) {
						img1.src = "/img/super.png"
					}
				})

			})


		results.append(played, wins, draws, loses, goals, pts)
		item.append(h2, group, results)
		lists.appendChild(item)

		group.append(img1, names)

		list.append(lists)
	})
}
fetch(`https://allsportsapi.com/api/football/?met=Leagues&APIkey=${api_key}`)
	.then(res => res.json())
	.then(data => console.log(data))