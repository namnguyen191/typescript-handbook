const frameWorks = {
  react: {
    name: 'react',
    user: 100000
  },
  angular: {
    name: 'angular',
    user: 12432
  },
  next: {
    name: 'next',
    user: 7983122
  }
};

type FrameWorkKey = keyof typeof frameWorks;
