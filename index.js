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


          var planePath = 'path://M70.4 787.2l416-457.6c12.8-16 38.4-16 51.2 0l416 457.6c6.4 9.6 19.2 12.8 28.8 12.8 35.2 0 51.2-41.6 28.8-67.2l-448-492.8c-28.8-32-76.8-32-102.4 0L12.8 732.8c-22.4 25.6-3.2 67.2 28.8 67.2 12.8 0 22.4-3.2 28.8-12.8z';

          var option = {
            geo: {
              map: 'world',
              // 不显示
              show: false,
              // 当前缩放比
              zoom: 1.3,
              roam: false,

              label: {
                emphasis: {
                  show: false
                }
              },

              itemStyle: {
                normal: {
                  areaColor: '#323c48',
                  borderColor: '#404a59'
                },
                emphasis: {
                  areaColor: '#2a333d'
                }
              }
            },
            series: [
              // 所有线的数据
              {
                // name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 1,
                symbol: ['none', 'arrow'],
                symbolSize: 10,

                effect: {
                  show: true,
                  period: 2,
                  trailLength: 0.2,
                  color: 'yellow',
                  symbol: planePath,
                  symbolSize: 10
                },

                lineStyle: {
                  normal: {
                    color: "rgba(255,255,255,0.2)",
                    width: 1,
                    opacity: 0.1,
                    curveness: 0.1
                  }
                },
                data: [
                  // 
                  {
                    "coords": [
                      [-80.943139, 35.214],
                      [116.114129, 39.550339],
                    ]
                  },
                  // 
                  {
                    "coords": [
                      [116.114129, 39.550339],
                      [0, 0]
                    ]
                  },

                  // 
                  {
                    "coords": [
                      [0, 0],
                      [180, 0],
                    ]
                  },
                  // 
                  {
                    "coords": [
                      [180, 0],
                      [-180, 0],
                    ]
                  },
                  // 
                  {
                    "coords": [
                      [-180, 0],
                      [0, 80],
                    ]
                  },
                  // 
                  {
                    "coords": [
                      [0, 80],
                      [0, -50],
                    ]
                  },
                  // 
                  {
                    "coords": [
                      
                      [0, -50],
                      [-80.943139, 35.214],
                    ]
                  },
                ]
              },
              // 点
              {
                // name: item[0] + ' Top10',

                type: 'effectScatter',
                coordinateSystem: 'geo',
                // zlevel: 2,
                // 涟漪效果
                rippleEffect: {
                  scale: 10,
                  brushType: 'fill'
                },

                // 文字标识
                label: {
                  normal: {
                    show: true,
                    position: "bottom",
                    formatter: function (params) {

                      console.log(params);
                      return 'aa';
                    },
                  }
                },

                // 图标
                symbol: planePath,
                symbolSize: function(val) {
                  return 15;
                },

                itemStyle: {
                  normal: {
                    color: "yellow"
                  }
                },

                // 数据
                data: demo_p_data
              },

            ]
          };
          me.all_obj.ec.setOption(option);

          $(window).on('resize', function() {
            me.all_obj.ec.resize();
          });
          // 点击事件
          me.all_obj.ec.on('click', function(params) {
            // me._ec_click(params.data.type, params.data.name, params.data);
            // console.log(params);
          });



        },



      };


      for (var k in fn) {
        me[k] = fn[k];
      };
    },
  };
  window.CC = CC;
})(jQuery, window);
