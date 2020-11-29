let u = {}
u.f = {}

let p = new Plyr('#player', {}); p.volume = 0.4
let playingTrack
let trackInfo = document.getElementById('trackInfo')

/*let processScroll = () => {

  if (localStorage.getItem('scroll')) window.scrollTo(0, window.pageYOffset)
  window.onscroll = (e) => {
    if (window.pageYOffset) localStorage.setItem('scroll', window.pageYOffset)
  }
}*/

let get = (name) => {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
let uuid = () => {
  function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}


let playTrack = (dom) => {
  if (playingTrack) playingTrack.classList.remove('active')
  playingTrack = dom
  playingTrack.classList.add('active')

  trackInfo.innerText = playingTrack.innerText
  p.source = {type: 'audio', sources: [{src: dom.getAttribute('href')}] };
  p.play()
}

(async() => {

  let list = await fetch('list.json?v=3')
  list = await list.json()
  console.log('tracks count: ', list.length)

  let curLetter = ''

  for (let i = 0; i < list.length; i++) {

    let title = list[i].slice(31, -4)

    let letter = title.substr(0, 1)
    if (letter !== curLetter) {
      curLetter = letter
      let div = document.createElement('h2')
      div.innerText = letter
      document.body.appendChild(div)
    }

    let dom = document.createElement('a')
    dom.setAttribute('href', "https://github.com/x8core/x8core.github.io/blob/master/audio/Heavy%20Rain%20(2010)/01%20Ethan%20Mars'%20Main%20Theme.mp3")
    dom.innerText = title
    dom.classList.add('track')
    dom.addEventListener('click', (e) => {
      e.preventDefault()
      playTrack(dom)
      p.on('ended', (e) => playTrack(playingTrack.nextElementSibling))
    })

    document.body.appendChild(dom)
  }

  //setTimeout(processScroll,1200)
})()