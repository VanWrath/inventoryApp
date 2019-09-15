import Item from '../../src/classes/Item';
import Collection from '../../src/classes/Collection';

var game1 = new Item('Final Fantasy XV', 'SquareEnix');
var game2 = new Item('Fire Emblem: Three Houses', 'Intelligent Systems');
var game3 = new Item('Kingdom Hearts III', 'Square Enix');

var games = new Collection('Games');

var lists = [];

games.addItem(game1);
games.addItem(game2);
games.addItem(game3);

lists.push(games);

export default lists;
