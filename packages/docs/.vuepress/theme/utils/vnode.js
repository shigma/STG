export function getInnerText(vnode) {
  if (vnode.tag === undefined && vnode.text !== undefined) return vnode.text
  return vnode.children.map(getInnerText).join('')
}
