<template>
  <Card title="排行榜（近一个月）">
    <div class="rank">
      <ul class="list">
        <li :key="index" v-for="(item, index) in list">
          <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
          <span>{{ item.name }}</span>
          <span>{{ item.total }}</span>
        </li>
      </ul>
    </div>
  </Card>
</template>

<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { Card },
    props: {
      title: {
        type: String,
        default: '',
      },
      list: {
        type: Array,
        default: null,
      },
    },
  });
</script>

<style lang="less" scoped>
  .rank {
    // padding: 0 32px 32px 72px;


    .list {
      list-style: none;

      li {
        margin-top: 16px;

        span {
          color: rgba(0, 0, 0, 0.67);
          font-size: 14px;
          line-height: 22px;

          &:first-child {
            background-color: #f5f5f5;
            border-radius: 20px;
            display: inline-block;
            font-size: 12px;
            font-weight: 600;
            margin-right: 24px;
            height: 20px;
            line-height: 20px;
            width: 20px;
            text-align: center;
          }
          &.active {
            background-color: #314659;
            color: #fff;
          }
          &:last-child {
            float: right;
          }
        }
      }
    }
  }

  .mobile .rank {
    padding: 0 32px 32px 32px;
  }
</style>
