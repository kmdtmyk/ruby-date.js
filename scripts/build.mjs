import {copyFile, writeFile} from 'node:fs/promises'

await copyFile('dist/cjs/ruby-date.js', 'dist/ruby-date.cjs')
await copyFile('dist/cjs/ruby-date.js.map', 'dist/ruby-date.cjs.map')
await writeFile('dist/cjs/package.json', '{"type":"commonjs"}\n')

await writeFile(
  'dist/ruby-date.cjs',
  "module.exports = require('./cjs/ruby-date.js').default\nmodule.exports.default = module.exports\n",
)

await writeFile(
  'dist/ruby-date.cjs.d.cts',
  'declare const RubyDate: typeof import("./esm/ruby-date.js").default\nexport = RubyDate\n',
)
