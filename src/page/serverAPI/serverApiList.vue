<template>
    <div class="content-wrap">
        <ul class="server-api-list">
            <li v-for="(item,index) in serverApiData">
                <div class="server-api-card">
                    <div class="thumbnail"><p>{{item.ApiTitle.substr(0, 1)}}</p></div>
                    <div class="server-api-card-info">
                        <p class="title"><span>{{item.ApiVersion}}</span>{{item.ApiTitle}}</p>
                        <p class="permissions">{{item.ApiPremiss}}</p>
                        <el-rate :colors="serverRateColor" v-model="item.ApiRateVal" disabled></el-rate>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:'serverApiList',
        data() {
            return {
                serverRateColor: ['#99A9BF', '#F7BA2A', '#FF9900'],
                serverApiData:[
                    {
                        ApiTitle:'户籍人口增长及增长量',
                        ApiVersion:'v1.1.1',
                        ApiPremiss:'admin',
                        ApiRateVal:4.6
                    },
                    {
                        ApiTitle:'数据服务查询API',
                        ApiVersion:'v1.1.1',
                        ApiPremiss:'admin',
                        ApiRateVal:3.6
                    },
                    {
                        ApiTitle:'查询调度Mds',
                        ApiVersion:'v1.1.1',
                        ApiPremiss:'admin',
                        ApiRateVal:3.0
                    },
                    {
                        ApiTitle:'法人数据查询API',
                        ApiVersion:'v1.1.1',
                        ApiPremiss:'admin',
                        ApiRateVal:2.0
                    }
                ]

            }
        }
    }
</script>
<style lang="scss" scoped>
    $linearList :#00a2f9, #0082f9, #1d13e0, #120c8c, #3627f2;
    @mixin bg-color() {
        $random-color: random(length($linearList));
        background: nth($linearList, $random-color);
    }
    @for $i from 1 through 50 {
        .server-api-list>li:nth-child(#{$i}) {
        @for $l from 1 through 20 {
            .thumbnail:nth-child(#{$l}) {
            @include bg-color;
            }
        }
    }
    }


    .server-api-list {
        padding:30px 0;
        margin:0 -10px;
        transition: all .5s;
        &:after {
            display: block;
            content: '';
            clear: both;}
        >li {
            float: left;
        }
    }
    .server-api-card {
        width: 205px;
        border: 1px solid #2128aa;
        background: rgba(0,0,0,.1);
        margin: 0 10px 20px;
        position: relative;
        .thumbnail {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            position: relative;
            >p {
                position: absolute;
                top:0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 2;
                color: #fff;
                font-size: 100px;
                text-align: center;
                line-height: 200px;
            }
        }
    &-info {
        padding:20px 15px;
        .title {
            font-size: 15px;
            white-space: nowrap;
            color: #fff;
            overflow: hidden;
            line-height: 1em;
            margin: 0 0 15px;
            text-overflow: ellipsis;
            >span {
                float: right;
                font-size: 12px;
                color: rgba(255,255,255,.5);
            }
        }
        .permissions {
            font-size: 12px;
            color: #fff;
            overflow: hidden;
            line-height: 1em;
            margin: 0 0 15px;
            text-overflow: ellipsis;
        }
     }
    }
</style>