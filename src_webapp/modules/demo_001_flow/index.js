(function($, window) {
  function CC(opts) {
    var me = this;

    me.all_obj = {
      ec: echarts.init(document.getElementById('ec')),

      // 所有点的一个对应坐标关系--用于线的坐标查询
      p_obj: {

      },


      // 基站的正常点集合
      cors_pt_arr: [],
      // 基站报警点收集
      cors_alarm_arr: [],

      // 收集线的数据pT
      pt_lines_arr: [],
      // 报警的收集线
      alarm_lines_arr: [],

      // ===================每个图标不一样的时候就要统一收集
      series: [],
    };


    // 
    me.conf = {
      // 
      start: [-180, 80],
      w: 360,
      h: 130,

      padding: 5,

      // 列宽
      _lie_w: 0,

    }

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
          // 起始点确定
          me._flow_start_p();

          // 确认列宽
          me._flow_lie_w();
          // 
          me._flow();
        },
        // 起始点确定
        _flow_start_p: function() {
          me.conf.start[0] = me.conf.start[0] + me.conf.padding;
          me.conf.start[1] = me.conf.start[1] - me.conf.padding;
          me.conf.w = me.conf.w - me.conf.padding * 2;
          me.conf.h = me.conf.h - me.conf.padding * 2;
        },
        // 宽度确定
        _flow_lie_w: function() {
          // 数据处理
          var index = 0;
          for (var lie in all_data) {
            index++;
          }
          // 初始化列宽
          me.conf._lie_w = Math.floor(me.conf.w / index);
        },
        _flow: function() {


          // **************************************模拟数据
          for (var lie_key in all_data) {
            all_data[lie_key].forEach(function(ele, index) {
              ele.id = `${lie_key}_${index+1}`;
              ele.name = `lie_${lie_key}_${index+1}`;
              ele.status = (Math.random() > 0.5 ? 0 : 1);
              // 图标
              ele.icon = `${ele.id}_${ele.status}`;
            });
          }
          // **********************************************
          // console.log(all_data);


          // 初始化节点
          me._flow_node();



          // **************************************模拟数据
          // 模拟要去的数据
          for (var lie_key in all_data) {
            all_data[lie_key].forEach(function(ele, index) {
              // console.log();
              ele.to = me._flow_lines_to_test(ele.id);
            });
          }
          // **********************************************

          // 初始化线
          me._flow_lines();

          // 生成数据
          me._flow_init();


          //  

          // console.log();

          setTimeout(function() {
            // **************************************模拟数据
            // for (var lie_key in all_data) {
            //   all_data[lie_key].forEach(function(ele, index) {
            //     // console.log();
            //     ele.to = me._flow_lines_to_test(ele.id);
            //   });
            // }
            // **********************************************
            // me.all_obj.ec.clear();

            me.all_obj.cors_pt_arr.length = 0;
            me.all_obj.cors_alarm_arr.length = 0;

            me.all_obj.pt_lines_arr.length = 0;
            me.all_obj.alarm_lines_arr.length = 0;


            me.all_obj.series.length = 0;
            me._flow();
          }, 5000)
        },





        // 初始化节点
        _flow_node: function() {
          for (var lie in all_data) {
            me._flow_node_init(all_data[lie], lie);
          }
        },
        _flow_node_init: function(arr, lie) {
          // console.log(arr, lie);
          var lie_index = null;
          switch (lie) {
            case "1":
              lie_index = 1;
              break;
            case "2":
              lie_index = 2;
              break;
            case "3":
              lie_index = 3;
              break;
            case "4":
              lie_index = 4;
              break;
            case "5":
              lie_index = 5;
              break;
          }
          // 每一列的项目高
          var _item_h = Math.floor(me.conf.h / arr.length);


          // 每列起始经度
          var lng = me.conf.start[0] + (lie_index - 0.5) * me.conf._lie_w;
          // 纬度
          var lat = 0;

          // 
          arr.forEach(function(ele, index) {
            lat = me.conf.start[1] - (index + 1 - 0.5) * _item_h;

            // PT
            if (ele.status) {

              me.all_obj.series.push({
                type: 'scatter',
                coordinateSystem: 'geo',
                // 涟漪效果
                rippleEffect: {
                  scale: 3,
                  brushType: 'stroke'
                },

                // 文字标识
                label: {
                  normal: {
                    show: true,
                    position: "bottom",
                    formatter: function(params) {
                      return params.data.name;
                    },
                  }
                },

                // 图标
                symbol: `image://./img/${ele.icon}.png`,
                symbolSize: function(val) {
                  return 48;
                },

                // 模块颜色
                itemStyle: {
                  normal: {
                    // 颜色可以区别对待
                    color: '#00FF00'
                  }
                },

                // 数据
                data: [{
                  id: ele.id,
                  name: ele.name,
                  value: [lng, lat]
                }]
              });
              // me.all_obj.cors_pt_arr.push({
              //   id: ele.id,
              //   name: ele.name,
              //   value: [lng, lat]
              // });
            }
            // 报警点收集
            else {

              me.all_obj.series.push({
                type: 'effectScatter',
                coordinateSystem: 'geo',
                // zlevel: 2,
                // 涟漪效果
                rippleEffect: {
                  scale: 3,
                  brushType: 'stroke'
                },

                // 文字标识
                label: {
                  normal: {
                    show: true,
                    position: "bottom",
                    formatter: function(params) {
                      return params.data.name;
                    },
                  }
                },

                // 图标
                symbol: `image://./img/${ele.icon}.png`,
                symbolSize: function(val) {
                  return 48;
                },

                // 模块颜色
                itemStyle: {
                  normal: {
                    // 颜色可以区别对待
                    color: function(params) {
                      // console.log(params);
                      return "red";
                    }
                  }
                },

                // 数据
                data: [{
                  id: ele.id,
                  name: ele.name,
                  value: [lng, lat]
                }]
              });


              // me.all_obj.cors_alarm_arr.push({
              //   id: ele.id,
              //   name: ele.name,
              //   value: [lng, lat]
              // });

            }

            // 生成字典
            me.all_obj.p_obj[ele.id] = [lng, lat];
          });
        },

        // 初始化线
        _flow_lines: function() {
          for (var lie in all_data) {
            all_data[lie].forEach(function(ele, index) {
              if (ele.to) {
                // PT
                if (ele.status) {

                  me.all_obj.pt_lines_arr.push({
                    "coords": [
                      me.all_obj.p_obj[ele.id],
                      me.all_obj.p_obj[ele.to],
                    ]
                  });
                }
                // 报警
                else {


                  me.all_obj.alarm_lines_arr.push({
                    "coords": [
                      me.all_obj.p_obj[ele.id],
                      me.all_obj.p_obj[ele.to],
                    ]
                  });
                }

              }



            });
          }
        },
        // 
        _flow_lines_to_test: function(id) {
          id = id.split('_')[0];
          var next_id = id * 1 + 1;
          // console.log(next_id);

          // 有
          var index = 0;

          var to = false;
          if (me.all_obj.p_obj[next_id + '_1']) {
            index++;
            while (true) {
              index++;
              if (me.all_obj.p_obj[next_id + '_' + index]) {

              } else {
                index--;
                // console.log();
                break;
              }
            }
            // console.log(id, index);

            to = next_id + '_' + Math.ceil(Math.random() * index);
          }

          // console.log(id,to);
          return to;
        },

        // 
        _flow_init: function() {

          me.all_obj.series.push({
            // name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 1,
            // symbol: ['none', 'arrow'],
            symbolSize: 10,

            effect: {
              show: true,
              period: 1.2,
              trailLength: 0.2,
              color: '#00FF00',
              symbol: line_Path,
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

            data: me.all_obj.pt_lines_arr
          });

          me.all_obj.series.push({
            type: 'lines',
            zlevel: 2,
            // symbol: ['none', 'arrow'],
            symbolSize: 10,

            effect: {
              show: true,
              period: 1.2,
              trailLength: 0.2,
              color: 'red',
              symbol: line_Path,
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

            data: me.all_obj.alarm_lines_arr
          });


          var option  = {
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
            series: me.all_obj.series
          };
          me.all_obj.ec.setOption(option);


          $(window).off().on('resize', function() {
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
