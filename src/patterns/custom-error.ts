class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = 'CustomError';
  }
}

const handleCustomError = (error: CustomError) => {
  console.log(error.name);
};
