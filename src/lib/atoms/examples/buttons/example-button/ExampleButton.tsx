import React from 'react';
import { Button } from '@/src/components/ui/button';

type ExampleButtonProps = {} & React.ComponentPropsWithRef<'button'>;

const ExampleButton = React.forwardRef<HTMLButtonElement, ExampleButtonProps>(
  function ExampleButton({ children, ...rest }, ref) {
    return (
      <Button ref={ref} {...rest}>
        {children}
      </Button>
    );
  },
);

export default ExampleButton;
