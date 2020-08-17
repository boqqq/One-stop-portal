<template>
    <div class="content-wrap">
        <div>
            <el-row :gutter="80">
                <el-col :span="6">
                    <div class="ins-sidebar">
                        <div class="ins-sidebar-col">
                            <p class="ins-sidebar-col-title">
                                <i class="el-icon-caret-right"></i>
                                <span>租户申请流程</span>
                            </p>
                        </div>
                        <div class="ins-sidebar-col">
                            <p class="ins-sidebar-col-title">
                                <i class="el-icon-caret-right"></i>
                                <span>资源申请流程</span>
                            </p>
                        </div>
                        <div class="ins-sidebar-col">
                            <p class="ins-sidebar-col-title">
                                <i class="el-icon-caret-right"></i>
                                <span>客户端安装步骤</span>
                            </p>
                            <div class="ins-sidebar-col-child">
                                <ul>
                                    <li>spark客户端</li>
                                    <li>hive客户端</li>
                                    <li>mmp客户端</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="ins-content">
                        <h2>租户申请流程</h2>
                        <h3>流程介绍</h3>
                        <p>1）填写《租户申请单》</p>
                        <p>2）填写 《租户服务器申请单》</p>
                        <p>3）线下收到反馈，部署客户端，开通账号</p>
                        <p>4）通知租户可以开始使用</p>
                        <el-row class="ins-btn-row">
                            <h4>表单下载</h4>
                            <el-button type="danger">租户申请单</el-button>
                            <el-button type="primary">租户服务器申请单</el-button>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name:'instructionsContent'
    }
</script>
<style lang="scss" scoped>
    .ins-sidebar {
        padding: 20px;
        background: rgba(0,100,255,.1);
        &-col {
            margin: 20px 0;
            background: rgba(255,255,255,.05);
            &-title {
                background: rgba(255,255,255,.05);
                padding: 10px;
                line-height: .9em;
                color: #68f1fe;
                >span {
                    font-size: 15px;
                }
                >i {
                }
            }
            &-child {
                padding: 10px 42px;
                li {
                    color: #68f1fe;
                    font-size: 14px;
                    margin: 15px 0;
                }
            }
        }
    }
    .ins-content {
        padding: 10px 50px 100px;
        background: url("~@static/img/instructions-figure.png") no-repeat right bottom;
        position: relative;
        h2 {
            font-size: 30px;
            margin: 2em 0;
            color: #fff;
        }
        h3 {
            font-size: 24px;
            margin: 2em 0;
            color: #fff;
        }
        p {
            font-size: 15px;
            color: #fff;
            line-height: 1em;
            margin: 0 0 2em;
        }
    }
    .ins-btn-row {
        margin: 30px 0;
        padding: 10px 0;
        h4 {
            font-size: 18px;
            margin: 2em 0;
            color: #fff;
        }
        >button {
            height: 68px;
            width: 280px;
            font-size: 16px;
            color: #fff;
        }
    }
</style>