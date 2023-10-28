import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'




// 장바구니 - 드롭다운 메뉴 (클릭시 드롭다운이 펼쳐지고 화면 클릭시 들어간다)
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation() // 장바구니를 클릭하는 것은 window의 일부를 클릭하는 것이기 때문에 전파를 멈춰 줘야함
  if (basketEl.classList.contains('show')) {//show라는 클래스가 존재하는 지 확인
    // show가 있을때 장바구니를 숨기고
    hideBasket()
  } else {
    // show가 없을 경우에는 장바구니를 보여준다
    showBasket()
  }
})
basketEl.addEventListener('click', function (event) {
  event.stopPropagation() // 드롭다운 메뉴를 클릭하게 되면은 그 상위요소인 장바구니아이콘을 클릭하는 것이기 때문에 show가 지워지게 되므로 드롭다운가 사라진다 그걸 막히 위함
});
// 화면 어디를 클릭하더라도 드롭다운 메뉴가 들어감
window.addEventListener('click', function () {
  hideBasket()
});

function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}


// 검색창
const headerEl = document.querySelector('header')
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow') /*배경클릭해도 드롭다운 검색창이 닫히게*/
// 메뉴 에니메이션
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]/*전개연산자 해체 후 배열로 묶어줌*/
// 검색창 타임라인 텍스트 에니메이션
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]
// 검색창 애니메니션 후 포커스(커서 깜빡임)
const searchInputEl = searchWrapEl.querySelector('input')

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')//검색창 생기면 스크롤 x
  console.log(headerMenuEls)
  // 메뉴 사라지는 에니메이션
  headerMenuEls.reverse().forEach(function(el, index) {
    el.style.transitionDelay = index * 0.4 / headerMenuEls.length + 's'

  })
  // 검색창 타임라인 텍스트 에니메이션
  searchDelayEls.forEach(function(el, index) {
    el.style.transitionDelay = index * 0.4 / searchDelayEls.length + 's'
  })
  // 검색창 애니메니션 후 포커스(커서 깜빡임)
  setTimeout(function() {
    searchInputEl.focus()
  }, 600) // 1000 = 1초
}
function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
    // 메뉴 사라지는 에니메이션
  headerMenuEls.reverse().forEach(function(el, index) {
    el.style.transitionDelay = index * 0.4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function(el, index) {
    el.style.transitionDelay = index * 0.4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  //검색바를 닫으면 입력되어 있던 내용이 초기화 됨
  searchInputEl.value = ''
}


// 요소의 가시성 관찰 -- 스크롤시 차례로  info 요소가 화면에 나타남 
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) { //화면에 보이지 않을 때  해당 로직 처리 그래서 !를 앞에 붙임
      return
    }
    entry.target.classList.add('show')
  })
});
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})


//비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play() //비디오가 재생됨
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
});
pauseBtn.addEventListener('click', function () {
  video.pause() //비디오가 일시정지 됨
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
});



// '당신에게 맞는 iPad는?' 랜더랑
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  // <div class = "item"> 내용(innerHTML) </div> 를 만드는 과정
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')//textContent - 글자 내용으로 값을 추가 , innerHTML 실제 html구조로 내부에 삽입
 
  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color:${color};"></li>`
  })

 itemEl.innerHTML = /*html*/`
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>

  `
  itemsEl.append(itemEl)
})


const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList=''
  nav.maps.forEach(function (map) {
    mapList += /*html*/`
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /*html*/`
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})


//카피라이트 이번 년도 표기
const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()