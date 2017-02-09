import Utils from '../utils/Utils';
//import sortedIndexBy from 'lodash/sortedIndexBy';

const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const originColors = ['red', 'yellow', 'blue', 'green', 'purple'];

function _getRandomElement(itemInfo) {
    let item = Object.assign({
        id: Utils.uniqueId('ele-')
        //text: Utils.randomArray(alphabets),
    }, itemInfo);
    if (!item.backgroundColor) {
        item.backgroundColor = Utils.randomArray(originColors);
    }
    if (!item.fontColor) {
        item.fontColor = item.backgroundColor === 'yellow' ? '#000' : '#fff';
    }
    return item;
}

function _getSupplementRowIndex(items, col) {
    let targetItems = items.filter(function(item) {
        return item.col === col && item.row < 0;
    });
    return - targetItems.length - 1;
}

function _detectSameItem(item, items, direction, key, arr) {
    let eArr = arr || [], query;
    switch(direction) {
    case 'right':
        query = {row: item.row, col: item.col + 1};
        break;
    case 'left':
        query = {row: item.row, col: item.col - 1};
        break;
    case 'top':
        query = {row: item.row - 1, col: item.col};
        break;
    case 'bottom':
        query = {row: item.row + 1, col: item.col};
        break;
    }
    let targetItem = Utils.findWhere(items, query);
    if (!targetItem) {
        return eArr;
    }
    if (targetItem[key] === item[key]) {
        eArr.push(targetItem);
        return _detectSameItem(targetItem, items, direction, key, eArr);
    } else {
        return eArr;
    }
}

function _detectEmptyAfterElement(row, col, items, maxRow) {
    if (row > maxRow - 1) {
        return false;
    }
    let targetItem = Utils.findWhere(items, {row, col});
    if (!targetItem) {
        return {row, col};
    }
    return _detectEmptyAfterElement(row + 1, col, items, maxRow);
}

function _detectElementAfterEmpty(row, col, items, maxRow) {
    if (row > maxRow - 1) {
        return false;
    }
    let targetItem = Utils.findWhere(items, {row, col});
    if (targetItem) {
        return {row, col};
    }
    return _detectElementAfterEmpty(row + 1, col, items, maxRow);
}

function _resetItem(item) {
    let newItem = Object.assign({}, item);
    return Object.assign(newItem, {
        dropDelay: 0,
        dropdownRows: 0
    });
}

function generateGrid(itemRowNum, itemColNum, square) {
    let cells = [];
    for (let row = 0; row < itemRowNum; row++) {
        for (let col = 0; col < itemColNum; col++) {
            let borderWidth = '1px 0 0 1px', borderRightWidth='0px', borderBottomWidth='0px';
            if (col === itemColNum - 1) {
                borderRightWidth = '1px';
            }
            if (row === itemRowNum - 1) {
                borderBottomWidth = '1px';
            }
            cells.push({
                row,
                col,
                coverLevel: Utils.randomArray([0, 1, 2])
            });
        }
    }
    return cells;
}

function generateInitialItems(itemRowNum, itemColNum, square) {
    let items = [];
    for (let row = 0; row < itemRowNum; row++) {
        for (let col = 0; col < itemColNum; col++) {
            let colors = originColors;
            let leftItem = Utils.findWhere(items, {row, col: col - 1});
            let topItem = Utils.findWhere(items, {row: row - 1, col});
            if (leftItem) {
                colors = originColors.filter(function(item) {
                    return item !== leftItem.backgroundColor;
                });
            }
            if (topItem) {
                colors = colors.filter(function(item) {
                    return item !== topItem.backgroundColor;
                });
            }
            let backgroundColor = Utils.randomArray(colors);
            let newItem = _getRandomElement({
                backgroundColor: backgroundColor,
                col: col,
                row: row,
                square: square
            });
            //console.log(newItem);
            items.push(newItem);
        }
    }
    return items;
}

//交换元素
function swapItems(originItem, destItem, items) {
    let newItems = items.map(function(item) {
        let newItem = Object.assign({}, item);
        if (item.col === originItem.col && item.row === originItem.row) {
            newItem.row = destItem.row;
            newItem.col = destItem.col;
        } else if (item.col === destItem.col && item.row === destItem.row) {
            newItem.row = originItem.row;
            newItem.col = originItem.col;
        }
        return newItem;
    });
    return newItems;
}

//核心三消算法
function eliminateSameItems(items, key) {
    let eliminateItems = [], newItems = [];
    key = key || 'backgroundColor';
    items.forEach(function(item) {
        if (Utils.findWhere(eliminateItems, {row: item.row, col: item.col})) {
            //已通过之前的递归算法将该元素收入待消除队列，则无需再次递归计算
            return;
        }
        let arrRight = _detectSameItem(item, items, 'right', key);
        let arrLeft = _detectSameItem(item, items, 'left', key);
        let hArr = arrLeft.concat([item]).concat(arrRight);

        let arrTop = _detectSameItem(item, items, 'top', key);
        let arrBottom = _detectSameItem(item, items, 'bottom', key);
        let vArr = arrTop.concat([item]).concat(arrBottom);

        if (hArr.length >= 3) {
            eliminateItems = eliminateItems.concat(hArr);
            //console.log('item:', item, ',', 'horizontal must be eliminate ' + hArr.length);
        }

        if (vArr.length >= 3) {
            eliminateItems = eliminateItems.concat(vArr);
            //console.log('item:', item, ',', 'vertical must be eliminate ' + vArr.length);
        }
    });
    //console.log(eliminateItems);
    if (eliminateItems.length) {
        items.forEach(function(item) {
            let targetItem = Utils.findWhere(eliminateItems, {row: item.row, col: item.col});
            if (!targetItem) { //不是待消除元素则保留该元素
                let newItem = _resetItem(item);
                newItems.push(newItem);
            } else { //是待消除元素则在该列顶部补位
                newItems.push(_getRandomElement({
                    row: _getSupplementRowIndex(newItems, item.col),
                    col: item.col,
                    square: item.square
                }));
            }
        });
    } else {
        return false;
    }
    return {newItems, eliminateItems};
}

function getDropCols(items, maxRow, maxCol) {
    let dropCols = []; //需下降元素填满空位的列s
    for(let col = 0; col < maxCol; col++) {
        let emptyArr = []; //空位段数组
        let rowPointer = 0;

        while(rowPointer < maxRow) {
            let firstEmptyPosition = _detectEmptyAfterElement(rowPointer, col, items, maxRow);

            if (firstEmptyPosition) { //该列从指定位置开始有空位
                //dropStartRow = firstEmptyPosition.row;
                if (firstEmptyPosition.row < maxRow - 1) { //第一个空位不在底部，继续查找空位后第一个元素
                    let firstItemAfterEmpty = _detectElementAfterEmpty(firstEmptyPosition.row + 1, firstEmptyPosition.col, items, maxRow);
                    if (!firstItemAfterEmpty) { //空位后无元素
                        //dropRow = maxRow - firstEmptyPosition.row + 1;
                        emptyArr.push({
                            start: firstEmptyPosition.row,
                            end: maxRow - 1
                        });
                        break;
                    } else { //空位后有元素
                        emptyArr.push({start: firstEmptyPosition.row, end: firstItemAfterEmpty.row - 1});
                        rowPointer = firstItemAfterEmpty.row + 1;
                    }
                } else { //第一个空位在底部
                    emptyArr.push({start: firstEmptyPosition.row, end: firstEmptyPosition.row});
                    break;
                }
            } else { //该列从指定位置开始无空位
                break;
            }
        }
        if (emptyArr.length) {
            dropCols.push({col, emptyArr});
        }
    }
    //console.log(dropCols);
    return dropCols;
}

function dropItems(dropCols, items) {
    let newItems = items.map(function(item) {
        let matchCol = Utils.findWhere(dropCols, {col: item.col});
        let newItem = Object.assign({}, item);
        newItem.dropDelay = 0;
        if (matchCol) { //元素在有空位的列
            let emptyArr = matchCol.emptyArr,
                emptyGroupLength = emptyArr.length;
                
            if (emptyGroupLength > 1) {
                let index = Utils.sortedIndexBy(emptyArr, {'start': item.row}, 'start');

                if (index < emptyGroupLength) { //该元素在空位前
                    let emptySum = 0;
                    for(let i = index; i < emptyGroupLength; i++) {
                        emptySum += matchCol.emptyArr[i].end - matchCol.emptyArr[i].start + 1;
                    }
                    //处理降落
                    newItem.dropDelay = emptyArr[index].start - newItem.row - 1;
                    newItem.dropdownRows = emptySum;
                    newItem.row += emptySum;
                }
            } else if (emptyGroupLength === 1) {
                if (item.row < emptyArr[0].start) {
                    newItem.dropDelay = emptyArr[0].start - newItem.row - 1;
                    newItem.row += emptyArr[0].end - emptyArr[0].start + 1;
                    newItem.dropdownRows = 1;
                }
            }
        }
        return newItem;
    });
    return newItems;
}

function getMaxByKey(items, key) {
    let arr = items.map(function(item) {
        return key ? item[key] : item;
    });

    return Utils.max(arr);
}

function activateGridCell(grid, deleteItems) {
    let newGrid = grid.map((cell)=>{
        let newCell = cell;
        if (cell.coverLevel) {
            let targetItem = Utils.findWhere(deleteItems, {row: cell.row, col: cell.col});
            if (targetItem) {
                newCell = Object.assign({}, cell, {coverLevel: cell.coverLevel - 1});
            }
        }
        return newCell;
    });
    return newGrid;
}

export default {generateGrid, generateInitialItems, swapItems, eliminateSameItems, getDropCols, dropItems, getMaxByKey, activateGridCell};
