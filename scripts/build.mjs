import {writeFile} from 'node:fs/promises'

await writeFile('dist/cjs/package.json', '{"type":"commonjs"}\n')

await writeFile(
  'dist/ruby-date.cjs',
  "module.exports = require('./cjs/ruby-date.js').default\nmodule.exports.default = module.exports\n",
)

await writeFile(
  'dist/ruby-date.cjs.d.cts',
  'declare const RubyDate: typeof import("./esm/ruby-date.js").default\nexport = RubyDate\n',
)
