<template>
    <canvas class="canvas" :id="id" width="100px" height="24px"></canvas>
</template>

<script>
    export default {
        name: "arrow",
        props: {
            id: {
                type: String,
                require: true
            }
        },
        mounted() {
            let canvas = document.getElementById(this.id);
            if (canvas.getContext) {
                let ctx = canvas.getContext('2d');
                ctx.fillStyle = "#C9C9C9";
                ctx.beginPath();
                ctx.setLineDash([7]);
                ctx.moveTo(0, 12);
                ctx.lineTo(100, 12);
                ctx.stroke();

                ctx.beginPath();
                ctx.setLineDash([8]);
                ctx.moveTo(84, 0);
                ctx.lineTo(100, 12);
                ctx.lineTo(84, 24);
                ctx.stroke();
            }
        }
    }
</script>

<style scoped>
    .canvas{
        width: 100px;
        height: 24px;
        margin: 0px 12px;
    }
</style>