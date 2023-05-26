import React from "react";

/**
 * Wraps a component with a controller hook, passing the props to the controller and merging the resulting controller object with the component props.
 * @param Component - The component to wrap.
 * @param useController - The controller hook function.
 * @returns The wrapped component with the controller.
 */
export function withController<P extends object>(
  Component: React.ComponentType<any>,
  useController: (props: P) => any
): React.ComponentType<P> {
  // eslint-disable-next-line react/display-name
  return ((props: P) => {
    const controller = useController(props);
    return <Component {...props} {...controller} />;
  }) as React.ComponentType<P>;
}
