import 'isomorphic-unfetch'
const publicPath = process.env.VUE_APP_BASE_CONTENT;

const runtimeArgs = {}

export async function getRuntimeArgs () {
  // TODO: import fetch polyfill
  const args = await fetch(publicPath + 'runtime-args.json').then(res => res.json())
  return Object.assign(runtimeArgs, args)
}

export default runtimeArgs
