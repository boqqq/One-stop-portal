<template>
    <div id="layout">
        <div class="charts">
            <div class="titleBoxs" @click="goIndex">

            </div>
            <div class="titleBox">
                <div class="ind_title ind_left">
                    <p>
                        <span class="ind_data" style="width: 17vh;">{{date}}</span>&ensp;&ensp;
                        <span>{{weeks}}</span>&ensp;&ensp;
                        <span class="ind_data" style="min-width: 13vh;display: block">{{time}}</span>
                    </p>
                </div>
                <div class="ind_title ind_center" @click="routerLink(0)">
                    <p>{{title}}</p>
                    <p>{{title}}</p>
                </div>
                <div class="ind_title ind_right">
                    <div>管理员
                        <span>欢迎你!</span>
                    </div><!--<i class="el-icon-s-custom"></i>-->
                    <div>消息</div>
                    <!--<div>管理</div>-->
                    <div>个人中心</div>
                    <div></div>
                </div>
            </div>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>

<script>
    import '@/assets/elementui-theme/blue-#409EFF/index.css'
    import '@/assets/scss/main.scss'
    import '@static/css/reset.css';
    import '@static/css/main.css';
    import $ from 'jquery';

    export default {
        data() {
            return {
                date: '',
                weeks: '',
                time: '',
                nav: [
                    {title: '海南省大数据平台', path: '/index'},
                ],
                navIndex: 1,
                title: '海南省大数据平台',
                title1: 'Hainan Big Data Platform',
                isCollapse: false,
            }
        },
        components: {},
        mounted() {
            this.currentPage()
            var that = this;
            setInterval(function () {
                var date = new Date();
                var h = (date.getHours() > 9 ? date.getHours() : "0" + date.getHours());
                var m = (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());
                var s = (date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds());
                var month = (date.getMonth() + 1);
                month = month > 9 ? month : ('0' + month)
                var day = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())
                that.date = date.getFullYear() + '-' + month + '-' + day;
                that.weeks = '周' + "日一二三四五六".charAt(new Date().getDay());
                that.time = h + ':' + m + ':' + s;
                //alert(this.time)
            }, 1000);
        },
        methods: {
            routerLink(val) {
                this.navIndex = val
                this.$router.push(this.nav[val].path)
            },

            currentPage() {
                var s = 0
                for (let i = 0; i < this.nav.length; i++) {
                    if (this.nav[i].path == this.$route.path) {
                        this.navIndex = i;
                    }
                }
            },
            checkRouterLocal(path) {
                // 查找当前路由下标高亮
                this.navIndex = this.nav.findIndex(item => item.path === path);
                console.log(path, "path")
            },
            goIndex() {
                this.$router.replace({
                    name: 'index',
                });
            },
        },
        watch: {
            // "$route"() {
            //     let path = this.$route.path;
            //   alert(path)
            //     // 检索当前路径
            //     this.checkRouterLocal(path);
            // }
        },
    }
</script>

<style lang="scss" scoped>
    #layout {
        height: 100%;
        background-image: url('~@static/img/index/bg_20.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
    }

    .charts {
        user-select: none;
        overflow: auto;
        width: 100%;
        .titleBoxs {
            width: 70%;
            height: 8vh;
            position: fixed;
            margin: auto;
            left: 0;
            right: 0;
            z-index: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-repeat: no-repeat;
            background-size: 100% 105%;
            background-image: url('~@static/img/newIndex/title.png');
            cursor: pointer;
        }

        .titleBox {
            width: 100%;
            height: 7vh;
            position: fixed;
            top: 0;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #fff;
            font-size: 2vh;
            .ind_left {
                height: 5vh;
                margin-top: 1vh;
                line-height: 5vh;
                width: 30%;
                text-align: center;
                display: flex;
                p {
                    display: flex;
                    margin-left: auto;
                    margin-right: auto;
                    span {
                        text-shadow: 0 0 5px #5dfdfa, 0 0 15px #5dfdfa, 0 0 25px #5dfdfa;
                    }
                    .ind_data {
                        font-family: free_tfb !important;
                        letter-spacing: 0.3vh;
                        font-size: 2.5vh;
                    }
                }
            }
            .ind_center {
                text-align: center;
                font-size: 4vh;
                font-weight: bold;
                width: 40%;

                letter-spacing: 9px;
                line-height: 7vh;
                color: #B6ECF9;
                p {
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }
                p:nth-child(1) {
                    text-shadow: 3px 3px 3px #000002;
                }
                p:nth-child(2) {
                    text-shadow: 0 0 5px #005bff, 0 0 15px #005bff, 0 0 25px #005bff;
                }
            }
            .ind_right {
                margin-right: 5vh;
                display: flex;
                font-size: 1.68vh;
                text-align: center;
                z-index: 10;
                margin-top: 1vh;
                height: 5vh;
                line-height: 5.2vh;
                font-weight: 500;
                div {
                    cursor: pointer;
                }
                div:nth-child(1) {
                    line-height: 5vh;
                    font-weight: bold;
                    font-size: 2.23vh;
                    span {
                        font-size: 1.68vh;
                        font-weight: 500;
                        margin-left: 1.5vh;
                    }
                }
                div:nth-child(2) {
                    margin-left: 5vh;
                }
                div:nth-child(3) {
                    margin-left: 5vh;
                }
                div:nth-child(4) {
                    width: 2.5vh;
                    height: 2.5vh;
                    margin: auto;
                    margin-left: 5vh;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    background-image: url('~@static/img/index/close-icon.png');
                }
            }
        }
    }

</style>