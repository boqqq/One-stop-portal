<template>
    <div class="content-wrap">
        <div class="component-list">
            <ul class="component-list-row">
                <li class="component-list-col" v-for="(item,index) in componentInfoData">
                    <div class="component-edition">
                        <h3>{{item.title}}</h3>
                        <p>{{item.versionNum}}</p>
                    </div>
                    <div class="component-info">
                        <p>{{item.info}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'componentList',
        data() {
            return {
                componentInfoData:[
                    {
                        title:'spark',
                        versionNum:'v2.9.0',
                        info:'Apache Spark™ is a unified analytics engine for large-scale data processing.'
                    },
                    {
                        title:'mpp',
                        versionNum:'v2.3.7 ',
                        info:'Massively parallel processing (MPP) is a form of collaborative processing of the same program by two or more processors. Each processor handles different threads of the program, and each processor itself has its own operating system and dedicated memory. A messaging interface is required to allow the different processors involved in the MPP to arrange thread handling. Sometimes, an application may be handled by thousands of processors working collaboratively on the application.'
                    },
                    {
                        title:'hive',
                        versionNum:'v2.9.0',
                        info:'The Apache Hive ™ data warehouse software facilitates reading, writing, and managing large datasets residing in distributed storage using SQL. Structure can be projected onto data already in storage. A command line tool and JDBC driver are provided to connect users to Hive.'
                    }
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
    .component-list {
        width: 100%;
        padding: 60px 0;
        position:relative;
        &-row {
            margin: auto;
            width: 70%;
        }
        &-col {
            margin: 0 0 30px;
            background: rgba(100,100,255,.1);
            padding:30px 60px;
            &:after {
                content: '';
                display: block;
                clear: both;
            }
            .component-edition {
                float: left;
                width: 20%;
                >h3 {
                    font-size: 30px;
                    color: #fff;
                    margin: 0 0 20px;
                    font-weight: 600;
                }
                >p {
                    font-size: 12px;
                    color: rgba(255,255,255,.5);
                }
            }
            .component-info {
                margin-left: 20%;
                padding:0 20px;
                >p {
                    color: rgba(255,255,255,.8);
                    font-size: 14px;
                    line-height: 2em;
                }
            }
        }
    }
</style>