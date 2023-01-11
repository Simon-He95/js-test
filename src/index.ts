interface Fns {
  name: string
  fn: Function
}
export function test(fns: Fns[]) {
  const suite = new Benchmark.Suite()

  // add tests
  return new Promise((resolve) => {
    const results: string[] = []
    fns.forEach(({ name, fn }) => {
      suite.add(name, () => {
        fn()
      })
    })
    suite
      // add listeners
      .on('cycle', (event: any) => {
        results.push(String(event.target))
      })
      .on('complete', function (this: any) {
        results.push(`Fastest is ${this.filter('fastest').map('name')}`)
        resolve(results)
      })
      // run async
      .run({ async: true })
  })
}
