<script setup lang="ts">
import * as monaco from 'monaco-editor'

import { test } from '../../src'
const tests = reactive([{ name: 'test#1' }, { name: 'test#2' }])
const editors: any[] = []
const status = ref(false)
const output = ref('')
const add = () => {
  tests.push({
    name: `test#${tests.length + 1}`,
  })
}
const remove = (index: number) => {
  tests.splice(index, 1)
}
const run = async () => {
  console.log('running')

  const data = tests.map(({ name }, i) => {
    const fn = new Function(editors[i].getValue())
    return {
      name,
      fn,
    }
  })
  // loading
  status.value = true
  output.value = ''
  test(data).then((result: any) => {
    output.value = result
    status.value = false
  })
}
const value = ref('// test fn')
onMounted(() => {
  monaco.editor.defineTheme('myTheme', {
    base: 'vs',
    inherit: true,
    rules: [{ background: 'EDF9FA', token: '' }],
    colors: {
      'editor.foreground': '#000000',
      'editor.background': '#EDF9FA',
      'editorCursor.foreground': '#8B0000',
      'editor.lineHighlightBackground': '#0000FF20',
      'editorLineNumber.foreground': '#008800',
      'editor.selectionBackground': '#88000030',
      'editor.inactiveSelectionBackground': '#88000015',
    },
  })
  monaco.editor.setTheme('myTheme')
})
watchEffect(
  () => {
    tests.forEach((t, i) => {
      if (document.querySelector(`.editor${i}`)?.children.length)
        return

      editors[i] = monaco.editor.create(
        document.querySelector(`.editor${i}`)!,
        {
          value: value.value,
          language: 'javascript',
          fontFamily: 'Arial',
          fontSize: 20,
        },
      )
    })
  },
  {
    flush: 'post',
  },
)
</script>

<template>
  <git-fork
    link="https://github.com/Simon-He95"
    type="trapeziumType"
    position="right"
    color="red"
  />
  <div text-center text-3xl pt4 text-shadow-sm>
    Online Javascript Test
  </div>
  <main
    font-sans
    p="x-4 y-10"
    text="center gray-700 dark:gray-200"
    flex="~ gap4"
  >
    <div flex-1>
      <div
        v-for="(t, i) in tests"
        :key="i"
        w-full
        min-h-40
        border-1
        flex
        gap4
        items-start
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
            v-model="t.name"
            type="text"
            placeholder="test name"
            lh-10
            px2
            text-xl
          >
        </div>
        <div flex-1 text-left>
          <div :class="`editor${i}`" w-full h-80 />
        </div>
      </div>
    </div>
    <div w-60 />
    <div w-60 fixed right-4 bg-white>
      <div flex="~ gap2" w-full justify-center pt20>
        <button btn :disabled="status" @click="add">
          Add Test
        </button>
        <button btn :disabled="status" @click="run">
          Run
        </button>
      </div>
      <div border-1 min-h-100 mt-10 text-left>
        <div v-for="log in output" :key="log" p1>
          <div>{{ log }}</div>
        </div>
      </div>
    </div>
  </main>
</template>
