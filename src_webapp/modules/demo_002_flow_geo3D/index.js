(function($, window) {
  function CC(opts) {
    var me = this;

    me.all_obj = {
      ec: echarts.init(document.getElementById('ec')),
    };

  };
  CC.prototype = {
    init: function() {
      var me = this;
      me._bind();
      me._init();
    },
    _bind: function() {
      var me = this;

      var fn = {
        _init: function() {

          var image = new Image();
          image.src = './img/9.png';
          image.onload = function() {

            var option = {
              geo3D: {
                show: true,
                map: 'world',

                // 版块的厚度
                regionHeight: 1,
                // 盒子高度
                boxHeight: 10,

                // environment: './img/sign_bg.jpg',
                // 长度
                // boxDepth:100,
                // groundPlane: {
                //   show: false
                // },

                // label: {
                //   show: false,
                //   distance:100,
                // },

                shading: 'color',
                // 版块的设置
                itemStyle: {
                  color: 'red',
                  opacity: 0.2,
                },


                // 光源
                light: {
                  main: {
                    intensity: 0
                  },
                  ambient: {
                    intensity: 0
                  }
                },


                viewControl: {
                  distance: 60,
                  minDistance: 60,
                  maxDistance: 60,

                  alpha: 90,
                  minAlpha: 90,
                  maxAlpha: 90,

                  beta: 0,
                  minBeta: 0,
                  maxBeta: 0,
                },
              },
              series: [
                // 
                {
                  type: 'lines3D',

                  coordinateSystem: 'geo3D',

                  // 流星
                  effect: {
                    show: true,
                    // period:10,
                    trailWidth: 3,
                    constantSpeed: 20,
                    trailLength: 0.05,
                    trailColor: 'yellow',
                    trailOpacity: 0.8
                  },

                  blendMode: 'lighter',


                  // 轨迹色
                  lineStyle: {
                    width: 1,
                    color: 'rgb(0,255,255)',
                    opacity: 0.2
                  },

                  data: demo_data
                },
                // 
                {
                  name: 'scatter3D',
                  type: "scatter3D",
                  coordinateSystem: 'geo3D',

                  symbol: 'image://' + image.src,

                  symbolSize: [60, 60],
                  showAllSymbol: true,

                  itemStyle: {
                    color: 'red',
                    opacity: 0.8,

                    borderColor: 'yellow',
                    borderWidth: 1,

                    shadowBlur: 10,
                    shadowColor: 'blue',

                    // shadowOffsetX:50,
                  },
                  label: {
                    show: true,
                    formatter: function(params) {
                      // console.log(params.data);
                      return params.data.name;
                    },
                    position: "right",
                    textStyle: {
                      color: "#000",
                      borderWidth:5,
                      fontSize:20,
                      fontWeight:400,
                    },

                  },

                  data: demo_p_data,

                  // zlevel: 1,

                  // label: {
                  //   normal: {
                  //     formatter: '{b}',
                  //     position: 'right',
                  //     show: false
                  //   },
                  //   emphasis: {
                  //     show: true
                  //   }
                  // },
                  // itemStyle: {
                  //   normal: {
                  //     color: '#123'
                  //   }
                  // }
                }
              ]
            };
            me.all_obj.ec.setOption(option);

            $(window).on('resize', function() {
              me.all_obj.ec.resize();
            });
            // 点击事件
            me.all_obj.ec.on('click', function(params) {
              // me._ec_click(params.data.type, params.data.name, params.data);
              console.log(params);
            });
          };
        },

      };


      for (var k in fn) {
        me[k] = fn[k];
      };
    },
  };
  window.CC = CC;
})(jQuery, window);
