function resolvePath(path) {
  if (path.startsWith('@/'))
    return path.replace('@/', '')
  if (path.startsWith('/'))
    return path.replace('/', '')
  else return path
}
// 动态导入本地资源jsx
export function required(url) {
  return new URL(`../${resolvePath(url)}`, import.meta.url).href
}

export function sortTreeData(data, flag) {
  let arr = []
  if (flag === 1)
    arr = data[0].children
  else
    arr = data

  arr.sort((a, b) => a.sort - b.sort)
  arr.forEach((item) => {
    if (item.children)
      item.children = sortTreeData(item.children, 2)
  })
  if (flag === 1) {
    data[0].children = arr

    return data
  }
  else {
    return arr
  }
}
