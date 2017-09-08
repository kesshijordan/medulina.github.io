// register the grid component
// https://vuejs.org/v2/examples/grid-component.html
Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      console.log("data is", data)
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})


var myjson = $.getJSON( "static/myuploads.json", function(mydata) {
    console.log( "success", mydata );
    demo.gridData = mydata
    demo.gridColumns = Object.keys(mydata[0]).reverse()
    console.log("my keys:")
    console.log(demo.gridColumns)
  })
    .done(function() {
      console.log( "second success" );
      console.log(myjson.responseJSON);
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });

console.log("middle okay")
console.log(demo)

var demo = new Vue({
  el: '#demo',
  data: {
    searchQuery: '',
    gridColumns: [],
    gridData: []
  }
})

console.log("ending okay")
console.log(demo)
