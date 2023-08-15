import { Brand } from './brand';

type Account = {
  accountNo: string;
  type: string;
};

type SavingAccount = Account & {
  interest: number;
  type: 'saving';
};

type ChequingAccount = Account & {
  annualFees: number;
  type: 'chequing';
};

function assertAccountIsChequing(
  account: Account | ChequingAccount
): asserts account is ChequingAccount {
  if (account.type !== 'chequing') {
    throw new Error('not a chequing account');
  }
}

const account: Account | ChequingAccount = {
  accountNo: '979f7as',
  type: 'chequing',
  annualFees: 1
};
assertAccountIsChequing(account);
account;

// Combine with Brand
type User = Brand<{ name: string }, 'User'>;
const signUp = (user: User) => {};
function isValidUser(obj: unknown): obj is User {
  if (typeof obj === 'object' && !!obj && 'name' in obj) {
    return true;
  }

  return false;
}
const testUser = {
  name: 'nam'
};
if (isValidUser(testUser)) {
  signUp(testUser);
}

// override class with predicate
class Form<TValues> {
  error?: string;
  constructor(
    public values: TValues | null,
    private validate: (values: TValues) => string | void
  ) {}

  hasValues(): asserts this is this & { values: TValues } {
    if (!this.values) {
      throw new Error('Form does not have value');
    }
  }

  isInvalid(): this is this & { error: string } {
    this.hasValues();

    const result = this.validate(this.values);

    if (result) {
      this.error = result;
      return true;
    }

    this.error = undefined;
    return false;
  }
}

const testForm = new Form<{ name: string }>({ name: 'Nan' }, (obj) => {
  if (obj.name !== 'Nam') {
    return 'wrong spelling';
  }
});

if (testForm.isInvalid()) {
  // error will now no longer string | undefined
  testForm.error;
}
