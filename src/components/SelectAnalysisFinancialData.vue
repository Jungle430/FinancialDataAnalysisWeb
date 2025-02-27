<script lang="ts" setup>
import { getFinancialBranch, getAllFinancialKind } from '@/apis/financialDataAnalysis';
import { onMounted, ref, watch } from 'vue';

interface FinancialKindItem {
  cn: string,
  en: string
}

interface FinancialBranchItem {
  code: string,
  msg: string,
}

/**
 * @description 二级标题的结构 key是金融数据种类的英文 value是金融分支数据
 */
interface ProvinceCityData {
  [province: string]: FinancialBranchItem[];
}

defineProps<{
  title: string;
}>();

const kindsWithCNAndEN = ref<Array<FinancialKindItem>>([]);

const kindModel = ref('');
const branchModel = ref('');

const emits = defineEmits<{
  (event: 'update:kindModel', value: string): void;
  (event: 'update:branchModel', value: string): void;
}>();

const provinceCityData = ref<ProvinceCityData>({});

onMounted(() => {
  getAllFinancialKind().then(res => {
    let kinds = res.data.kinds as Array<FinancialKindItem>;
    kindsWithCNAndEN.value.push(...kinds);
    const promises: Array<Promise<any>> = [];
    kinds.forEach(kind => {
      const promise = getFinancialBranch(kind.en).then(res => {
        provinceCityData.value[kind.en] = res.data;
      })
      promises.push(promise);
    })

    Promise.all(promises).then(() => {
      kindModel.value = kinds.length !== 0 ? kinds[0].en : '';
    });
  });
});

watch(kindModel, () => {
  emits('update:kindModel', kindModel.value);
  branchModel.value = '';
});

watch(branchModel, () => {
  emits('update:branchModel', branchModel.value);
});

defineExpose({
  kindModel,
  branchModel
});
</script>

<template>
  <div class="container">
    <span>
      <a-card :title="title">
        <a-space>
          <a-select :style="{ width: '300px' }" v-model="kindModel">
            <a-option v-for="kindItem in kindsWithCNAndEN" :value="kindItem.en">
              {{ kindItem.cn }}
            </a-option>
          </a-select>
          <a-select :style="{ width: '860px' }" v-model="branchModel">
            <a-option v-for="branchItem in provinceCityData[kindModel]" :value="branchItem.code">
              {{ branchItem.msg }}
            </a-option>
          </a-select>
        </a-space>
      </a-card>
    </span>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 0px;
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 0px;
    }
  }
}

.action-icon {
  margin-left: 12px;
  cursor: pointer;
}

.active {
  color: #0960bd;
  background-color: #e3f4fc;
}

.setting {
  display: flex;
  align-items: center;
  width: 200px;

  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
