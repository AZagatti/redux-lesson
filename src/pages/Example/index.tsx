import React from 'react';

import Catalog from '@components/Catalog';
import Cart from '@components/Cart';

import { Container } from './styles';

const Example: React.FC = () => {
  return (
    <Container>
      <Catalog />
      <Cart />
    </Container>
  );
};

export default Example;
