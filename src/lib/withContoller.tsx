export function withController<P extends object>(
  Component: React.ComponentType<any>,
  useController: (props: P) => any
) {
  // eslint-disable-next-line react/display-name
  return ((props: P) => {
    const controller = useController(props);
    return <Component {...props} {...controller} />;
  }) as React.ComponentType<P>;
}
