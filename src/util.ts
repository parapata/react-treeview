import { CONST } from "./constant";
import { Node } from "./type";

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getSubItems = (): Node[] => {
  switch (getRandomInt(0, 2)) {
    case 1:
      return [
        { title: "DIR_01", type: CONST.ITEM_TYPE_FOLDER },
        { title: "DIR_02", type: CONST.ITEM_TYPE_FOLDER },
      ];

    case 2:
      return [
        { title: "DIR", type: CONST.ITEM_TYPE_FOLDER },
        { title: "music.aac", type: CONST.ITEM_TYPE_FILE },
        { title: "picture.jpg", type: CONST.ITEM_TYPE_FILE },
      ];

    default:
      return [
        { title: "DIR", type: CONST.ITEM_TYPE_FOLDER },
        { title: "text.txt", type: CONST.ITEM_TYPE_FILE },
      ];
  }
};
