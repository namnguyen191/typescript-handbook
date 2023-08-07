// Basic
class Component<T> {
  props: T;

  constructor(props: T) {
    this.props = props;
  }
}
const testClassInstance1 = new Component<{ name: string }>({ name: 'Nam' });
testClassInstance1.props;

// Infer through function
const cloneComponent = <TProps>(
  component: Component<TProps>
): Component<TProps> => {
  return new Component(component.props);
};
const testClassInstance2 = cloneComponent(testClassInstance1);
testClassInstance2.props;
