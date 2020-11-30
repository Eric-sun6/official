<template>
    <div class="content">
        <Header></Header>
        <div class="tableWrap">
            <div class="searchWrap">
                <input
                    :value="valueInput"
                    type="text"
                    @input="typeIn"
                    class="searchInput"
                    placeholder="请输入提单号"
                    maxlength="40"
                >
                <button class="searchBtn" @click="searchInThisPage">查询</button>
            </div>
            <div class="searchHistory">
                <div class="historyWrap">
                    <div class="historyContent">
                        <span class="historyTitile">历史查询：</span>
                        <span
                            v-if="hisTotyRecords.length !=0"
                            v-for="(item ,index) in hisTotyRecords"
                            :key="index"
                            @click="choseToSearch(item)"
                        >{{item}}</span>
                    </div>
                </div>
            </div>
            <div v-if="showError" class="error">
                <img class="errorImg" src="~assets/img/02_wlzz01.png" alt="">
                <div>
                    <h3>未查询到相关信息</h3>
                    <h5>请确认信息或稍后查询</h5>
                </div>
            </div>
            <div class="empty" v-if="showEmpty">
                <img class="errorImg" src="~assets/img/02_wlzz01.png" alt="">
                <div>
                    <h3>暂无数据&nbsp; 空空如也</h3>
                    <h5>即刻查询 及时掌握箱货信息</h5>
                </div>
            </div>
            <div class="react" v-if="showDataPage && dataInfo">
                <div class="leftContent">
                    <div class="orderCale">
                        <p class="orderTime">
                            <span class="orderNum">提单号：{{!hasData?'---':defaultOrder}}</span>
                            <i class="updataTime">更新于 {{dataInfo.updateTime}}</i>
                        </p>
                        <div class="portInfo">
                            <div class="start">
                                <span class="port">{{!hasData?'---':dataInfo && dataInfo.fromPort}}</span>
                                <span class="portTime">离港时间</span>
                                <span
                                    class="startTime"
                                >{{!hasData?'---':(dataInfo && dataInfo.dep_time) |formatDate}}{{dataInfo.pre_dep_time_status}}</span>
                            </div>
                            <div class="middleInfo">
                                <div class="dayTrans">
                                    <img class="firstDot" src="~assets/img/02_wlzz02.png" alt="">
                                    <i class="days">{{transferDays}}天</i>
                                    <i class="trans">{{dataInfo && dataInfo.transship}}</i>
                                    <img class="secDot" src="~assets/img/02_wlzz02.png" alt="">
                                </div>
                            </div>
                            <div class="end">
                                <span class="port">{{!hasData? '---':dataInfo && dataInfo.toPort}}</span>
                                <span class="portTime">到港时间</span>
                                <span
                                    class="startTime"
                                >{{!hasData?'---':dataInfo && dataInfo.arr_time |formatDate}}{{dataInfo.pre_arr_time_status}}</span>
                            </div>
                        </div>
                        <div class="containerInfo">
                            <div class="transPort seeWrap">
                                <div class="transLeft">
                                    <div
                                        class="transLeftSee"
                                        v-if="(dataInfo.transfer &&  dataInfo.transfer.length!=0) || dataInfo.affiliation &&  dataInfo.affiliation.length!=0"
                                    >
                                        <div class="hoverWrap" @mouseleave="closePortDetail">
                                            <i
                                                @mouseenter="seePortDetail"
                                                v-if="(dataInfo && dataInfo.transfer &&  dataInfo.transfer.length!=0) ||(dataInfo.affiliation &&  dataInfo.affiliation.length!=0)"
                                            >查看</i>
                                            <div
                                                v-show="showDetailTransPort"
                                                class="detailTransPort"
                                            >
                                                <sub class="topArrow"></sub>
                                                <div class="portContentWrap">
                                                    <div
                                                        v-if="dataInfo && dataInfo.transfer &&  dataInfo.transfer.length!=0"
                                                    >
                                                        <div
                                                            class="oneport"
                                                            v-for="(item,index) in dataInfo.transfer"
                                                            :key="index"
                                                        >
                                                            <h4>{{item.re_port_name}}(中转港)</h4>
                                                            <p
                                                                class="transCalcInfo"
                                                            >到港时间 : {{item.re_arr_time | formatDate}}{{item.pre_arr_time_status}}</p>
                                                            <p
                                                                class="transCalcInfo"
                                                            >离港时间 : {{item.re_dep_time | formatDate}}{{item.pre_dep_time_status}}</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        v-if="dataInfo && dataInfo.affiliation &&  dataInfo.affiliation.length!=0"
                                                    >
                                                        <div
                                                            class="oneport"
                                                            v-for="(item,index) in dataInfo.affiliation "
                                                            :key="index"
                                                        >
                                                            <h4>{{item.re_port_name}}(挂靠港)</h4>
                                                            <p
                                                                class="transCalcInfo"
                                                            >到港时间 : {{item.re_arr_time | formatDate}}{{item.pre_arr_time_status}}</p>
                                                            <p
                                                                class="transCalcInfo"
                                                            >离港时间 : {{item.re_dep_time | formatDate}}{{item.pre_dep_time_status}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        <span>中转/挂靠：</span>
                                        <span>{{!hasData?'---':`${dataInfo && dataInfo.transfer && dataInfo.transfer.length}/${dataInfo && dataInfo.affiliation && dataInfo.affiliation.length}`}}</span>
                                    </p>
                                    <p>
                                        <span class="letter">箱型箱量：</span>
                                        <span>{{!hasData?'---': dataInfo && dataInfo.cntr_vol}}</span>
                                    </p>
                                </div>
                                <div class="transRight">
                                    <p
                                        class="li"
                                        v-for="(item,index) in dataInfo.course"
                                        :key="index"
                                        v-if="item.re_vessel_name || item.re_voy"
                                    >
                                        <b>{{index==0 ?'头程：': ''}}{{index==1 ?'二程：': ''}}{{index==2 ?'三程：': ''}}</b>
                                        <span>{{!hasData?'---':item.re_vessel_name}}{{`(${item.re_voy})`}}</span>
                                    </p>
                                </div>
                                <!-- <div
                                    class="courseWrap"
                                    v-if="dataInfo.course && dataInfo.course.length !=0"
                                >

                                </div>-->
                            </div>
                        </div>
                    </div>
                    <div class="tableContent">
                        <div class="ifAddriveInfo">
                            <h2>运抵报告</h2>
                            <p>
                                <span>运抵报告状态：{{!hasData?'---':dataInfo && dataInfo.arrival_report}}</span>
                                <span>运抵报告时间：{{!hasData?'---':dataInfo && dataInfo.arrival_report_time | formatDate}}</span>
                            </p>
                        </div>
                        <div class="tableChoose">
                            <h2>集装箱详细信息</h2>
                            <div class="choose">
                                <el-dropdown trigger="click" @command="handleCommand">
                                    <span class="dropDownText el-dropdown-link">
                                        <!-- TCLU6662595 -->
                                        {{orderChoosed}}
                                        <i
                                            class="arrow el-icon-arrow-down el-icon-caret-bottom"
                                        ></i>
                                    </span>
                                    <!-- <div class="dropDownSelf">
                                    <p
                                        bindtap="tapDropdown"
                                        v-for="(item,index) in orderArr"
                                        :data-text="`${item}`"
                                        :key="index"
                                    >{{item}}</p>
                                    </div>-->
                                    <el-dropdown-menu
                                        v-if="orderArr.length !=0"
                                        slot="dropdown"
                                        style="top:597px;"
                                    >
                                        <el-dropdown-item
                                            v-for="(item,index) in orderArr"
                                            :command="`${item}`"
                                            :key="index"
                                        >{{item}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <div class="tableDetailWrap">
                            <div class="detailContent">
                                <div class="oneRowUni">
                                    <p>
                                        <span>箱号</span>
                                        <i>{{orderChoosed}}</i>
                                    </p>
                                    <p>
                                        <span class="">铅封号</span>
                                        <i></i>
                                    </p>
                                    <p>
                                        <span>箱型</span>
                                        <i></i>
                                    </p>
                                </div>
                                <div class="oneRowUni">
                                    <p>
                                        <span>箱皮重</span>
                                        <i></i>
                                    </p>
                                    <p>
                                        <span>箱货量</span>
                                        <i></i>
                                    </p>
                                    <p>
                                        <span>场箱位</span>
                                        <i></i>
                                    </p>
                                </div>
                                <div class="oneRowUni">
                                    <p>
                                        <span>装货港</span>
                                        <i>{{dataInfo && dataInfo.port_lading}}</i>
                                    </p>
                                    <p>
                                        <span>卸货港</span>
                                        <i>{{dataInfo && dataInfo.port_discharge}}</i>
                                    </p>
                                    <p>
                                        <span>目的港</span>
                                        <i>{{dataInfo && dataInfo.destination}}</i>
                                    </p>
                                </div>
                                <div class="oneRowUni">
                                    <p>
                                        <span>进场时间</span>
                                        <i>{{!hasData?'---':this.inTime | formatDate}}</i>
                                    </p>
                                    <p>
                                        <span>进场方式</span>
                                        <i></i>
                                    </p>
                                    <p>
                                        <span>运抵报文时间</span>
                                        <i>{{!hasData?'---':dataInfo && dataInfo.arrival_report_time | formatDate}}</i>
                                    </p>
                                </div>
                                <div class="oneRowUni">
                                    <p>
                                        <span>出场时间</span>
                                        <i>{{!hasData?'---':this.outTime | formatDate}}</i>
                                    </p>
                                    <p>
                                        <span>出场方式</span>
                                        <i></i>
                                    </p>
                                    <p>
                                        <span>码头</span>
                                        <i></i>
                                    </p>
                                </div>
                                <div class="oneRowUni">
                                    <p>
                                        <span>海关放行</span>
                                        <i>{{dataInfo.customs_clearance && dataInfo.customs_clearance.re_customs_time | formatDate}}{{dataInfo.customs_clearance && dataInfo.customs_clearance.re_customs_type=='Y'?'已放行':''}}</i>
                                    </p>
                                    <p>
                                        <span>收到海放时间</span>
                                        <i></i>
                                    </p>
                                    <p>
                                        <span>海事放行异常</span>
                                        <i></i>
                                    </p>
                                </div>
                                <div class="oneRowUni">
                                    <p>
                                        <span>码头放行</span>
                                        <i>{{dataInfo && dataInfo.wharf_release && dataInfo.wharf_release.re_wharf_type=='Y'?'已放行': ''}}</i>
                                    </p>
                                    <p>
                                        <span>码头配载</span>
                                        <i>{{dataInfo && dataInfo.wharf_stowage && dataInfo.wharf_stowage.re_load_time |formatDate}}{{dataInfo && dataInfo.wharf_stowage && dataInfo.wharf_stowage.re_path_type=='Y'?'已配载':''}}</i>
                                    </p>
                                    <p>
                                        <span>状态</span>
                                        <i></i>
                                    </p>
                                </div>
                                <div class="oneRowUni">
                                    <p>
                                        <span>船名航次</span>
                                        <i class="specialWordWrap">
                                            <b
                                                class="specialWord"
                                            >{{!hasData?'---':dataInfo.course && dataInfo.course[0] &&dataInfo.course[0].re_vessel_name}}{{dataInfo.course && dataInfo.course[0] &&dataInfo.course[0].re_voy ?`(${dataInfo.course && dataInfo.course[0] &&dataInfo.course[0].re_voy})`:''}}</b>
                                        </i>
                                    </p>
                                    <p>
                                        <span>持箱人</span>
                                        <i></i>
                                    </p>
                                    <p>
                                        <span>海铁联运</span>
                                        <i></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 业务状态 -->
                <div class="businessStatus">
                    <h1>业务状态</h1>
                    <div class="businessOneStatus">
                        <div class="wrapStatus">
                            <span
                                :class="['blueHr',{'notActive':!(dataInfo.empty_container && dataInfo.empty_container.status)}]"
                            ></span>
                            <span
                                v-if="!(dataInfo.arrival_loaded_containers && dataInfo.arrival_loaded_containers.status)"
                                class="grayHr"
                            ></span>
                            <img
                                class="special statusDot trueStatus"
                                src="~assets/img/02_wlzz04.png"
                                alt=""
                                v-if="dataInfo.empty_container && dataInfo.empty_container.status"
                            >
                            <img
                                class="special statusDot falseStatus"
                                src="~assets/img/02_wlzz07.png"
                                alt=""
                                v-else
                            >
                            <p class="statusName">提空箱</p>
                            <p
                                class="statusCale"
                            >提空箱时间： {{dataInfo.empty_container && dataInfo.empty_container.time | formatDate}}</p>
                        </div>
                    </div>
                    <div class="businessOneStatus">
                        <div class="wrapStatus">
                            <span
                                :class="['blueHr',{'notActive':!(dataInfo && dataInfo.arrival_loaded_containers && dataInfo.arrival_loaded_containers.status)}]"
                            ></span>
                            <span
                                v-if="!(dataInfo.customs_clearance && dataInfo.customs_clearance.status)"
                                class="grayHr"
                            ></span>
                            <img
                                class="statusDot trueStatus"
                                src="~assets/img/02_wlzz05.png"
                                alt=""
                                v-if="dataInfo && dataInfo.arrival_loaded_containers && dataInfo.arrival_loaded_containers.status"
                            >
                            <img
                                class="statusDot falseStatus"
                                src="~assets/img/02_wlzz06.png"
                                alt=""
                                v-else
                            >
                            <div class="statusName containerIn seeWrap">重箱进港
                                <div class="arrivalLoadedContainerSee" @mouseleave="closeSmothing">
                                    <div @mouseleave="closeSmothing" class="seeSomthingWrap">
                                        <sup
                                            @mouseenter="seeSomthing"
                                            v-if="dataInfo.arrival_loaded_containers && dataInfo.arrival_loaded_containers.containers.length !=0 "
                                        >查看</sup>
                                        <div class="somthingInHover" v-show="showContainerIn">
                                            <div
                                                class="somthingInItem somthingInItemIn"
                                                v-for="(item,index) in dataInfo.arrival_loaded_containers && dataInfo.arrival_loaded_containers.containers"
                                                :key="index"
                                            >
                                                <sub class="topArrowSee"></sub>
                                                <b>{{item.cntr_num}}</b>
                                                <i>{{item.full_in_time | formatDate}}</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p
                                class="statusCale"
                            >已进场/总箱量： {{`${dataInfo.arrival_loaded_containers && dataInfo.arrival_loaded_containers.containers.length}/${dataInfo && dataInfo.arrival_loaded_containers.cntr_vol}`}}</p>
                        </div>
                    </div>
                    <div class="businessOneStatus">
                        <div class="wrapStatus">
                            <span
                                :class="['blueHr',{'notActive':!(dataInfo.customs_clearance && dataInfo.customs_clearance.status)}]"
                            ></span>
                            <span
                                class="grayHr"
                                v-if="!(dataInfo && dataInfo.wharf_release && dataInfo.wharf_release.status)"
                            ></span>
                            <img
                                class="statusDot trueStatus"
                                src="~assets/img/02_wlzz05.png"
                                alt=""
                                v-if="dataInfo && dataInfo.customs_clearance.status"
                            >
                            <img
                                class="statusDot falseStatus"
                                src="~assets/img/02_wlzz06.png"
                                alt=""
                                v-else
                            >
                            <p class="statusName">海关放行</p>
                            <p
                                class="statusCale"
                            >海放时间： {{dataInfo && dataInfo.customs_clearance.re_customs_time | formatDate}}</p>
                        </div>
                    </div>
                    <div class="businessOneStatus">
                        <div class="wrapStatus">
                            <span
                                :class="['blueHr',{'notActive':!(dataInfo && dataInfo.wharf_release && dataInfo.wharf_release.status)}]"
                            ></span>
                            <span
                                class="grayHr"
                                v-if="!(dataInfo && dataInfo.wharf_stowage && dataInfo.wharf_stowage.status)"
                            ></span>
                            <img
                                class="statusDot trueStatus"
                                src="~assets/img/02_wlzz05.png"
                                alt=""
                                v-if="dataInfo && dataInfo.wharf_release && dataInfo.wharf_release.status"
                            >
                            <img
                                class="statusDot falseStatus"
                                src="~assets/img/02_wlzz06.png"
                                alt=""
                                v-else
                            >
                            <p class="statusName">码头放行</p>
                            <p
                                class="statusCale"
                            >码头放行状态： {{dataInfo && dataInfo.wharf_release && dataInfo.wharf_release.re_wharf_type=='Y'?'已放行': ''}}</p>
                        </div>
                    </div>
                    <div class="businessOneStatus">
                        <div class="wrapStatus">
                            <span
                                :class="['blueHr',{'notActive':!(dataInfo && dataInfo.wharf_stowage && dataInfo.wharf_stowage.status)}]"
                            ></span>
                            <span class="grayHr" v-if="!(dataInfo.sail && dataInfo.sail.status)"></span>
                            <img
                                class="statusDot trueStatus"
                                src="~assets/img/02_wlzz05.png"
                                alt=""
                                v-if="dataInfo && dataInfo.wharf_stowage && dataInfo.wharf_stowage.status"
                            >
                            <img
                                class="statusDot falseStatus"
                                src="~assets/img/02_wlzz06.png"
                                alt=""
                                v-else
                            >
                            <p class="statusName">码头配载</p>
                            <p
                                class="statusCale"
                            >码头配载时间： {{dataInfo && dataInfo.wharf_stowage && dataInfo.wharf_stowage.re_load_time |formatDate}}</p>
                        </div>
                    </div>
                    <div class="businessOneStatus">
                        <div class="wrapStatus">
                            <span
                                :class="['blueHr',{'notActive':!(dataInfo && dataInfo.sail && dataInfo.sail.status)}]"
                            ></span>
                            <span
                                class="grayHr"
                                v-if="!(dataInfo && dataInfo.arrival &&dataInfo.arrival.status)"
                            ></span>
                            <img
                                class="statusDot trueStatus"
                                src="~assets/img/02_wlzz05.png"
                                alt=""
                                v-if="dataInfo && dataInfo.sail && dataInfo.sail.status"
                            >
                            <img
                                class="statusDot falseStatus"
                                src="~assets/img/02_wlzz06.png"
                                alt=""
                                v-else
                            >
                            <p class="statusName">开航</p>
                            <p
                                class="statusCale"
                            >离港时间：{{dataInfo.sail && dataInfo.sail.dep_time | formatDate}} {{dataInfo.sail && dataInfo.sail.pre_dep_time_status}}</p>
                        </div>
                    </div>
                    <div class="businessOneStatus">
                        <div class="wrapStatus">
                            <span
                                :class="['blueHr specialBlueHr',{'notActive':!(dataInfo && dataInfo.arrival &&dataInfo.arrival.status)}]"
                            ></span>
                            <span class="grayHr" v-if="!(dataInfo && dataInfo.re_container.status)"></span>
                            <img
                                class="statusDot trueStatus"
                                src="~assets/img/02_wlzz05.png"
                                alt=""
                                v-if="dataInfo && dataInfo.arrival &&dataInfo.arrival.status"
                            >
                            <img
                                class="statusDot falseStatus"
                                src="~assets/img/02_wlzz06.png"
                                alt=""
                                v-else
                            >
                            <p class="statusName">抵港</p>
                            <p
                                class="statusCale"
                            >到港时间： {{dataInfo && dataInfo.arrival &&dataInfo.arrival.arr_time |formatDate }} {{dataInfo && dataInfo.arrival &&dataInfo.arrival.pre_arr_time_status }}</p>
                            <p
                                class="statusCale"
                            >卸船时间： {{dataInfo && dataInfo.arrival &&dataInfo.arrival.unload_time |formatDate }} {{dataInfo && dataInfo.arrival &&dataInfo.arrival.pre_unload_time_status }}</p>
                            <p
                                class="statusCale"
                            >出场时间： {{dataInfo && dataInfo.arrival &&dataInfo.arrival.load_time |formatDate }} {{dataInfo && dataInfo.arrival &&dataInfo.arrival.pre_load_time_status }}</p>
                        </div>
                    </div>
                    <div class="businessOneStatus">
                        <div class="wrapStatus">
                            <span
                                :class="['blueHr',{'notActive':!(dataInfo && dataInfo.departure_loaded_containers.status)}]"
                            ></span>
                            <span
                                class="grayHr"
                                v-if="!(dataInfo.re_container && dataInfo.re_container.status)"
                            ></span>
                            <img
                                class="statusDot trueStatus"
                                src="~assets/img/02_wlzz05.png"
                                alt=""
                                v-if="dataInfo.departure_loaded_containers && dataInfo.departure_loaded_containers.status"
                            >
                            <img
                                class="statusDot falseStatus"
                                src="~assets/img/02_wlzz06.png"
                                alt=""
                                v-else
                            >
                            <div class="statusName containerOut seeWrap">重箱离港
                                <div @mouseleave="closeSomthingOut" class="seeSomthingWrap">
                                    <sup
                                        @mouseenter="seeSomthingOut"
                                        v-if="dataInfo.departure_loaded_containers && dataInfo.departure_loaded_containers.containers && dataInfo.departure_loaded_containers.containers.length != 0"
                                    >查看</sup>
                                    <div class="somthingOutHover" v-show="showContainerOut">
                                        <div
                                            class="somthingInItem"
                                            v-for="(item,index) in dataInfo && dataInfo.departure_loaded_containers.containers"
                                            :key="index"
                                        >
                                            <sub class="topArrowSee"></sub>
                                            <b>{{item.cntr_num}}</b>
                                            <i>进场：{{item.full_in_time|formatDate}}</i>
                                            <i>出场：{{item.full_out_time|formatDate}}</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p
                                class="statusCale"
                            >已离港/总箱量： {{`${dataInfo && dataInfo.departure_loaded_containers.containers&& dataInfo.departure_loaded_containers.containers.length ? dataInfo.departure_loaded_containers.containers.length:'0'}/${dataInfo && dataInfo.departure_loaded_containers.cntr_vol}`}}</p>
                        </div>
                    </div>
                    <div class="businessOneStatus">
                        <div class="wrapStatus">
                            <img
                                class="special endDot statusDot trueStatus"
                                src="~assets/img/02_wlzz04.png"
                                alt=""
                                v-if="dataInfo && dataInfo.re_container.status"
                            >
                            <img
                                class="special endDot statusDot falseStatus"
                                src="~assets/img/02_wlzz07.png"
                                alt=""
                                v-else
                            >
                            <p class="statusName">还箱</p>
                            <p
                                class="statusCale"
                            >还箱位置：{{dataInfo && dataInfo.re_container.re_empty_port_name}}</p>
                            <p
                                class="statusCale"
                            >还箱时间：{{dataInfo && dataInfo.re_container.re_empty_time |formatDate}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loading v-show="showLoading"></loading>
        <!-- <Footer :links="links"></Footer> -->
    </div>
</template>

<script>
import Header from '~/components/Header';
import Footer from '~/components/footer';
import Arrow from '~/components/supply-chain/arrow';
import loading from '~/components/loading'
import { getlinks } from "~/api/getlinks";

import { getToken } from "~utils/auth";
import { getLogistics, getHistoryQueryBlNum } from '~/api/logistics'
export default {
    components: {
        Header,
        Footer,
        Arrow,
        loading
    },

    data () {
        return {
            comeFromNav: false,
            defaultOrder: '',
            showError: false,
            showEmpty: false,
            showDataPage: false,
            hasData: true,
            links: null,
            showDetailTransPort: false,
            showContainerIn: false,
            showContainerOut: false,
            showLoading: false,
            standardNum: '',
            orderChoosed: '',
            orderArr: [],
            dataInfo: null,
            inTime: '',
            outTime: '',
            changedOrderNum: '',
            hisTotyRecords: [],
            valueInput: ''
        }
    },
    //服务端渲染首屏幕数据

    filters: {
        formatDate: function (date) {
            if (!date) {
                return ''
            }
            var date = new Date(date * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var year = date.getFullYear(),
                month = ("0" + (date.getMonth() + 1)).slice(-2),
                sdate = ("0" + date.getDate()).slice(-2),
                hour = ("0" + date.getHours()).slice(-2),
                minute = ("0" + date.getMinutes()).slice(-2),
                second = ("0" + date.getSeconds()).slice(-2);
            // 拼接
            var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
            // 返回
            return result;
        }
    },
    computed: {
        transferDays () {
            if (!this.dataInfo.arr_time || !this.dataInfo.dep_time) {
                return ' '
            }
            if (this.dataInfo) {
                return ((this.dataInfo.arr_time - this.dataInfo.dep_time) / (1 * 24 * 60 * 60)).toFixed(0)
            } else {
                return '0'
            }

        },
        DataOfOneContainObject: function () {
            let obj
            if (this.dataInfo && this.dataInfo.contains && this.dataInfo.contains.length) {
                obj = this.dataInfo.contains.find(item => {
                    return item.cntr_num = this.standardNum
                })
            }
            return obj ? obj : ''
        }
    },
    watch: {
        orderChoosed (newVal, oldVal) {
            this.standardNum = newVal
        }

    },
    created () {
        // this.$bus.$on('loginSuccess', (val) => {
        //     console.log(val)
        //     console.log('登录成功，做点什么')
        // })
    },
    mounted () {

        this.getHistory()

        this.comeFromNav = Boolean(this.$util.cookie.getCookie('comeFromNav'))
        this.defaultOrder = this.$util.cookie.getCookie('typeInOrderNum')

        console.log('初始化查询')
        console.log(this.comeFromNav)
        console.log(this.defaultOrder)
        //每次一进入页面
        if (this.defaultOrder) {//从banner查询里进入，并且有单号
            this.valueInput = this.defaultOrder
            this.showEmpty = true
            this.showDataPage = false
            this.showError = false
            this.searchInit(this.valueInput)//初始化进入的时候，查询值就是输入框的值
            return
        }
        if (this.comeFromNav && !this.defaultOrder) {
            this.showEmpty = true
            this.showDataPage = false
            this.showError = false
            this.showLoading = false
        }


    },

    methods: {
        choseToSearch: function (item) {
            this.valueInput = this.defaultOrder = item
            this.searchInit(item)
            console.log(item)
        },
        // tapDropdown (e) {
        //     console.log(e)
        //     console.log(e.currentTarget.dataset.text)
        // },
        typeIn (e) {
            this.valueInput = e.target.value
        },
        searchInThisPage () {
            console.log('本页面查询')
            if (!this.valueInput) {
                this.$message('提单号不可为空');
                if (!getToken()) {
                    let that = this
                    setTimeout(function () { that.userDialog(0) }, 1000)
                }

                return
            } else {
                this.getHistory()
                let order = this.valueInput.replace(/^\s+|\s+$/g, "");
                this.searchInit(order)
            }

        },
        getHistory () {
            getHistoryQueryBlNum(this).then(res => {
                console.log('历史')
                console.log(res)
                if (res.code == '200' && res && res.data) {
                    this.hisTotyRecords = res.data
                }

            })
        },
        userDialog (type) {
            this.$bus.$emit('showUserDialog', type)
        },
        searchInit (num) {
            this.showLoading = true//先展示loading
            this.showEmpty = this.showError = this.showDataPage = false
            this.defaultOrder = num ? num : this.defaultOrder
            getLogistics(this, this.defaultOrder).then(res => {
                console.log('查询提单号')
                console.log(res)
                this.showLoading = false
                this.orderArr = []
                if (res.code == 200) {
                    this.dataInfo = res.data && res.data.error ? false : res.data
                    console.log(this.dataInfo)

                    if (!this.dataInfo) {
                        this.showError = true
                        this.showEmpty = this.showLoading = false
                        this.showDataPage = false
                        if (res.data.error.error_code == '400104') {
                            let msg = res.data.error.msg
                            if (res.data && res.data.error && msg) {
                                this.$message(msg)
                            }

                        }
                        return
                    } else {
                        this.showEmpty = false
                        this.showError = this.showLoading = false
                        this.showDataPage = true
                    }

                    if (this.dataInfo && this.dataInfo.contains && this.dataInfo.contains.length != 0) {

                        this.dataInfo.contains.map(item => {
                            this.orderArr.push(item.cntr_num)
                        })
                    }
                    this.inTime = this.dataInfo.contains[0].full_in_time
                    this.outTime = this.dataInfo.contains[0].full_out_time
                    this.orderChoosed = this.orderArr[0]
                    //参照单号
                    this.standardNum = this.dataInfo && this.dataInfo.contains && this.dataInfo.contains[0].cntr_num

                } else if (res.code == 501) {
                    this.$message('系统异常，请您稍后再试')
                    this.showDataPage = this.showEmpty = this.showLoading = false
                    this.showError = true
                } else if (res.code == 400001 || res.code == 400103 || res.code == 400104 || res.code == 400105 || res.code == 400106 || res.code == 401101 || res.code == 1 || res.code == 4) {
                    let msg = res.msg
                    if (res && res.msg) {
                        this.$message(msg)
                    }
                } else if (res.code == 40301 || res.code == 500 || res.code == 40302) {
                    let msg = res.msg
                    if (res && res.msg) {
                        this.$message(msg)
                        let that = this
                        setTimeout(function () { that.userDialog(0) }, 1000)
                    }
                } else {
                    this.showDataPage = this.showEmpty = this.showLoading = false
                    this.showError = true
                }



            })
        },
        // getQueryVariable (variable) {
        //     var query = window.location.search.substring(1);
        //     var vars = query.split("&");
        //     for (var i = 0; i < vars.length; i++) {
        //         var pair = vars[i].split("=");
        //         if (pair[0] == variable) { return pair[1]; }
        //     }
        //     return (false);
        // },
        seeSomthing () {
            this.showContainerIn = true
        },
        seeSomthingOut () {
            this.showContainerOut = true
        },
        closeSomthingOut () {
            this.showContainerOut = false
        },
        closeSmothing () {
            this.showContainerIn = false
        },
        closePortDetail () {
            this.showDetailTransPort = false
        },
        seePortDetail () {
            this.showDetailTransPort = true
            console.log(9999)
        },
        handleCommand (command) {
            this.orderChoosed = command
            console.log(this.orderChoosed)
            this.dataInfo.contains.map(item => {
                if (item.cntr_num == this.orderChoosed) {
                    this.inTime = item.full_in_time
                    this.outTime = item.full_out_time
                }
            })
            // this.$message('click on item ' + command);
        }

    }
}
</script>

<style lang="scss" scoped>
.content,
body {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  background: #f2f5fe !important;
  padding-bottom: 17px;
  min-height: 100vh;
}
.tableWrap {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.searchWrap {
  margin-top: 10px;
  width: 1200px;
  height: 59px;
  line-height: 59px;
  background: rgba(43, 59, 157, 1);
  border-radius: 4px;
  .searchInput {
    width: 875px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin-left: 40px;
    margin-right: 34px;
    border: none;
    outline: none;
    position: relative;
    top: -2px;
    padding-left: 25px;
  }
  .searchBtn {
    width: 200px;
    height: 44px;

    background: rgba(249, 173, 65, 1);
    border-radius: 4px;
    font-size: 18px;
    font-family: Source Han Sans HW SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
.searchHistory {
  .historyTitile {
    white-space: nowrap;
  }
  text-align: left;
  font-size: 12px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: rgba(33, 33, 33, 1);
  padding: 16px 0 17px 0;
  .historyWrap {
  }
  .historyContent {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  span {
    cursor: pointer;
    margin-left: 23px;
    padding-top: 8px;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:first-child {
      margin-left: 10px;
    }
  }
}
.orderCale {
  width: 736px;
  padding: 19px 21px 22px 25px;
  background: rgba(81, 108, 233, 1);
  border-radius: 4px;
  margin-bottom: 15px;
  .orderTime {
    position: relative;
  }
  .orderNum {
    font-size: 14px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .updataTime {
    font-size: 12px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    right: 0;
    top: 4px;
  }
  .portInfo {
    border-bottom: 1px solid rgba(219, 226, 236, 0.15);
    padding-bottom: 11px;
    display: flex;
    margin-top: 35px;
    justify-content: space-between;
    .start,
    .end {
      width: 180px;
      span {
        display: inline-block;
        width: 100%;
        vertical-align: middle;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .start {
      margin-left: 110px; // 143px; //125px
      text-align: center;
    }
    .end {
      margin-right: 133px;
      text-align: center;
    }
    .port {
      font-size: 26px;
      font-family: Source Han Sans SC;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      padding-bottom: 15px;
      height: 26px;
    }
    .portTime {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(228, 240, 249, 1);
      padding-bottom: 8px;
    }
    .startTime {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(228, 240, 249, 1);
    }
  }

  .dayTrans {
    position: relative;
    width: 40px;
    text-align: center;
    padding-top: 10px;
    .firstDot,
    .secDot {
      position: absolute;
      width: 44px;
      height: 10px;
    }
    .firstDot {
      left: -62px;
      top: 15px;
    }
    .secDot {
      right: -62px;
      top: 15px;
      transform: rotate(180deg);
    }
    .days {
      display: inline-block;
      vertical-align: middle;
      font-size: 18px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(255, 223, 47, 1);
    }
    .trans {
      padding-top: 5px;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .containerInfo {
    padding-top: 20px;
    div:first-child {
      position: relative;
    }
    div:last-child {
      position: relative;
    }
    span,
    b {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    span {
      display: inline-block;
      max-width: 254px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .li {
      display: inline-block;
      /* position: absolute; */
      /* left: 374px; */
      width: 298px;
      /* text-overflow: ellipsis; */
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      margin-top: 18px;
      &:first-child {
        margin-top: 0;
      }
    }
    i {
      position: relative;
      left: 133px;
      top: 15px;
      width: 40px;
      font-size: 14px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: #ffdf2f;
    }
  }
}
.courseWrap {
  top: -25px;
}
.tableContent {
  width: 782px;
}
.ifAddriveInfo {
  padding-bottom: 18px;
  border-bottom: 1px solid #dbe2ec;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: white;
  h2 {
    padding: 19px 0 18px 24px;
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: rgba(59, 66, 107, 1);
  }
  span {
    font-size: 14px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 22px;
    padding: 5px 0;
    color: rgba(86, 92, 129, 1);
  }

  p span:first-child {
    margin-left: 54px;
  }
  p span:last-child {
    margin-left: 276px;
  }
}
.tableChoose {
  padding: 25px 25px 25px 24px;
  background: white;
  position: relative;
  h2 {
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: rgba(59, 66, 107, 1);
  }
  .choose {
    position: absolute;
    right: 25px;
    top: 19px;
  }
  .dropDownText {
    width: 236px;
    height: 35px;

    line-height: 35px;
    padding-left: 7px;
    border: 1px solid rgba(219, 226, 236, 1);
    border-radius: 2px;
    display: inline-block;
    position: relative;
    top: -8px;
    font-size: 14px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(59, 66, 107, 1);
    .arrow {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
.specialWordWrap {
  display: block;
}
.specialWord {
  display: block;
  width: 90%;
  word-break: break-all;
}
.middleInfo {
  position: relative;
  left: -9px;
}
.tableDetailWrap {
  background: rgba(255, 255, 255, 1);
  border-radius: 0px 0px 4px 4px;
  padding: 25px 25px 47px 25px;
  background: white;
  .detailContent {
    width: 730px;
    min-height: 368px;
    border: 1px solid rgba(219, 226, 236, 1);
    border-radius: 8px;
    .oneRowUni {
      p:first-child {
        i {
          padding-right: 5px;
        }
      }
      &:last-child {
        span,
        i {
          border-bottom: 0 !important;
        }
      }
      min-height: 46px;
      display: flex;
      flex-direction: row;
      i {
        font-size: 13px;
        font-weight: 400;
        color: rgba(59, 66, 107, 1);
        width: 132px;
        padding-left: 10px;
        display: flex;
        align-items: center;
        border-right: 1px solid #dbe2ec;
        border-bottom: 1px solid #dbe2ec;
      }
      span {
        font-size: 13px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(59, 66, 107, 1);
        border-right: 1px solid #dbe2ec;
        border-bottom: 1px solid #dbe2ec;
      }
      p {
        display: flex;
        flex-direction: row;
      }
      p:first-child {
        span {
          font-size: 13px;
          min-height: 46px;
          display: flex;
          align-items: center;
          font-family: Source Han Sans SC;
          font-weight: 400;
          color: rgba(59, 66, 107, 1);
          width: 70px;
          padding-left: 14px;
          background: #f2f5fe;
        }
      }
      p:nth-child(2) {
        span {
          min-height: 46px;

          display: flex;
          align-items: center;
          width: 94px;
          padding-left: 14px;
          background: #f2f5fe;
        }
      }
      p:last-child {
        i {
          border-right: none;
        }
        span {
          min-height: 46px;
          display: flex;
          align-items: center;

          width: 94px;
          padding-left: 14px;
          background: #f2f5fe;
        }
      }
    }
    //     // align-items: center;
  }
}
.businessStatus {
  width: 398px;
  min-height: 817px;
  background: white;
  border-radius: 4px;
  margin-left: 20px;
  //   position: absolute;
  //   right: 0;
  //   top: 104px;
  h1 {
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: rgba(59, 66, 107, 1);
    padding: 16px 0 25px 30px;
  }
  .businessOneStatus {
    background: rgba(247, 249, 252, 1);
    border-radius: 4px;
    padding: 13px 16px 13px 16px;
    width: 279px;
    min-height: 35px;
    margin-top: 10px;
    margin-left: 63px;
  }
  .statusName {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(59, 66, 107, 1);
  }
  .statusCale {
    font-size: 12px;
    font-family: SimSun;
    font-weight: 400;
    padding-top: 8px;
    color: rgba(86, 92, 129, 1);
  }
  .wrapStatus {
    position: relative;
  }
  .statusDot {
    display: inline-block;
    width: 17px;
    height: 17px;
    position: absolute;
    top: 5px;
    left: -48px;
    z-index: 2;
  }
  .special {
    display: inline-block;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 5px;
    left: -51px;
  }
  .endDot {
    // transform: rotate(180deg);
  }
  .blueHr {
    width: 0;
    position: absolute;
    height: 80px;
    left: -40px;
    top: 10px;
    border-right: 2px solid #3752d2;
  }
  .specialBlueHr {
    height: 160px !important;
    position: absolute;
    height: 80px;
    left: -40px;
    top: 10px;
    border-right: 2px solid #3752d2;
  }
  .notActive {
    width: 0;
    position: absolute;
    height: 80px;
    left: -40px;
    top: 10px;
    border-right: 2px solid #cdd0d6;
  }
  .grayHr {
    width: 0;
    position: absolute;
    height: 40px;
    left: -40px;
    bottom: -56px;
    border-right: 2px solid #cdd0d6;
  }
}
.error,
.empty {
  display: flex;
  flex-direction: row;
  width: 450px;
  height: 150px;
  position: relative;
  margin-top: -30px;
  margin: 0 auto;
  //   background: red;
  h3 {
    font-size: 22px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: rgba(59, 66, 107, 1);
    // padding-top: 20px;
  }
  h5 {
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: rgba(59, 66, 107, 1);
    padding-top: 10px;
  }
}
.error div {
  margin-top: -35px;
}
.empty {
  padding-top: 50px;
  //   background: green;
  div {
    padding-top: 65px;
  }
}
.error h5 {
  letter-spacing: 2px;
}
.errorImg {
  display: inline-block;
  width: 225px;
  height: 231px;
}
.hoverWrap {
  position: absolute;
  top: 98px;
  left: 132px;
  z-index: 1;
  z-index: 1;
}
.letter {
  letter-spacing: 2px;
}
//查看中转弹框
.transPort {
  position: relative;
  .detailTransPort {
    .topArrow {
      display: inline-block;
      width: 0;
      height: 0;
      position: absolute;
      border-left: 7px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 13px solid white;
      top: -13px;
      left: 140px;
    }
    .portContentWrap {
      overflow-y: auto;
      max-height: 308px;
    }

    width: 263px;
    max-height: 308px;
    padding: 20px 15px 16px 15px;
    background: white;
    box-shadow: 0px 0px 24px 0px rgba(105, 123, 151, 0.34);
    border-radius: 8px;
    position: absolute;
    top: 32px;
    /* left: 125px; */
    transform-origin: center top;
    z-index: 2137;

    h4 {
      font-size: 16px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: rgba(64, 138, 255, 1);
    }
    .transCalcInfo {
      padding-top: 12px;
      font-size: 14px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(86, 92, 129, 1);
      line-height: 20px;
      &:last-child {
        margin-bottom: 10px;
      }
    }
  }
}
.containerIn,
.containerOut {
  sup {
    width: 27px;
    height: 14px;
    font-size: 14px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(42, 68, 198, 1);
    margin-left: 187px;
    position: relative;
    margin-left: 187px;
    top: -20px;
    left: 40px;
  }
}
.seeSomthingWrap {
  width: 293px;
  padding: 24px 0;

  border-radius: 8px;
  position: absolute;
  top: -4px;
  left: 20px;
  z-index: 1;
  .somthingInItem {
    display: flex;
    flex-direction: column;
  }
  .somthingInItemIn {
    flex-direction: row;
    b {
      padding-top: 10px;
    }
    b:first-child {
      padding-top: 0;
    }
    i:first-child {
      padding-top: 0;
    }
  }
  .somthingInItem:first-child {
    margin-top: 0;
  }
  .topArrowSee {
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    border-left: 7px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 13px solid white;
    top: -12px;
    right: 44px;
  }
  b {
    font-size: 16px;
    color: #408aff;
    font-weight: 500;
    padding-top: 10px;
    padding-left: 14px;
  }
  i {
    font-size: 14px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #565c81;
    padding-left: 25px;
    padding-top: 10px;
  }
}
.somthingOutHover,
.somthingInHover {
  display: block;
  background: white;
  box-shadow: 0px 0px 24px 0px rgba(105, 123, 151, 0.34);
  position: absolute;
  padding: 20px 0;
  border-radius: 8px;
  top: 32px;
  left: -11px;
  min-width: 304px;
}
.somthingInHover {
}
.somthingInItem {
  &:first-child {
    margin-top: 0;
  }
  margin-top: 10px;
}
.react {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.leftContent {
  /* position: relative;
  top: -12px; */
}
.transPort {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.transLeft {
  width: 200px;
  margin-left: 64px;
  position: relative;
  p:last-child {
    padding-top: 15px;
  }
}
.transLeftSee {
  position: absolute !important;
  top: -113px;
  left: -66px;
}
.transRight {
  display: flex;
  margin-right: 40px;
  flex-direction: column;
  .li {
    margin-bottom: 0;
  }
}
//下拉框
.dropDownSelf {
}
</style>
<style>
/* 表单覆盖样式 */
.el-table__body-wrapper {
  /* width: 730px;
  min-height: 368px;
  border: 1px solid rgba(219, 226, 236, 1);
  border-radius: 8px; */
}
.el-table_1_column_1 {
  /* width: 71px !important;
  padding: 10px 0;
  padding-left: 14px;

  background: #f2f5fe !important; */
}
.el-table_1_column_3,
.cell {
  font-size: 13px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: rgba(59, 66, 107, 1);
}
.el-table::before {
  display: none;
}
.el-dropdown-menu,
.el-popper {
  width: 245px;
  margin-left: -119px;
  text-align: left;
}
.el-popper {
  /* transform-origin: center top;
  z-index: 2005;
  position: absolute;
  top: 583px !important;
  left: 630px;
  width: 243px;
  margin-top: 30px !important; */
}
</style>
