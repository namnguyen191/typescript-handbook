type ConfigObj<TRoute extends string> = {
  routes: TRoute[];
  handlers: {
    [Route in TRoute]?: () => void;
  };
};

// Need a function for generic infer
const makeConfigObj = <TRoute extends string>(configObj: ConfigObj<TRoute>) =>
  configObj;

const configObj = makeConfigObj({
  routes: ['home', '/book/:id', 'about'],
  handlers: {
    home: () => {}
    // dasdsd: () => {}  won't work
  }
});

// reverse mapped type
const makeEventHandlers = <TObj>(obj: {
  [K in keyof TObj]: (args: K) => void;
}) => obj;

const obj = makeEventHandlers({
  click: (name) => {
    console.log(name);
  },
  focus: (name) => {
    console.log(name);
  }
});
