<template>
    <div class="footer">
        <router-link to="/home">
            <i class="iconfont icon-home"></i>
            <span>首页</span>
        </router-link>
        <router-link to="/list">
            <i class="iconfont icon-chazhaobiaodanliebiao"></i>
            <span>列表</span>
        </router-link>
        <router-link to="/collect">
            <i class="iconfont icon-shoucang"></i>
            <span>收藏</span>
        </router-link>
        <router-link to="/add">
            <i class="iconfont icon-tianjia-xue"></i>
            <span>添加</span>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style lang="less" scoped>
.footer {
    width: 100%;
    position: fixed;
    bottom: 0px;
    border-top: 1px solid lightblue;
    background: #fff;
    display: flex;

    a {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        font-size: 18px;
        color: #666;
    }

    .router-link-active {
        color: red;
        //vue-router 会给当前选中的路由,一个选中的类名,如果被选中,将添加选中的样式
    }
}
</style>
