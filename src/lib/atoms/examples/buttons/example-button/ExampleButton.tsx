import React from 'react';

type ExampleButtonProps = {} & React.ComponentPropsWithRef<'button'>;

const ExampleButton = React.forwardRef<HTMLButtonElement, ExampleButtonProps>(
  function ExampleButton({ children, ...rest }, ref) {
    return (
      <button ref={ref} {...rest}>
        {children}
      </button>
    );
  },
);

export default ExampleButton;
