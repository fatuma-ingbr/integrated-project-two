/**
 * 
 */
Vue.component('nav-list', {
  //props is a custom attribute i.e href, id, class etc.
  props: ['section'],
  template: '<li class="nav-item"><a class="nav-link" href="{{section.url}}.html">{{ section.text }}</a></li>'			//GET CUSTOMIZED HREF
})

var navbar = new Vue({
  el: '#nav-bar',
  data: {
    navList: [
      { id: 0, text: 'Home',   url: '/home' },
      { id: 1, text: 'Author', url: '/author' },
      { id: 2, text: 'GeoJSON', url: '/geojson' },
      { id: 3, text: 'Earthquakes', url: '/earthquakes' },
      { id: 4, text: 'Weather', url: '/weather' },
      { id: 5, text: 'Extra', url: '/extra' }

    ]
  }
})
