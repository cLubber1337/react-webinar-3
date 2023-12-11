import _ from 'lodash'
/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


/**
 * Форматирование пагинации
 * @param totalPages {Number}
 * @param currentPage {Number}
 * @param siblingsCount {Number}
 * @returns {(number | string | number | Number)[]}
 */

export const paginationRange = (totalPages, currentPage, siblingsCount = 1) => {
  const totalPagesInArray = 7 + siblingsCount

  if (totalPagesInArray >= totalPages) {
    return _.range(1, totalPages + 1)
  }

  const leftSiblingsIndex = Math.max(currentPage - siblingsCount, 1)
  const rightSiblingsIndex = Math.min(currentPage + siblingsCount, totalPages)

  const showLeftDots = leftSiblingsIndex > 2
  const showRightDots = rightSiblingsIndex < totalPages - 1
  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 * siblingsCount
    let leftRange
    if (currentPage === 3 ) {
      leftRange = _.range(1, leftItemCount + 2)
    } else {
      leftRange = _.range(1, leftItemCount + 1 )
    }

    return [...leftRange, ' ...', totalPages]
  } else if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 * siblingsCount
    let rightRange
    if (currentPage === totalPages - 2) {
      rightRange = _.range(totalPages - rightItemCount, totalPages + 1)
    } else
      rightRange = _.range(totalPages - rightItemCount + 1, totalPages + 1)

    return [1, '... ', ...rightRange]
  } else {
    const middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1)

    return [1, '... ', ...middleRange, ' ...', totalPages]
  }
}
