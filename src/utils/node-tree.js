/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/10 11:20
 */
/**
 * 把返回的数据集list 转换成 Tree
 * @param list 要转换的数据集
 * @param root 根节点
 * @param props 自增字段
 * @param tree 生成的树状结构，默认用传入
 * @returns {*[]}
 * @constructor
 */
export const listToTree = ({
  list = [],
  root = 0,
  props = { id: 'id', parentId: 'parentId', children: 'children' },
  tree = []
}) => {
  const listToObject = list.reduce((pre, cur) => {
    return {
      ...pre,
      [cur[props.id]]: cur
    }
  }, {})

  list.forEach(item => {
    if (item[props.parentId] == root) {
      tree.push(listToObject[item[props.id]])
    } else {
      if (!listToObject[item[props.parentId]][props.children]) {
        listToObject[item[props.parentId]][props.children] = []
      }
      listToObject[item[props.parentId]][props.children].push(listToObject[item[props.id]])
    }
  })
  return tree
}

/**
 * 将tree结构 转化成 list
 * @param tree 要转换的tree数据集
 * @param props 自定义字段
 * @param retainChild 是否保留每一项中的 子节点
 * @param PID
 * @param list 要转化成list
 * @returns {*[]}
 */
export const treeToList = ({
  tree = [],
  props = { id: 'id', parentId: 'parentId', children: 'children' },
  retainChild = false,
  PID = '0',
  list = []
}) => {
  if (Array.isArray(tree) && tree.length) {
    tree.forEach((item, index) => {
      if (!item.PID) item.PID = PID
      item.ID = `${item.PID}-${index + 1}`
      list.push(item)
      if (Array.isArray(item[props.children]) && item[props.children].length) {
        treeToList({ tree: item[props.children], props, retainChild, PID: item.ID, list })
      }
    })
  }

  if (!retainChild) {
    list.forEach(item => {
      delete item[props.children]
    })
  }

  return list
}

/**
 * 根据 父节点id 获取其 所有子节点信息
 * @param list
 * @param parentId
 * @param props
 * @param childIds
 * @param returnType
 * @returns {*[]}
 */
export const getChildrenIdsOrItemsByPId = ({
  list = [],
  parentId = 0,
  props = { id: 'id', parentId: 'parentId', children: 'children' },
  childIds = [],
  returnType = 'item' // item：子节点具体信息  id：只保留子节点id
}) => {
  const fn = ({
    list = [],
    parentId = 0,
    props = { id: 'id', parentId: 'parentId', children: 'children' },
    childIds = [],
    returnType = 'item' // item：子节点具体信息  id：只保留子节点id
  }) => {
    if (Array.isArray(list) && list.length) {
      list.forEach(item => {
        if (item[props.parentId] == parentId) {
          childIds.push(item[props.id])
          childIds = [...new Set([...childIds, ...fn({ list, parentId: item[props.id], props, childIds, returnType })])]
        }
      })
    }
    return childIds
  }
  const ids = fn({
    list,
    parentId,
    props,
    childIds,
    returnType // item：子节点具体信息  id：只保留子节点id
  })

  const map = new Map([
    [
      'item',
      () => {
        const listToObject = list.reduce((pre, cur) => {
          return {
            ...pre,
            [cur[props.id]]: cur
          }
        }, {})
        return ids.map(v => listToObject[v])
      }
    ],
    [
      'id',
      () => {
        return ids
      }
    ]
  ])
  return map.get(returnType)?.()
}

/**
 * 根据树状子节点 依次找到 父节点路径
 * @param data
 * @param value
 * @param props
 * @param path
 * @returns {*[]}
 */
export const getNodePathItems = ({ list = [], value = '', props = { key: 'id', children: 'children' }, path = [] }) => {
  if (!Array.isArray(list)) return []

  const getNodePath = (node, value = '', props, path = []) => {
    path.push(node)
    if (node?.[props.key] == value) {
      throw 'break'
    }
    if (Array.isArray(node?.[props.children])) {
      for (let i = 0; i < node?.[props.children].length; i++) {
        getNodePath(node[props.children][i], value, props, path)
      }
    }
    path.pop()
  }

  try {
    for (let i = 0; i < list.length; i++) {
      getNodePath(list[i], value, props, path)
    }
  } catch (e) {
    return path
  }
}
