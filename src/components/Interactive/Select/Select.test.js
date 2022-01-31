/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, prettyDOM } from '@testing-library/react';

import Select from './Select';

let options
beforeAll(() => {
  options = ['Autos', 'Camiones', 'Motos', 'Bicicletas'];
})
test('se esta renderizando el componente', () => {
  const component = render(<Select opt={options} />);
});
test('Deberia haber un texto seleccionado y el mismo texto en las opciones', () => {
  const component = render(<Select opt={options} />);
  const selected = component.getAllByText('Autos')
  expect(selected.length).toBe(2)
})
test('Al clickear una opcion debe cambiar el estado activo del componente', () => {
  const component = render(<Select opt={options}/>)
  const opt = component.container.querySelector('#CamionesOpt')
  fireEvent.click(opt)
  const selected = component.getAllByText('Camiones')
  expect(selected.length).toBe(2)
})
test('Al iniciar el componente y al clickear una opcion deberia ejecutarse la funcion manejadora.', () => {
  const fnSelect = jest.fn()
  const component = render(<Select opt={options} onSelect={fnSelect}/>)
  fireEvent.click(component.getByText('Motos'))
  expect(fnSelect).toBeCalledTimes(2)
})
