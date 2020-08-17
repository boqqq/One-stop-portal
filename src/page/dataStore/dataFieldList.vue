<template>
    <div>
        <div class="data-field-list">
            <i class="back-list-btn el-icon-error" @click="backList"></i>
            <el-table :data="dataFieldInfo" size="medium" stripe>
                <el-table-column label="序号" width="50" type="index"></el-table-column>
                <template v-for='(col,index) in dataFieldTitle'>
                    <el-table-column
                            :show-overflow-tooltip="true"
                            :prop="col.fieldVal"
                            :label="col.fieldName"
                            :key="col.fieldVal">
                    </el-table-column>
                </template>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name:'dataFieldList',
        data() {
            return {
                dataFieldInfo:[
                    {
                        infoItemEnName:'JCMC',
                        infoItemCnName:'界限名称',
                        dataItemType:'字符型C',
                        dataLenght:'50',
                        isMajorKey:'是',
                        isNull:'否',
                        openCondition:'无',
                    },
                    {
                        infoItemEnName:'JCMC',
                        infoItemCnName:'界限名称',
                        dataItemType:'字符型C',
                        dataLenght:'50',
                        isMajorKey:'是',
                        isNull:'否',
                        openCondition:'无',
                    },
                ],
                dataFieldTitle:[
                    {fieldVal:'infoItemEnName',fieldName:'信息项英文名称'},
                    {fieldVal:'infoItemCnName',fieldName:'信息项名称'},
                    {fieldVal:'dataItemType',fieldName:'数据项类型'},
                    {fieldVal:'dataLenght',fieldName:'数据长度'},
                    {fieldVal:'isMajorKey',fieldName:'是否主键'},
                    {fieldVal:'isNull',fieldName:'是否为空'},
                    {fieldVal:'openCondition',fieldName:'开放条件'}
                ]
            }
        },
        methods:{
            backList() {
                this.$emit('clickItem')
            }
        }

    }
</script>
<style lang="scss" scoped>
    .data-field-list {
        padding: 80px 30px 30px;
        background: rgba(0,100,255,.1);
        position: relative;
        .back-list-btn {
            position: absolute;
            z-index: 9;
            top:20px;
            right: 20px;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            display: block;
            color: #a2feff;
            font-size: 20px;
            cursor:pointer;
        }
        /deep/ .el-table, .el-table__expanded-cell {
            background: none;
        }
        /deep/ .el-table th, /deep/ .el-table tr {
            background: none;
        }
        /deep/ .el-table th {
            color: rgba(255,255,255,1);
            background: rgba(0,0,0,.2);
        }
        /deep/ .el-table td {
            color: rgba(255,255,255,.6);
        }
        /deep/ .el-table__header-wrapper {
            background:none;
        }
        /deep/ .el-table__row {
            background: none;
        }
        /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
            background: none;
        }
        /deep/ .el-table td,.building-top .el-table th.is-leaf {
            border:none;
            background: rgba(0,0,0,.05);
        }
        /deep/ .el-table th.is-leaf {
            border: none;
        }
        /deep/ .el-table__row--striped {
            background: rgba(0,0,0,.1) !important;
        }
        /deep/ .el-table::before{
            border:  none;
            height: 0px
        }
    }
</style>