/**
 * 数据多重嵌套，采用递归的思想，实现vant组件级联选择的功能（children 字段可以实现选项级联的效果，同时级联选择的数据嵌套深度需要保持一致）
 * @param {*} el
 * @returns
 */
export default function format (el) {
  el.text = el.label
  if (el.children && el.children.length > 1) {
    el.children.forEach(function (child) {
      if (!child.children) {
        child.children = [{ text: '不限' }]
      }
      child.text = child.label
      format(child)
    })
  }
  return el
}
