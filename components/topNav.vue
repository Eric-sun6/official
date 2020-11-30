<template>
    <div class="head">
        <div class="nav">
          
            <Header ref="header" id="newTab"  v-show="!headFixed" :newLogo="newLogo" :butFixed = butFixed />
           
        </div>
        <Header class="headFixed" v-show="headFixed"/>
        <slot name="banner"></slot>
      
    </div>
</template>
<script>
import Header from '~/components/Header';
export default {
    components: {
        // TopNav,
        Header
    },
    props:{
        headFixed:{
            default: false,
            type: Boolean
        },
        butFixed:{
            default:true,
            type : Boolean
        }
    },
    data(){
        return{
            // fixed: false,
            newLogo:true,
        }
    },
    mounted(){     
    },
    methods: {
            openYSF(){
                this.$refs.header.openYSF()
            }
        }
    }
</script>
<style lang="scss">
.headFixed{
    position: fixed;
    top: 0;
    z-index: 3000;
    transition: all .2s ease-in;
    // background-color: #2d48cb !important;
}
.head {
    min-width: 1200px;
    position: relative;
    .nav {
        position: absolute;
        top: 0;
        height: 110px;
        left: 50%;
        z-index: 12;
        transform: translateX(-50%);
        width: 100%;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
    #newTab{
        background: none;
        height:110px;
       
    
        
    }
    #navbarSupportedContent {
        a{
            color: #9fb5f1;
        }
        .dropdown-menu{
            border-radius:5px;
            text-align: center;
            width: 140px;
            background-color:white;

        }
        .dropdown-item{
            background-color: #fff;
            display: flex;
            font-size: 13px;
            height: 45px;
            line-height: 45px; 
            align-items: center;
            justify-content: center;
            border: none;
            color:#425a78 !important;
            &:hover{
                background: #eaf0f7;
            }
            &:first-child{
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
            &:last-child{
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }
        .icon-down-arrow:before{
            width: 0; 
            height: 0;
            content: '';
            position: absolute;
            display: inline-block;
            width:0; 
            height:0; 
            top: -10px;
            left:35%;
            border-left:10px solid transparent;
            border-right:10px solid transparent;
            border-bottom:10px solid #fff;
        }
        
        .dropdown-toggle:before{
            margin-left: 0.255em;
            vertical-align: 0.255em;
            content: '';
            background: url('~assets/img/arrow.png');
            background-size: 13px 7px;
            width: 13px;
            height:7px;
            position: absolute;
            top: 30px;
            right: 12px;
        } 
        .dropdown-toggle:hover{

            &:before{
                margin-left: 0.255em;
                vertical-align: 0.255em;
                content: '';
                background: url('~assets/img/arrow.png');
                background-size: 13px 7px;
                width: 13px;
                height:7px;
                position: absolute;
                top: 30px;
                right: 12px;
                transform: rotate(180deg);
                // transition: transform 0.3s;
            }
        }
        .dropdown-toggle:after{
            display: none;
            
        }
    }
}
#newTab a{
    color: white !important;
}
</style>
