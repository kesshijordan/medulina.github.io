// register the grid component

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
/*
https://vuejs.org/v2/examples/grid-component.html
var demo = new Vue({
  el: '#demo',
  data: {
    searchQuery: '',
    gridColumns: ['patient_id', 'task_type', 'Nvox_thr', 'slice_direction', 'mask_filename', 'image_filename'],
    gridData: [
      { patient_id: 'pt0001', task_type: 'tumor' , Nvox_thr:100, slice_direction:'cor', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'},
      { patient_id: 'pt0004', task_type: 'tumor' , Nvox_thr:1000, slice_direction:'cor', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'},
      { patient_id: 'pt0005', task_type: 'stroke', Nvox_thr: 200, slice_direction:'cor', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'},
      { patient_id: 'pt0002', task_type: 'hippocampus', Nvox_thr: 100, slice_direction:'ax', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'},
      { patient_id: 'pt0003', task_type: 'stroke', Nvox_thr: 300, slice_direction:'ax', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'}
    ]
  }
})
*/
/*
var myjson = $.getJSON( "uploaded_files/myuploads.json", function() {
  console.log( "success" );})*/
var myjson = $.getJSON( "static/myuploads.json", function(data) {
    console.log( "success" );
    demo.gridData = data
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

var demo = new Vue({
  el: '#demo',
  data: {
    searchQuery: '',
    gridColumns: ['patient_id', 'task_type', 'Nvox_thr', 'slice_direction', 'mask_filename', 'image_filename'],
    gridData: [
      { patient_id: 'pt0001', task_type: 'tumor' , Nvox_thr:'100', slice_direction:'cor', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'},
      { patient_id: 'pt0004', task_type: 'tumor' , Nvox_thr:'1000', slice_direction:'cor', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'},
      { patient_id: 'pt0005', task_type: 'stroke', Nvox_thr: '200', slice_direction:'cor', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'},
      { patient_id: 'pt0002', task_type: 'hippocampus', Nvox_thr: '100', slice_direction:'ax', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'},
      { patient_id: 'pt0003', task_type: 'stroke', Nvox_thr: '300', slice_direction:'ax', mask_filename:'mask_filename.nii.gz', image_filename:'image_filename.nii.gz'}
    ]
  }
})
