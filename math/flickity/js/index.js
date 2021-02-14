'use strict';

var eventHub = new Vue();
var flkty = null;

function generateFilters() {
  return [{ displayName: '1977', className: '_1977', opacity: 1 }, { displayName: 'Aden', className: 'aden', opacity: 1 }, { displayName: 'Brannan', className: 'brannan', opacity: 1 }, { displayName: 'Brooklyn', className: 'brooklyn', opacity: 1 }, { displayName: 'Clarendon', className: 'clarendon', opacity: 1 }, { displayName: 'Earlybird', className: 'earlybird', opacity: 1 }, { displayName: 'Gingham', className: 'gingham', opacity: 1 }, { displayName: 'Hudson', className: 'hudson', opacity: 1 }, { displayName: 'Inkwell', className: 'inkwell', opacity: 1 }, { displayName: 'Kelvin', className: 'kelvin', opacity: 1 }, { displayName: 'Lark', className: 'lark', opacity: 1 }, { displayName: 'Lo-Fi', className: 'lofi', opacity: 1 }, { displayName: 'Maven', className: 'maven', opacity: 1 }, { displayName: 'Mayfair', className: 'mayfair', opacity: 1 }, { displayName: 'Moon', className: 'moon', opacity: 1 }, { displayName: 'Nashville', className: 'nashville', opacity: 1 }, { displayName: 'Perpetua', className: 'perpetua', opacity: 1 }, { displayName: 'Reyes', className: 'reyes', opacity: 1 }, { displayName: 'Rise', className: 'rise', opacity: 1 }, { displayName: 'Slumber', className: 'slumber', opacity: 1 }, { displayName: 'Stinson', className: 'stinson', opacity: 1 }, { displayName: 'Toaster', className: 'toaster', opacity: 1 }, { displayName: 'Valencia', className: 'valencia', opacity: 1 }, { displayName: 'Walden', className: 'walden', opacity: 1 }, { displayName: 'Willow', className: 'willow', opacity: 1 }, { displayName: 'X-pro II', className: 'xpro2, opacity: 1' }];
}

Vue.component('filter-list', {
  template: '#filter-list',
  props: ['filters', 'source', 'active'],
  created: function created() {
    var self = this;
    setTimeout(function () {
      var el = self.$el;
      flkty = new Flickity(el, {
        cellAlign: 'center',
        contain: true,
        initialIndex: self.active,
        pageDots: false,
        setGallerySize: false,
        prevNextButtons: false
      });
    }, 0);
  }
});

Vue.component('strength-slider', {
  template: '#strength-slider',
  created: function created() {
    var self = this;
    var initialFilterStrength = instagramClone.$data.filters[instagramClone.$data.activeFilterIndex].opacity * 100;
    var sliderOpts = {
      connect: [true, false],
      tooltips: true,
      format: wNumb({
        decimals: 0
      }),
      start: [initialFilterStrength],
      step: 1,
      range: {
        'min': [0],
        'max': [100]
      }
    };

    setTimeout(function () {
      var slider = noUiSlider.create(self.$el, sliderOpts);
      slider.on('update', function (e) {
        var newVal = e[0] / 100;
        eventHub.$emit('adjust-filter-opacity', {
          opacity: newVal
        });
      });
    }, 0);
  }
});

Vue.component('filter-preview', {
  template: '#filter-preview',
  props: ['filter', 'source', 'index'],
  methods: {
    changeFilter: function changeFilter(filter, index) {
      var cachedIndex = instagramClone.$data.activeFilterIndex;
      if (cachedIndex == index) {
        this.toggleFilterStrength(filter);
        return;
      }

      flkty.select(index);
      eventHub.$emit('change-filter', {
        filter: filter,
        index: index
      });
    },
    toggleFilterStrength: function toggleFilterStrength(filter) {
      eventHub.$emit('toggle-filter-strength', {
        filter: filter
      });
    }
  }
});

var instagramClone = new Vue({
  el: '#vue-instagram-clone',
  computed: {
    photoHasBeenUploaded: function photoHasBeenUploaded() {
      return this.uploadedPhoto !== null;
    },
    shouldShowFilterList: function shouldShowFilterList() {
      return !this.editingFilterStrength;
    }
  },
  created: function created() {
    eventHub.$on('change-filter', this.changeFilter);
    eventHub.$on('toggle-filter-strength', this.toggleFilterStrength);
    eventHub.$on('adjust-filter-opacity', this.adjustFilterOpacity);
  },
  data: {
    activeFilterClassname: null,
    activeFilterIndex: 0,
    filters: generateFilters(),
    filterStrength: 100,
    editingFilterStrength: false,
    uploadedPhoto: null
  },
  methods: {
    changeFilter: function changeFilter(obj) {
      this.activeFilterClassname = obj.filter.className;
      this.activeFilterIndex = obj.index;
    },
    toggleFilterStrength: function toggleFilterStrength() {
      this.editingFilterStrength = !this.editingFilterStrength;
    },
    adjustFilterOpacity: function adjustFilterOpacity(obj) {
      this.filters[this.activeFilterIndex].opacity = obj.opacity;
    },
    handlePhotoUpload: function handlePhotoUpload(e) {
      var self = this;
      var reader = new FileReader();
      reader.onload = function (e) {
        self.uploadedPhoto = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    },
    triggerFilePicker: function triggerFilePicker(photo) {
      this.$refs.upload.click();
    },
    reset: function reset() {
      this.activeFilterIndex = 0;
      this.activeFilterClassname = null;
      this.uploadedPhoto = null;
      this.filters = generateFilters();
    }
  }
});