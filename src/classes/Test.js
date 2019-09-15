import Item from './Item';
import Collection from './Collection';

/*Testing item */
console.log('Testing Item...');
var item1 = new Item('Final Fantasy XV', 'Square enix');
console.log(item1);
item.setName('Nier: Automata');
item.setBrand('Square Enix');
console.log(item1);
item.setDetails('Steam Edition');
item.setMainCategory('RPG');
item.setSubCategory('Action');
item.setSize('50 GB');
item.setVendor('Steam');
item.setAcquisitionDate(new Date('July 25, 2018'));
item.setStartDate(new Date('July 26, 2018'));
item.setCompletionDate();
item.setMaxUse(100);
item.setRepurchaseItem(false);
item.setNote('Great Game!');
console.log(item1);

/*Testing Collection*/
console.log('Testing Colleciton');
var list = new Collection('Games');
console.log('Games Collection: ' + list);
list.addItem(item1);
console.log('Added Item: ' + list);
