<script setup lang="ts">
import { test } from '../../src'
const tests = reactive([
  { name: '', description: '' },
  { name: '', description: '' },
])
const status = ref(false)
const output = ref('')
const add = () => {
  tests.push({
    name: '',
    description: '',
  })
}
const remove = (index: number) => {
  tests.splice(index, 1)
}
const run = async () => {
  console.log('running')

  const data = tests.map(({ name, description }) => {
    const fn = new Function(description)
    return {
      name,
      fn,
    }
  })
  // loading
  status.value = true
  test(data).then((result) => {
    output.value = result
    status.value = false
  })
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200" flex="~ gap4">
    <div flex-1>
      <div
        v-for="(test, i) in tests"
        :key="i"
        w-full
        min-h-40
        border-1
        flex
        gap4
        items-center
        px4
        box-border
        mb2
        relative
      >
        <div v-show="i >= 2" absolute right-2 top-1 @click="() => remove(i)">
          x
        </div>
        <div w-100 flex items-center gap-2>
          <input
            v-model="test.name"
            type="text"
            placeholder="test name"
            border-1
            border-rd-1
            lh-10
            px2
          >
        </div>
        <div flex-1>
          <textarea
            v-model="test.description"
            w-full
            p2
            border-1
            placeholder="test function"
            rows="4"
            cols="50"
          />
        </div>
      </div>
    </div>

    <div w-60>
      <div flex="~ gap2" w-full justify-center>
        <button btn :disabled="status" @click="add">
          Add Test
        </button>
        <button btn :disabled="status" @click="run">
          Run
        </button>
      </div>
      <div border-1 min-h-100 mt-10>
        <div v-for="log in output" :key="log" py1>
          <div>{{ log }}</div>
        </div>
      </div>
    </div>
  </main>
</template>
