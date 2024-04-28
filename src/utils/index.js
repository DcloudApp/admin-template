export function getImageUrl(name) {
  return new URL(`../assets/img/${name}`, import.meta.url).href
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
