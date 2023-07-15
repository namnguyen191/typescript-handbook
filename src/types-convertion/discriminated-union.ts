type Events =
  | { type: 'click'; target: 'this is clicked' }
  | { type: 'click'; clickedEle: 'this element is clicked' }
  | { type: 'hover'; element: 'this element is hovered' }
  | { type: 'scroll'; window: 'this window is scroll' };

type ClickEvent = Extract<Events, { type: 'click' }>;
type EventType = Events['type'];

type CarBrands = 'toyota' | 'honda' | 'bmw' | 'gmc';
type JapaneseCarBrands = Extract<CarBrands, 'toyota' | 'honda'>;
type NonJapaneseCarBrands = Exclude<CarBrands, 'toyota' | 'honda'>;
