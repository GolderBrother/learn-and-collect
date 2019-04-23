var chartTimer = null,
    curTimer = null;
var serverURL = "192.168.218.56:8098";
init();

// 初始化函数
function init() {
    initChartData();
    // setInterval(() => {
    // }, 100);
    setCurrentTime();
    initRenderVideo();
    getLightStatus();
    // initOcxDeviceAndRealPlay();
}

// 获取灯的状态 电控
// 这个部分是两种状态 灯全关了就是暗的 有灯还开着就是亮的 
function getLightStatus() {
    var lightStatus = {
        one: true,
        two: true,
        three: false
    }
    var lightClass = "building-lighting-control__item__open",
        $lightItemOne = $(".building-lighting-control__item").eq(0),
        $lightItemTwo = $(".building-lighting-control__item").eq(1),
        $lightItemThree = $(".building-lighting-control__item").eq(2);
    if (lightStatus.one) {
        !$lightItemOne.hasClass(lightClass) && $lightItemOne.addClass(lightClass);
    } else {
        $lightItemOne.hasClass(lightClass) && $lightItemOne.removeClass(lightClass);
    }

    if (lightStatus.two) {
        !$lightItemTwo.hasClass(lightClass) && $lightItemTwo.addClass(lightClass);
    } else {
        $lightItemTwo.hasClass(lightClass) && $lightItemTwo.removeClass(lightClass);
    }

    if (lightStatus.three) {
        !$lightItemThree.hasClass(lightClass) && $lightItemThree.addClass(lightClass);
    } else {
        $lightItemThree.hasClass(lightClass) && $lightItemThree.removeClass(lightClass);
    }
}

// 清空计时器
function clearTimer() {
    if (chartTimer) {
        clearInterval(chartTimer);
    }
    if (curTimer) {
        clearInterval(curTimer);
    }
}


(function () {
    // var collapseFlag = false;
    // localStorage.setItem("collapseFlag", JSON.stringify(collapseFlag));
    // $(".btn-collapse").on("click", function () {
    //     if (!JSON.parse(localStorage.getItem("collapseFlag"))) {
    //         $(".chartPanel-left").css("left", "-50%");
    //         $(".chartPanel-right").css("right", "-50%");
    //     } else {
    //         $(".chartPanel-left").css("left", "0%");
    //         $(".chartPanel-right").css("right", "0%");
    //     }
    //     collapseFlag = !collapseFlag;
    //     localStorage.setItem("collapseFlag", JSON.stringify(collapseFlag));
    // });

    // 界面刷新F5、浏览器刷新、页面离开
    window.onunload = function (event) {
        ocxReleaseResource();
        clearTimer();
    }

    // ocx释放内存资源
    function ocxReleaseResource() {
        try {
            if (document.getElementById("zktecoVideo") !== undefined) {
                document.getElementById("zktecoVideo").ReleaseResource()
            }
            // if (document.getElementById("zktecoVideo") !== undefined) {
            //     document.getElementById("zktecoVideo").ReleaseResource()
            // }
            // if (document.getElementById("zktecoVideo") !== undefined) {
            //     document.getElementById("zktecoVideo").ReleaseResource()
            // }
            // if (document.getElementById("zktecoVideo") !== undefined) {
            //     document.getElementById("zktecoVideo").ReleaseResource()
            // }
        } catch (err) {
            $("#zkVideoOcx").html('<div><a style="color:#7ac142" href="/park/activeX/LPRActive2100.exe">I18n.getValue("park_preview_warn10")</a></div>');
            // $("#zkVideoOcx").html('<div><a style="color:#7ac142" href="/park/activeX/LPRActive2100.exe">I18n.getValue("park_preview_warn10")</a></div>');
            // $("#zkVideoOcx").html('<div><a style="color:#7ac142" href="/park/activeX/LPRActive2100.exe">I18n.getValue("park_preview_warn10")</a></div>');
            // $("#zkVideoOcx").html('<div><a style="color:#7ac142" href="/park/activeX/LPRActive2100.exe">I18n.getValue("park_preview_warn10")</a></div>');
        }
    }

    // 全屏切换的相关事件
    (function () {
        var isFull = false;
        localStorage.setItem("isFull", JSON.stringify(isFull));
        $(".btn-collapse").on("click", function () {
            if (!JSON.parse(localStorage.getItem("isFull"))) {
                fullScreen(function () {
                    $(".dashboard-panel").css("background-position-y", "50px");
                    $(".dashboard-body").css("top", "-20px");
                })
            } else {
                exitScreen(function () {
                    $(".dashboard-panel").css("background-position-y", "0");
                    $(".dashboard-body").css("top", "-70px");
                })
            }
            isFull = !isFull;
            localStorage.setItem("isFull", JSON.stringify(isFull));
        });

        //全屏
        function fullScreen(cb) {
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
            if (typeof rfs != "undefined" && rfs) {
                rfs.call(el);
            };
            cb && cb();
            return;
        }
        //退出全屏
        function exitScreen(cb) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            if (typeof cfs != "undefined" && cfs) {
                cfs.call(el);
            }
            cb && cb();
        }

        //监听退出全屏事件
        window.onresize = function () {
            if (!checkFull()) { //不是全屏
                $(".dashboard-panel").css("background-position-y", "0");
                $(".dashboard-body").css("top", "-70px");
            } else { // 全屏
                //要执行的动作
                $(".dashboard-panel").css("background-position-y", "50px");
                $(".dashboard-body").css("top", "-20px");
            }
        }

        // 判断是否为全屏
        function checkFull() {
            // 全屏
            var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
            //to fix : false || undefined == undefined
            if (isFull === undefined) {
                isFull = false;
            }
            return isFull;
        }
    })();

    // 手动刷新获取停车位数据
    $(".icon-update").on("click", function () {
        getParkingSpaceUseData();
    });
    $(".building-data-box").on("mouseover", function () {
        $(this).show();
    });

    // 鼠标移入获取建筑物实时数据，显示数据框，移出隐藏
    $(".chartPanel-3d-map-builds-item").hover(function () {
        var dataType = $(this).attr("data-type");
        var buildActiveClass = "chartPanel-3d-map-build__" + dataType + "_active";
        $(this).addClass(buildActiveClass);
        setBuildBoxDataByType(dataType);
        $(".building-data-box").show();
    }, function () {
        var buildActiveClass = "chartPanel-3d-map-build__" + $(this).attr("data-type") + "_active";
        $(this).removeClass(buildActiveClass);
        $(".building-data-box").hide();
    });
})();


// //监听全屏状态，全屏返回dom，否则返回false
// function watchFullScreen() {
//     var isFull;
//     document.addEventListener("fullscreenchange", function () {
//         isFull = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
//     }, false);
//     document.addEventListener("mozfullscreenchange", function () {
//         isFull = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
//     }, false);
//     document.addEventListener("webkitfullscreenchange", function () {
//         isFull = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
//     }, false);
//     document.addEventListener("msfullscreenchange", function () {
//         isFull = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
//     }, false);
//     console.log(isFull);
// }

// 通过建筑物类型，鼠标移上去请求对应的数据，并展示数据框
function setBuildBoxDataByType(type) {
    var $ul = $('.building-data-panel__list'),
        $li = null,
        dataObj = {};
    getBuildDataByType(type).then(res => {
        dataObj = res;
    }).catch(err => {
        console.log(err);
    });
    setTimeout(function () {
        if (!dataObj) return;
        $ul.empty();
        $(".building-data-panel__title h3").text(dataObj.title);
        dataObj.data.forEach(data => {
            $li = $(
                '<li class="building-data-panel__list__item flex-box flex-direction_row justify-content_flex-justify align-items_center"><span class="building-data-panel__item__title">' +
                data.name + '</span><span class="building-data-panel__item__num">' + data.value +
                '<i class="unit">人</i></span></li>');
            $ul.append($li);
        });
    }, 0);
}

// 初始化获取建筑楼房信息(服务端配置楼房信息)
// function getBuildsInfo() {
//     // 发请求获取建筑楼房信息
// }

// 通过建筑物类型获取数据的通用方法
function getBuildDataByType(type) {
    var dataObj = {};
    return new Promise((resolve, reject) => {
        switch (type) {
            case "production-building":
                getProductionBuildData().then(res => {
                    dataObj = res;
                    resolve(dataObj);
                }).catch(err => reject(reject));
                break;
            case "security-booth":
                getSecurityBoothData().then(res => {
                    dataObj = res;
                    resolve(dataObj);
                }).catch(err => reject(reject));
                break;
            case "big-building":
                getBigBuildData().then(res => {
                    dataObj = res;
                    resolve(dataObj);
                }).catch(err => reject(reject));
                break;
            case "canteen-building":
                getCanteenData().then(res => {
                    dataObj = res;
                    resolve(dataObj);
                }).catch(err => reject(reject));
                break;
            case "parking-building":
                getParkingData().then(res => {
                    dataObj = res;
                    resolve(dataObj);
                }).catch(err => reject(reject));
                break;
            case "guest-room-building":
                getGuestRoomData().then(res => {
                    dataObj = res;
                    resolve(dataObj);
                }).catch(err => reject(reject));
                break;
            case "RD-dormitory-building":
                getRDDormitoryData().then(res => {
                    dataObj = res;
                    resolve(dataObj);
                }).catch(err => reject(reject));
                break;
            default:
                console.log("未选择任何建筑物");
                resolve(null);
        }
    })

}

// 获取生产楼数据
function getProductionBuildData() {
    var dataObj = {};
    return new Promise((resolve, reject) => {
        dataObj = {
            title: "生产楼",
            data: [{
                name: "当日在岗人数",
                value: 80
            }, {
                name: "当日请假人数",
                value: 81
            }, {
                name: "当日外出人数",
                value: 82
            }, {
                name: "当日旷工人数",
                value: 83
            }]
        }
        // 这边发请求获取真实数据
        // 获取建筑楼房信息(服务端配置楼房信息)
        resolve(dataObj);
    });
}

// 获取保安室数据 
function getSecurityBoothData() {
    var dataObj = {};
    return new Promise((resolve, reject) => {
        dataObj = {
            title: "保安室",
            data: [{
                name: "当日预约人数",
                value: 80
            }, {
                name: "已到达访客人数",
                value: 81
            }, {
                name: "已签离人数",
                value: 82
            }]
        }
        // 这边发请求获取真实数据
        resolve(dataObj);
    });
}

// 获取大厦数据 
function getBigBuildData() {
    var dataObj = {};
    return new Promise((resolve, reject) => {
        dataObj = {
            title: "大厦",
            data: [{
                name: "可容纳办公人数",
                value: 80
            }, {
                name: "已入驻办公人数",
                value: 81
            }, {
                name: "当日在岗人数",
                value: 82
            }, {
                name: "当日请假人数",
                value: 80
            }, {
                name: "当日外出人数",
                value: 81
            }, {
                name: "当日旷工人数",
                value: 82
            }]
        }
        // 这边发请求获取真实数据
        resolve(dataObj);
    });
}

// 获取食堂数据        
function getCanteenData() {
    var dataObj = {};
    return new Promise((resolve, reject) => {
        dataObj = {
            title: "食堂",
            data: [{
                name: "可容纳就餐人数",
                value: 80
            }, {
                name: "早餐已消费人数",
                value: 81
            }, {
                name: "午餐已消费人数",
                value: 82
            }, {
                name: "晚餐已消费人数",
                value: 82
            }]
        }
        // 这边发请求获取真实数据
        resolve(dataObj);
    });
}

// 获取停车场数据         
function getParkingData() {
    var dataObj = {};
    return new Promise((resolve, reject) => {
        dataObj = {
            title: "停车场",
            data: [{
                name: "总车位数",
                value: 80
            }, {
                name: "车位使用率",
                value: 81
            }, {
                name: "园区内总车辆数",
                value: 82
            }, {
                name: "超时员工车辆数",
                value: 82
            }]
        }
        // 这边发请求获取真实数据
        resolve(dataObj);
    });
}

// 获取D栋客房数据   
function getGuestRoomData() {
    var dataObj = {};
    return new Promise((resolve, reject) => {
        dataObj = {
            title: "D栋客房",
            data: [{
                name: "总可入住数",
                value: 80
            }, {
                name: "当前已入住人数",
                value: 81
            }, {
                name: "今日可入住人数",
                value: 82
            }, {
                name: "明日可入住人数",
                value: 82
            }]
        }
        // 这边发请求获取真实数据
        resolve(dataObj);
    });
}


// 获取研发宿舍数据   
function getRDDormitoryData() {
    var dataObj = {};
    return new Promise((resolve, reject) => {
        dataObj = {
            title: "研发宿舍",
            data: [{
                name: "可入住人员（男）",
                value: 80
            }, {
                name: "已入住人员（男）",
                value: 81
            }, {
                name: "可入住人员（女）",
                value: 82
            }, {
                name: "已入住人员（女）",
                value: 82
            }]
        }
        // 这边发请求获取真实数据
        resolve(dataObj);
    });
}

// 初始化图表数据
function initChartData() {
    var chartTimer = null;
    // chartTimer = setInterval(function() {
    getHardwareDdeviceRate();
    getAttendTrendData();
    getParkingSpaceUseData();
    getRoomOccupancyData();
    getConferenceRoomData();
    // },1000);
}

// 初始化渲染实时视频
function initRenderVideo() {
    var videoDomArr = ["video-item__one", "video-item__two", "video-item__three", "video-item__four"];
    videoDomArr.forEach(id => {
        getMedia.call(null, id);
    })
    // getMedia("video-item__one");
    // getMedia("video-item__two");
    // getMedia("video-item__three");
    // getMedia("video-item__four");
}


// 获取考勤数据
function getAttDeviceData() {
    var dataObj = {
        title: "考勤在线率",
        data: [{
            name: "",
            value: 88
        }, {
            name: "",
            value: 12
        }]
    };
    // 这边需要发请求获取真实的数据 然后更新上面data属性值
    initDeviceChart("hardware-device-item-att-box", dataObj, function () {
        var num = dataObj.data[0].value;
        $(".chartPanel-hardware-device-att").find(".hardware-device-data-num").text(num);
    });
}

// 获取门禁数据
function getAccDeviceData() {
    var dataObj = {
        title: "门禁在线率",
        data: [{
            name: "",
            value: 100
        }, {
            name: "",
            value: 0
        }]
    };
    // 这边需要发请求获取真实的数据 然后更新上面data属性值
    initDeviceChart("hardware-device-item-acc-box", dataObj, function () {
        var num = dataObj.data[0].value;
        $(".chartPanel-hardware-device-acc").find(".hardware-device-data-num").text(num);
    });
}

// 获取视频数据
function getVideoDeviceData() {
    var dataObj = {
        title: "视频在线率",
        data: [{
            name: "",
            value: 75
        }, {
            name: "",
            value: 25
        }]
    };
    // 这边需要发请求获取真实的数据 然后更新上面data属性值
    initDeviceChart("hardware-device-item-video-box", dataObj, function () {
        var num = dataObj.data[0].value;
        $(".chartPanel-hardware-device-video").find(".hardware-device-data-num").text(num);
    });
}

// 获取停车场数据
function getParkDeviceData() {
    var dataObj = {
        title: "停车在线率",
        data: [{
            name: "",
            value: 62
        }, {
            name: "",
            value: 38
        }]
    };
    // 这边需要发请求获取真实的数据 然后更新上面data属性值
    initDeviceChart("hardware-device-item-park-box", dataObj, function () {
        var num = dataObj.data[0].value;
        $(".chartPanel-hardware-device-park").find(".hardware-device-data-num").text(num);
    });
}



/*
 * 初始化配置硬件设备在线率图表
 * @param {string} domID 图表盒子ID
 * @param {object} options 图表配置数据
 * @parms {function} cb 回调函数
 */
function initDeviceChart(domID, options, cb) {
    var dom = document.getElementById(domID);
    var myChart = echarts.init(dom);
    var app = {};
    var dataArr = [];
    var option = null;
    app.title = '环形图';
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            // data: ['视频在线率', '视频非在线率']
        },
        series: [{
            name: options.title,
            type: 'pie',
            radius: ['66%', '80%'], //饼图的半径大小 
            center: ['50%', '50%'], //饼图的位置
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                    value: options.data[0].value,
                    itemStyle: {
                        // TODO 换成渐变色
                        // color: '#68DFFF',
                        // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(117, 255, 255, 1)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(85, 147, 254, 1)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                {
                    value: options.data[1].value,
                    itemStyle: {
                        color: '#2A4B5E',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            ]
        }]
    };
    myChart.clear();
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        cb && cb();
    }
}


/*
 * 初始化配置考勤出勤率图表
 * @param {string} domID 图表盒子ID
 * @param {object} options 图表配置数据
 * @parms {function} cb 回调函数
 */
function initAttendTrendChart(domID, options, cb) {
    var dom = document.getElementById(domID);
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel: {
                color: '#71DBE1'
            },
            axisLine: {
                lineStyle: {
                    color: '#71DBE1'
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                interval: 0,
                margin: 5,
                color: '#71DBE1'
            },
            axisLine: {
                lineStyle: {
                    color: 'transparent'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['rgba(101,198,231,.2)']
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    borderColo: '#000',
                    shadowColor: '#000',
                    backgroundColor: '#6a7985'
                },
                textStyle: {
                    color: 'red'
                }
            },
            backgroundColor: 'rgba(0,204,205,1)'
        },
        legend: {
            data: [options.title]
        },
        series: [{
            name: '出勤率 ',
            data: options.data,
            type: 'line',
            symbol: 'circle',
            radius: ['70%', '80%'], //饼图的半径大小 
            itemStyle: { //折线拐点标志的样式
                normal: {
                    borderWidth: 6,
                    borderColor: '#71DBE1',
                    color: '#71DBE1'
                }
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(0,204,205,1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(64,127,255,1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
            lineStyle: {
                color: "#71DBE1"
            }
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        cb && cb();
    }
}

/*-----------------------------------园区硬件设备在线率------------------------------------*/
// 获取园区硬件设备在线率
function getHardwareDdeviceRate() {
    getAttDeviceData();
    getAccDeviceData();
    getVideoDeviceData();
    getParkDeviceData();
}

/*--------------------------------获取考勤出勤率和出勤率趋势图-----------------------------------------*/
// 获取出勤率趋势图
function getAttendTrendData() {
    var currentDataObj = {
        title: "出勤率 ",
        data: [820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330]
    };
    var _dataObj = {
        attend: {
            num: 8866,
            rate: '22%'
        },
        attendRate: {
            num: 80,
            rate: '22%'
        }
    }
    // 这边发请求获取真实数据
    setInterval(function () {
        currentDataObj.data = currentDataObj.data.map((value, index, arr) => {
            if (index === 0) {
                value += 5;
            }else if (index % 2 === 0) {
                value += 20;
            } else if (index % 3 === 0) {
                value += 30;
            } else if (index % 4 === 0) {
                value += 40;
            } else {
                value += 10;
            }
            return value;
        });
        _dataObj.attend.num += 10;
        initAttendTrendChart("chartPanel-attendence-rate-trend-chart", currentDataObj, function () {
            var dataObj = _dataObj;
            // 这边需要发请求获取真实的数据 然后更新上面data属性值
            $(".attendence-rate-data-num-box-amount").find(".data-num").text(dataObj.attend.num).end().find(
                ".top").text(dataObj.attendRate.rate);
            $(".attendence-rate-data-num-box-rate").find(".data-num").text(dataObj.attendRate.num).end().find(
                ".top").text(dataObj.attendRate.rate);
        });
    }, 2000);
}

/*--------------------------------获取园区车位使用率数据-----------------------------------------*/
// 获取园区车位使用率数据
function getParkingSpaceUseData() {
    var dataObj = {
        title: "车位使用率",
        data: [{
            name: "",
            value: 88
        }, {
            name: "",
            value: 12
        }],
        otherData: {
            use: 280,
            unuse: 20,
            all: 300,
        },
        chart: {
            radius: ['76%', '90%']
        }
    };
    // 这边需要发请求获取真实的数据 然后更新上面data和otherData属性值

    initDeviceChart("parking-space-use-item-chart-box", dataObj, function () {
        var num = dataObj.data[0].value;
        $(".chartPanel-parking-space-use__left").find(".parking-space-use-data-num").text(num);
        $(".chartPanel-parking-space-use__right").find(".parking-space-use__right-item-num-use").text(
            dataObj.otherData.use);
        $(".chartPanel-parking-space-use__right").find(".parking-space-use__right-item-num-unuse").text(
            dataObj.otherData.unuse);
        $(".chartPanel-parking-space-use__right").find(".parking-space-use__right-item-num-all").text(
            dataObj.otherData.all);
    });

}

/*--------------------------------获取园区客房入住率-----------------------------------------*/
// 获取园区客房入住率
function getRoomOccupancyData() {
    var dataObj = {
        title: "园区客房入住率",
        data: [{
            name: "",
            value: 88
        }, {
            name: "",
            value: 12
        }],
        otherData: {
            use: 280,
            unuse: 88
        }
    };
    // 这边需要发请求获取真实的数据 然后更新上面data和otherData属性值
    initDeviceChart("room-occupancy-item-chart-box", dataObj, function () {
        var num = dataObj.data[0].value;
        $(".room-occupancy-item-box").find(".room-occupancy-data-num").text(num);
        $(".room-occupancy-item-num_use-box").find(".room-occupancy-use__right-item-num-use").text(
            dataObj.otherData.use);
        $(".room-occupancy-item-num_unuse-box").find(".room-occupancy-use__right-item-num-unuse").text(
            dataObj.otherData.unuse);
    });
}

/*--------------------------------获取园区会议室当日使用率-----------------------------------------*/
// 获取园区会议室当日使用率
function getConferenceRoomData() {
    var dataObj = {
        title: "园区会议室当日使用率",
        data: [{
            name: "",
            value: 88
        }, {
            name: "",
            value: 12
        }],
        otherData: {
            use: 280,
            unuse: 88
        }
    };
    // 这边需要发请求获取真实的数据 然后更新上面data和otherData属性值
    initDeviceChart("conference-room-use-item-chart-box", dataObj, function () {
        var num = dataObj.data[0].value;
        $(".conference-room-use-item-data-num").find(".conference-room-use-data-num").text(num);
        $(".conference-room-use__right-item-box").find(".conference-room-use__right-item-num-use").text(
            dataObj.otherData.use);
        $(".conference-room-use__right-item-box").find(".conference-room-use__right-item-num-unuse").text(
            dataObj.otherData.unuse);
    });
}


// 开启摄像头
function getMedia(videoDOM) {
    // var _this = this;
    var constraints = {
        video: {
            width: 100,
            height: 60
        },
        audio: false
        // facingMode: "user" //调用前置摄像头
    };
    //获得video摄像头区域
    var video = document.getElementById(videoDOM);
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {

            // First get ahold of the legacy getUserMedia, if present
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            // Some browsers just don't implement it - return a rejected promise with an error
            // to keep a consistent interface
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    if (
        //     (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.getUserMedia ||
        // navigator.webkitGetUserMedia ||
        // navigator.mozGetUserMedia
        typeof navigator.mediaDevices.getUserMedia === "function"
    ) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(MediaStream => {
                video.srcObject = MediaStream;
                video.play();
            })
            .catch(err => {
                console.log(err.name + ": " + err.message);
                $(".chartPanel-video-item__video-box video").hide().end().find(".media-error-img").show();
                var errorMsg = "";
                if (err.NOT_SUPPORTED_err) {
                    errorMsg = "对不起，您的浏览器不支持拍照功能，请使用其他浏览器";
                } else if (err.MANDATORY_UNSATISFIED_ERROR) {
                    errorMsg = "指定的媒体类型未接收到媒体流";
                } else {
                    errorMsg = "缺少摄像头设备！";
                }
                console.error(errorMsg);
                // _this.canTakePhoto = false;
            });
    } else {
        // _this.canTakePhoto = false;
        console.error("不支持摄像头调用！");
    }
}

// 补0
function addZreo(num) {
    return num > 9 ? (num + '') : ('0' + num);
}

// 获取当前星期
function getWeek(now) {
    let week = "";
    var day = now.getDay();
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    week = weeks[day];
    return week;
}

// 获取当前时间
function getCurrentTime(date) {
    let curTimeStr = "";
    const year = date.getFullYear(),
        mon = addZreo(date.getMonth() + 1),
        day = addZreo(date.getDate()),
        hour = addZreo(date.getHours()),
        minutes = addZreo(date.getMinutes()),
        week = getWeek(date);
    curTimeStr = year + "-" + mon + "-" + day + " " + hour + ":" + minutes + " " + week;
    return curTimeStr;
}

/**
 * 初始化ocx实时视频播放
 * @author <a href="mailto:yaohuang.zhang@zkteco.com">yaohuang.zhang</a>
 * @param parkDeviceItemList 设备信息列表
 * @return
 */
function initParkOcx(parkDeviceItemList, videoOcxName) {
    var isIE = !!window.ActiveXObject || "ActiveXObject" in window;
    var ocxZK = $("#" + videoOcxName + " object[id='zktecoVideo']")[0];
    if (ocxZK === undefined || ocxZK === null) {
        if (isIE) {
            $("#" + videoOcxName).append('<object classid="clsid:D8AC245E-9EDA-4B5D-A8B3-3F0A2009E63B" class="videoOcx" id="zktecoVideo"  width="100%" height ="100%"></object>');
            try {
                //console.log("initParkOcx releaseResource...")
                document.getElementById("zktecoVideo").ReleaseResource();
                //console.log("initParkOcx initWindow...")
                document.getElementById("zktecoVideo").InitSplitWnd(4, true);
                document.getElementById("zktecoVideo").SetLanguage("zh_CN"); //这个方法必须在InitSplitWnd 之后使用
                document.getElementById("zktecoVideo").SetRButtonSpiltUI(false);
                if (parkDeviceItemList) {
                    $.each(parkDeviceItemList, function (index, devInfo) {
                        //console.log(devInfo)
                        //console.log("initParkOcx login: " + devInfo.ipAddress);
                        // 1.窗口索引从0开始  2.设备型号  3.设备IP  4.端口号  5.用户名   6.用户密码
                        // var loginid = document.getElementById("zktecoVideo").Login(devInfo.avoption-1, devInfo.vendorsType, devInfo.ipAddress, devInfo.port, devInfo.lprUserName, devInfo.lprPassWord);
                        var loginid = document.getElementById("zktecoVideo").Login(devInfo.avoption - 1, devInfo.vendorsType, devInfo.ipAddress, devInfo.port, devInfo.username, devInfo.password, devInfo.lprDeviceType);
                        console.log("initParkOcx loginid == " + loginid)
                        // 1.登入句柄   2.0 3.窗口索引 从0开始
                        var realPlay = document.getElementById("zktecoVideo").RealPlay(loginid, 0, devInfo.avoption - 1);
                        //console.log("initParkOcx realPlay == " + realPlay)
                        // 1.登入句柄   2.通道名称横坐标位置  3.通道名称纵坐标位置   4.显示的通道名称(视频右下角)，可以不需要
                        //console.log(devInfo.channelName+"======"+devInfo.lprDeviceType);
                        // var setOSD = document.getElementById("zktecoVideo").SetOSD(loginid, 600, 540, devInfo.channelName);
                        //console.log("initParkOcx setOSD == " + setOSD)
                    });
                }
            } catch (err) {
                console.log(err);
                $("#" + videoOcxName).html('<div class="zkVideoOcxTip">' +
                    '<p>' + I18n.getValue('park_preview_warn1') + '</p>' +
                    '<p>' + I18n.getValue('park_preview_warn2') + '</p>' +
                    '<a style="color:#7ac142" href="../activeX/LPRActive2100.exe">' + I18n.getValue('park_preview_warn3') + '</a>' +
                    '<p>' + I18n.getValue('park_preview_warn4') + '</p>' +
                    '<p>' + I18n.getValue('park_preview_warn6') + '</p>' +
                    '</div>');
                $(".chartPanel-video-item__video-box video").hide().end().find(".media-error-img").show();

            }
        } else {
            $("#" + videoOcxName).html('<div class="zkVideoOcxTip">' + I18n.getValue('park_preview_warn5') + '</div>');
        }
    }
}

/*获取设备信息并播放实时视频*/
function initOcxDeviceAndRealPlay() {
    $.ajax({
        url: serverURL + "/parkDevice.do?getOnlineByPavilioIpAddress",
        success: function (ret) {
            initParkOcx(ret.data, "video-item__one");
            // initParkOcx(ret.data);
            // initParkOcx(ret.data);
            // initParkOcx(ret.data);
        }
    })
}


// 设置当前时间
function setCurrentTime() {
    var date = null,
        curTimeStr = "";
    curTimer = setInterval(function () {
        date = new Date();
        curTimeStr = getCurrentTime(date);
        $(".time-bar").text(curTimeStr);
    }, 1000);
}