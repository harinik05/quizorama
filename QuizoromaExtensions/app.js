//Define the data for multiple choice
var multiple_choice = {
    title: 'Quizorama',
    selected: null,
    question: 'Which flowers talk the most?',
    choices: [
      'A) Roses- because they have more petals',
      'B) Tulips - because they have two lips',
      'C) Lilies - because they are adorable',
      'D) I dunno :)))'
    ]
  }

  //This is the function that is reflected for the clicks
  var Choice = {
    click: function(n){
      return function(){
        multiple_choice.selected = n
      }
    },
    classes: function(n){
      if (multiple_choice.selected === n){
        return 'active'
      } else {
        return ''
      }
    },
    view: function(vnode){
      var n = vnode.attrs.index
      return m('.choice',{ class: Choice.classes(n), onclick: Choice.click(n) },
        m('span.l'),
        m('span.v',multiple_choice.choices[n])
      )
    }
  }
  //viewing the entire app file and all of the multiple choice data 
  var App = {
    submit: function(){
      m.request({
          method: "PUT",
          url: "<API-ENDPOINT>",
          params: {selected: multiple_choice.selected},
      })
      .then(function(multiple_choice) {
        console.log('multiple choice',multiple_choice)
      })
    },
    //plus your choices
    view: function() {
      return m('main', [
        m("h1", multiple_choice.title),
        m('article',
          m('h2','Question:'),
          m('.question',multiple_choice.question),
          m(Choice,{index: 0}),
          m(Choice,{index: 1}),
          m(Choice,{index: 2}),
          m(Choice,{index: 3}),
          m('.submit',
            m("button", {onclick: App.submit}, 'Submit')
          )
        )
      ])
    }
  }
  
  m.mount(document.body, App)