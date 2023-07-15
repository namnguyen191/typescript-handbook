const getData = () => {
  return Promise.resolve({
    name: 'Nam'
  });
};

type GetDataResolvedReturnType = Awaited<ReturnType<typeof getData>>;
