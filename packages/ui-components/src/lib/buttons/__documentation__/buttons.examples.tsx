import React, { FC, useReducer } from 'react';
import classNames from 'classnames';
import {
  Button,
  ButtonAccent,
  ButtonDanger,
  ButtonOutline,
  ButtonOutlineAccent,
  ButtonOutlineDanger,
  ButtonOutlinePrimary,
  ButtonOutlineSuccess,
  ButtonOutlineWarning,
  ButtonPrimary,
  ButtonSuccess,
  ButtonWarning,
  ButtonGroup,
  ColorIcon,
  Icon,
  ButtonUnstyled,
  ButtonLink
} from '../..';

export const ButtonExamples1: FC = () => (
  <div className="button-story">
    <Button>Default Button</Button>
    <ButtonPrimary>Primary Button</ButtonPrimary>
    <ButtonAccent>Accent Button</ButtonAccent>
    <ButtonSuccess>Success Button</ButtonSuccess>
    <ButtonWarning>Warning Button</ButtonWarning>
    <ButtonDanger>Danger Button</ButtonDanger>
    <br />
    <ButtonOutline>Outline Button</ButtonOutline>
    <ButtonOutlinePrimary>Primary Outline Button</ButtonOutlinePrimary>
    <ButtonOutlineAccent>Accent Outline Button</ButtonOutlineAccent>
    <ButtonOutlineSuccess>Success Outline Button</ButtonOutlineSuccess>
    <ButtonOutlineWarning>Warning Outline Button</ButtonOutlineWarning>
    <ButtonOutlineDanger>Danger Outline Button</ButtonOutlineDanger>
  </div>
);

export const ButtonExamples2: FC = () => (
  <div className="button-story">
    <Button disabled>Default Button</Button>
    <ButtonPrimary disabled>Primary Button</ButtonPrimary>
    <ButtonAccent disabled>Accent Button</ButtonAccent>
    <ButtonSuccess disabled>Success Button</ButtonSuccess>
    <ButtonWarning disabled>Warning Button</ButtonWarning>
    <ButtonDanger disabled>Danger Button</ButtonDanger>
    <br />
    <ButtonOutline disabled>Outline Button</ButtonOutline>
    <ButtonOutlinePrimary disabled>Primary Outline Button</ButtonOutlinePrimary>
    <ButtonOutlineAccent disabled>Accent Outline Button</ButtonOutlineAccent>
    <ButtonOutlineSuccess disabled>Success Outline Button</ButtonOutlineSuccess>
    <ButtonOutlineWarning disabled>Warning Outline Button</ButtonOutlineWarning>
    <ButtonOutlineDanger disabled>Danger Outline Button</ButtonOutlineDanger>
  </div>
);

export const ButtonExamples3: FC = () => (
  <div className="button-story">
    <Button icon={<ColorIcon name="googleCalendar" />}>Default Button</Button>
    <ButtonOutline icon={<Icon name="settings" />} iconPlacement="end">
      Outline Button
    </ButtonOutline>
  </div>
);

export const ButtonExamples4: FC = () => (
  <div className="button-story">
    <ButtonLink
      icon={<Icon name="settings" />}
      iconPlacement="end"
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      as={buttonProps => <a {...buttonProps} href="#test" />}
    >
      Anchor Tag Button
    </ButtonLink>
    <ButtonUnstyled>Unstyled Button</ButtonUnstyled>
  </div>
);

export const ButtonExamples5: FC = () => {
  const [state, toggle] = useReducer<(state: { [x: string]: boolean }, action: string) => { [x: string]: boolean }>(
    (state, action) => {
      const newState = { ...state };
      newState[action] = !state[action];
      return newState;
    },
    {}
  );

  return (
    <div className="button-group-story">
      <ButtonGroup>
        <ButtonPrimary>Left</ButtonPrimary>
        <ButtonPrimary>Middle</ButtonPrimary>
        <ButtonPrimary>Right</ButtonPrimary>
      </ButtonGroup>
      <br />
      <p>{JSON.stringify(state)}</p>
      <ButtonGroup>
        <ButtonPrimary className={classNames({ 'lc-bg-primary-dark': state.left })} onClick={() => toggle('left')}>
          Left
        </ButtonPrimary>
        <ButtonPrimary className={classNames({ 'lc-bg-primary-dark': state.middle })} onClick={() => toggle('middle')}>
          Middle
        </ButtonPrimary>
        <ButtonPrimary className={classNames({ 'lc-bg-primary-dark': state.right })} onClick={() => toggle('right')}>
          Right
        </ButtonPrimary>
      </ButtonGroup>
    </div>
  );
};
