const SomeData = {
  name: 'Nam Nguyen',
  age: 17,
  body: {
    height: 1.82
  },
  isAdmin: true,
  id: 'ID' as const
};

type SomeDataType = typeof SomeData;

type Name = SomeDataType['name'];
type Age = SomeDataType['age'];
type Height = SomeDataType['body']['height'];
type IsAdmin = SomeDataType['isAdmin'];
type Id = SomeDataType['id'];

const ProgramCodeEnum = {
  EECS: 'eecs',
  MECH: 'mech',
  SOC: 'soc',
  PSY: 'psy'
} as const;

type ScienceProgram = (typeof ProgramCodeEnum)['EECS' | 'MECH'];

type NonScienceProgramKey = Exclude<
  keyof typeof ProgramCodeEnum,
  'EECS' | 'MECH'
>;
type NonScienceProgram = (typeof ProgramCodeEnum)[NonScienceProgramKey];
