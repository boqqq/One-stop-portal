<template>
    <div class="content-wrap">
        <div v-if="showDataList">
            <el-row :gutter="80">
                <el-col :span="6">
                    <div class="catalog-tree">
                        <div>
                            <h3 class="catalog-tree-title">本省数据</h3>
                            <div class="catalog-tree-body">
                                <div v-for="(items,index) in dataCatalog" :key="index">
                                    <div class="catalog-tree-item">
                                        <div class="catalog-tree-item-info">
                                            <i class="el-icon-caret-right" :class="{'is-open-icon': items.open == true}" @click="clickItem(index)" v-if="items.children.length>0"></i>
                                            <span class="name" @click="getItemData(index)">{{items.name}}</span>
                                            <span class="count">({{items.count}})</span>
                                        </div>
                                        <DataCatalogTree
                                                @getItemData="getItemData"
                                                :dataCatalog="item"
                                                v-for="(item,ind) in items.children"
                                                :class="{'is-open': items.open == true }"
                                                class="fold-tree">
                                        </DataCatalogTree>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div>
                        <div class="query-module">
                            <button>查询</button>
                            <input type="text" placeholder="请输入内容" v-model="queryInput">
                        </div>
                    </div>
                    <div>
                        <el-row :gutter="20">
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                                <div class="date-table-col" @click="goFieldList()">
                                    <dl>
                                        <dt>表名</dt>
                                        <dd>h99_xxx</dd>
                                    </dl>
                                    <dl>
                                        <dt>中文表名</dt>
                                        <dd>人员信息</dd>
                                    </dl>
                                    <dl>
                                        <dt>时效</dt>
                                        <dd>T+1</dd>
                                    </dl>
                                    <dl>
                                        <dt>所属部门</dt>
                                        <dd>民政局</dd>
                                    </dl>
                                    <dl>
                                        <dt>更新日期</dt>
                                        <dd>2020-03-30 23:00:00</dd>
                                    </dl>
                                    <dl>
                                        <dt>数据量</dt>
                                        <dd>888</dd>
                                    </dl>
                                </div>
                            </el-col>
                        </el-row>
                        <el-pagination
                                background
                                class="pagination"
                                layout="prev, pager, next"
                                :total="200">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="!showDataList">
            <DataFieldList @clickItem="goFieldList"></DataFieldList>
        </div>
    </div>
</template>
<script>
    import DataCatalogTree from './dataCatalogTree'
    import DataFieldList from './dataFieldList'
    export default {
        name: 'NavTab',
        components:{
            DataCatalogTree,
            DataFieldList
        },
        data() {
            return {
                showDataList:true,
                queryInput:'',
                dataCatalog:[
                    {
                        name:'基础',
                        count:'1999',
                        open: false,
                        children:[
                            {
                                name:'人口1',
                                count:'200',
                                open: false,
                                children:[
                                    {
                                        name:'11111',
                                        count:'200',
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        name:'部门',
                        count:'198',
                        children:[]
                    },
                    {
                        name:'基础',
                        count:'1999',
                        open: false,
                        children:[
                            {
                                name:'人口2',
                                count:'200',
                                open: false,
                                children:[
                                    {
                                        name:'11112',
                                        count:'200',
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        name:'基础',
                        count:'1999',
                        open: false,
                        children:[
                            {
                                name:'人口3',
                                count:'200',
                                open: false,
                                children:[
                                    {
                                        name:'11113',
                                        count:'200',
                                    }
                                ]
                            },
                        ]
                    },
                ],
            }
        },
        methods:{
            clickItem(i) {
                this.dataCatalog[i].open = !this.dataCatalog[i].open
            },
            goFieldList(id) {
                this.showDataList = !this.showDataList
            },
            getItemData(i) {
                console.log(this.dataCatalog[i].name)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .is-open {
        display: block !important;
    }
    .fold-tree {
        display: none;
    }
    .is-open-icon {
        transform:rotate(90deg);
        transition: all .3s;
    }
    .catalog-tree {
        padding: 20px;
        background: rgba(0,100,255,.08);
        &-title {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        margin: 10px;
         }
    }
    .catalog-tree-body {
        background: rgba(0,100,255,.1);
        padding: 10px 0;
        margin: 0 0 20px;
    }
    .catalog-tree-item {
        position: relative;
        margin: 16px;
        &-info {
            cursor: pointer;
        }
        i {
            color: #68f1fe;
            font-size: 15px;
            position: absolute;
            z-index: 9;
            left:0;
            top: 4px;
            transition: all .3s;
        }
        .name {
            margin: 0 3px 0 20px;
            font-size: 14px;
            color: #68f1fe;
            line-height: 1em;
        }
        .count {
            color: #68f1fe;
            font-size: 12px;
            opacity: .5;
        }
    }
    .date-table-col {
        background: rgba(0,100,255,.1);
        margin: 0 0 20px;
        cursor:pointer;
        padding: 36px;
        >dl {
            font-size:14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin:10px 0;
            >dt {
                color: rgba(255,255,255,.5);
                width: 6em;
                float: left;
            }
            >dd {
                color: #fff;
                margin-left: 7em;
            }
    }
    }
    .pagination {
        margin: 50px 0;
        float: right;
    }
    .query-module {
        background: rgba(0,0,100,.5);
        border: 1px solid #0003b9;
        height: 50px;
        max-width: 800px;
        margin: 0 0 50px;
        >input[type="text"] {
            background: none;
            border: none;
            width: calc(80% - 45px);
            padding: 0 20px;
            height: 100%;
            color: #fff;
            &::-webkit-input-placeholder {
                color: rgba(100,255,255,.5);
            }
            &:-moz-placeholder {
                color: rgba(100,255,255,.5);
            }
            &::-moz-placeholder {
                color: rgba(100,255,255,.5);
            }
            &:-ms-input-placeholder {
                color: rgba(100,255,255,.5);
            }
        }
        >button {
            float: right;
            border: none;
            outline: none;
            height: 100%;
            width: 20%;
            background: #01009d;
            font-size: 16px;
            color: #a2feff;
            padding: 0;
            cursor: pointer;
        }
    }
</style>