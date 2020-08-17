<template>
    <div class="content-wrap">
        <div class="app-tabs">
            <ul>
                <li :class="{'app-tabs-active': tabsActive == index}" v-for="(item,index) in appTabs" @click="switchAppTabs(index)">
                    {{item.title}}
                </li>
            </ul>
        </div>
        <div class="app-list-wrap">
            <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="app-list-col" v-for="(item,index) in appList">
                    <div class="app-list-item">
                        <div class="app-list-name">
                            <h3>{{item.name}}</h3>
                        </div>
                        <div class="app-list-foot">
                                <p @click="accessPart(index)"><i class="el-icon-paperclip"></i><span>访问</span></p>
                                <p @click="accessManual(index)"><i class="el-icon-s-management"></i><span>操作手册</span></p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'applicationList',
        data() {
            return {
                tabsActive: 0,
                appTabs: [
                    {title: '数据资产'},
                    {title: '数据分析'},
                    {title: '数据服务'},
                    {title: '其他'},
                ],
                appList:[
                    {name: '元数据管理'},
                    {name: '数据标准'},
                    {name: '数据质量'},
                    {name: '数据模型'},
                    {name: 'SLOG'},
                    {name: 'SMG'},
                    {name: '数据安全'},
                    {name: '大数据安全'}],
            }
        },
        methods:{
            switchAppTabs(i) {
                this.tabsActive = i
            },
            accessPart(i) {
                console.log(i)
            },
            accessManual(i) {
                console.log(i)
            },
        }
    }
</script>
<style lang="scss" scoped>
    $linearGradient1: linear-gradient(-30deg,#93a5cf,#b4ece9);
    $linearGradient2: linear-gradient(-30deg,#46aef7,#1dd5e6);
    $linearGradient3: linear-gradient(-30deg,#ff748d,#ff7daf);
    $linearGradient4: linear-gradient(-30deg,#6717cd,#2871fa);
    $linearGradient5: linear-gradient(-30deg,#ff9ca0,#fecfee);
    $linearList :$linearGradient1, $linearGradient2, $linearGradient3, $linearGradient4, $linearGradient5;
    @mixin bg-color() {
        $random-color: random(length($linearList));
        background: nth($linearList, $random-color);
    }
    @for $i from 1 through 50 {
        .app-list-col:nth-child(#{$i}) {
        @for $l from 1 through 20 {
            .app-list-name:nth-child(#{$l}) {
            @include bg-color;
            }
        }
    }
    }

    .app-tabs {
        margin: 10px 0 36px;
        text-align: center;

    li {
        display: inline-block;
        padding: 10px 20px;
        color: #68f1fe;
        font-size: 15px;
        border-radius: 3px;
        line-height: 1em;
        cursor: pointer;
    }

    .app-tabs-active {
        background: rgba(104, 241, 254, .1);
    }

    }
    .app-list-wrap {
        padding: 30px;
    .el-col {
        transition:all .5s;
    }

    .app-list-item {
        margin: 0 20px 60px;
        border: 1px solid #0f129a;
        background:rgba(0,0,0,.1);
        .app-list-name {
            height:160px;
            line-height:160px;
            >h3 {
                font-size: 28px;
                font-weight: 600;
                color: #fff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
            }
        }
        .app-list-foot {
            padding:20px;
            >p {
                cursor: pointer;
                font-size: 14px;
                color: #fff;
                >i {
                    font-size: 18px;
                    margin: 0 10px 0 0;
                    vertical-align: middle;
                }
            }
            p:nth-child(1) {
                float: right;
            }
        }
    }

    }
</style>