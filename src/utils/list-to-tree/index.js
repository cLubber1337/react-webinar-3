/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, key = '_id') {
  let trees = {};
  let roots = {};
  if (list) {
    for (const item of list) {
      // Добавление элемента в индекс узлов и создание свойства children
      if (!trees[item[key]]) {
        trees[item[key]] = item;
        trees[item[key]].children = [];
        // Ещё никто не ссылался, поэтому пока считаем корнем
        roots[item[key]] = trees[item[key]];
        // Установка уровня для корневых элементов
        trees[item[key]].level = 0;
      } else {
        trees[item[key]] = Object.assign(trees[item[key]], item);
      }

      // Если элемент имеет родителя, то добавляем его в подчиненные родителя
      if (item.parent && item.parent[key]) {
        // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
        if (!trees[item.parent[key]]) {
          trees[item.parent[key]] = {children: []};
          roots[item.parent[key]] = trees[item.parent[key]];
          // Установка уровня для родительских элементов
          trees[item.parent[key]].level = 0;
        }
        // Добавления в подчиненные родителя
        trees[item.parent[key]].children.push(trees[item[key]]);
        // Установка уровня для дочерних элементов
        trees[item[key]].level = trees[item.parent[key]].level + 1;
        // Так как элемент добавлен к родителю, то он уже не является корневым
        if (roots[item[key]]) delete roots[item[key]];
      }
    }
  }

  return Object.values(roots);
}




