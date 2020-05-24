import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

describe('구수한 그만의 테.스.트 코드', () => {
  it('메뉴 다 있냐', () => {
    const utils = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    utils.getByText('ESC');
    utils.getByText('Album');
    utils.getByText('Artist');
    utils.getByText('Track');
    utils.getByText('Log In');
  });
});
