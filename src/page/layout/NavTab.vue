<template>
    <div>
        <div class="nav-tab">
            <ul>
                <li :class="{'active': $route.name === tabs.name}" v-for="(tabs,index) in navTab">
                    <a @click="toggleTab(index)">{{tabs.title}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'NavTab',
        data() {
            return {
                navTab: [
                    {
                        title: '应用',
                        name:'applicationList',
                        path: '/applicationList'
                    },
                    {
                        title: '数据',
                        name:'dataList',
                        path: '/dataList'
                    },
                    {
                        title: '组件',
                        name:'componentList',
                        path: 'componentList'
                    },
                    {
                        title: '服务',
                        name:'serverApiList',
                        path: '/serverApiList'
                    },
                    {
                        title: '说明',
                        name:'instructionsContent',
                        path: '/instructionsContent'
                    }
                ]
            }
        },
        mounted() {
        },
        methods: {
            toggleTab(i) {
                this.$router.push(this.navTab[i].path)
            }
        },

    }
</script>
<style lang="scss" scoped>
    .nav-tab {
        border-bottom: 1px solid rgba(255, 255, 255, .2);
        padding: 10px 20px 0;
        margin: 10vh 0 10px;
        .active {
            > a {
                font-weight: 600;
                color: #68f1fe;
            }

            &:after {
                content: '';
                display: block;
                height: 3px;
                width: 20px;
                background: #a2feff;
                margin: 16px auto 0;
            }
        }
        ul:after {
            content: '';
            display: block;
            clear: both;
        }
        ul {
            > li {
                float: left;
                padding: 0 30px;
                font-size: 18px;
                font-weight: 400;
                > a {
                    color: #1c9abd;
                }
            }
        }
    }
</style>