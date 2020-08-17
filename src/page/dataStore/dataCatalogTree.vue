<template>
    <div>
        <div class="catalog-tree-item">
            <div class="catalog-tree-item-info">
                <i class="el-icon-caret-right" :class="{'is-open-icon': dataCatalog.open == true}" @click="clickItem()" v-if="dataCatalog.children"></i>
                <span class="name" @click="getItemData()">{{dataCatalog.name}}</span>
                <span class="count">({{dataCatalog.count}})</span>
            </div>
            <DataCatalogTree
                    @getItemData="getItemData"
                    v-for="(item,index) in dataCatalog.children"
                    :dataCatalog="item"
                    :class="{'is-open': dataCatalog.open == true }"
                    class="fold-tree">
            </DataCatalogTree>
        </div>
    </div>
</template>
<script>
    import DataCatalogTree from './dataCatalogTree'
    export default {
        components: {
            DataCatalogTree
        },
        name: 'DataCatalogTree',
        props:{
            dataCatalog:{
                type: Object,
                required: true
            }
        },
        data() {
            return {
            }
        },
        mounted() {
            console.log(this.dataCatalog)
        },
        methods:{
            getItemData() {
                console.log(this.dataCatalog.name)
            },
            clickItem() {
                console.log(this.dataCatalog.name)
                this.dataCatalog.open = !this.dataCatalog.open
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
</style>