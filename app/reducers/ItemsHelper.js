import Utils from '../utils/Utils';
import Immutable from 'immutable';
import {keywords} from '../config/keywords';
import {colors, colorThreshold} from '../config/colors';
//import sortedIndexBy from 'lodash/sortedIndexBy';

//选择某些单词，每个单词赋予随机颜色，序列化成带颜色信息的字母
let letters = _serializeToLetters(_colorWords(_pickUpRandomWords(keywords, 15)));

function _pickUpRandomWords(words, num) {
    let iwords = Immutable.List(words);
    //let restWords = iwords;
    let wordsPicked = [];
    for(let i = 0; i < num; i++) {
        let randomWord = Utils.randomArray(iwords.toArray());
        wordsPicked.push(randomWord);
        iwords = iwords.delete(iwords.indexOf(randomWord));
    }
    return wordsPicked;
}

function _colorWords(words) {
    let icolors = Immutable.List(colors);
    return words.map((word)=>{
        let backgroundColor = Utils.randomArray(icolors.toArray());
        icolors = icolors.delete(icolors.indexOf(backgroundColor));
        return Object.assign({}, {
            text: word,
            backgroundColor: '#' + backgroundColor,
            fontColor: (parseInt(backgroundColor, 16) > colorThreshold ? '#000' : '#fff')
        });
    });
}

function _serializeToLetters(words) {
    let _letters = [];
    words.forEach((word)=>{
        word.text.split('').forEach(letter=>{
            _letters.push(Object.assign({}, word, {
                text: letter
            }));
        });
    });
    console.log(_letters);
    return _letters;
}

function _getRandomElement(itemInfo) {
    let item = Object.assign({
        id: Utils.uniqueId('ele-')
        //text: Utils.randomArray(alphabets),
    }, itemInfo);
    if (!item.backgroundColor) {
        item.backgroundColor = '#' + Utils.randomArray(colors);
    }
    if (!item.fontColor) {
        item.fontColor = parseInt(item.backgroundColor, 16) > colorThreshold ? '#000' : '#fff';
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
    if (targetItem[key] === item[key]) { //TODO match word
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
    return Object.assign({}, item, {
        dropDelay: 0,
        dropdownRows: 0,
        add: false
    });
}

function generateGrid(itemRowNum, itemColNum) {
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

function generateInitialItems(itemRowNum, itemColNum) {
    let items = [];
    for (let row = 0; row < itemRowNum; row++) {
        for (let col = 0; col < itemColNum; col++) {
            let _colors = colors;
            let leftItem = Utils.findWhere(items, {row, col: col - 1});
            let topItem = Utils.findWhere(items, {row: row - 1, col});
            if (leftItem) {
                _colors = _colors.filter(function(item) {
                    return item !== leftItem.backgroundColor;
                });
            }
            if (topItem) {
                _colors = _colors.filter(function(item) {
                    return item !== topItem.backgroundColor;
                });
            }
            let backgroundColor = Utils.randomArray(_colors);
            //let randomLetter = Utils.randomArray(iletters.toArray());
            let newItem = _getRandomElement(Object.assign({
                backgroundColor: '#' + backgroundColor,
                col: col,
                row: row
            }));
            //iletters = iletters.delete(iletters.indexOf(randomLetter));
            items.push(newItem);
        }
    }
    return items;
}

//交换元素
function swapItems(swapArr, items) {
    let [originItem, destItem] = swapArr;
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

function _detectSameItemsByItem(items, targetItem, key) {
    let arr = [];

    let arrRight = _detectSameItem(targetItem, items, 'right', key);
    let arrLeft = _detectSameItem(targetItem, items, 'left', key);
    let hArr = arrLeft.concat([targetItem]).concat(arrRight);

    let arrTop = _detectSameItem(targetItem, items, 'top', key);
    let arrBottom = _detectSameItem(targetItem, items, 'bottom', key);
    let vArr = arrTop.concat([targetItem]).concat(arrBottom);

    if (hArr.length >= 3) {
        arr = arr.concat(hArr);
        //console.log('item:', item, ',', 'horizontal must be eliminate ' + hArr.length);
    }

    if (vArr.length >= 3) {
        arr = arr.concat(vArr);
        //console.log('item:', item, ',', 'vertical must be eliminate ' + vArr.length);
    }

    return arr;
}

//核心三消算法
function eliminateSameItems(items, targetItems, key) {
    let eliminateItems = [], newItems = [];
    key = key || 'backgroundColor';
    (targetItems || items).forEach(function(item) {
        if (Utils.findWhere(eliminateItems, {row: item.row, col: item.col})) {
            //已通过之前的递归算法将该元素收入待消除队列，则无需再次递归计算
            return;
        }
        let arr = _detectSameItemsByItem(items, (item[key] ? item : Utils.findWhere(items, item)), key);
        eliminateItems = eliminateItems.concat(arr);
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
                    add: true
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

function isInZone(maxRow, maxCol, item) {
    if (item.row < 0 || item.col < 0 || item.row > maxRow - 1 || item.col > maxCol - 1) {
        return false;
    }
    return true;
}

export default {
    generateGrid,
    generateInitialItems,
    swapItems,
    eliminateSameItems,
    getDropCols,
    dropItems,
    getMaxByKey,
    activateGridCell,
    isInZone
};
