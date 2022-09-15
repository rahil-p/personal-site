import { forwardRef, useId } from 'react';

import { css } from '@emotion/react';

import { useDarkMode } from '../../hooks/theme';

import type { ComponentPropsWithoutRef } from 'react';
import type { CSSExtra } from '../../../common/types';

interface Props {
	containerProps?: ComponentPropsWithoutRef<'div'>;
	inputProps?: ComponentPropsWithoutRef<'input'>;
	labelProps?: ComponentPropsWithoutRef<'label'>;
	cssExtra?: CSSExtra;
}

const DarkModeButton = forwardRef<HTMLInputElement, Props>(function DarkModeButton(props, ref) {
	const { inputProps, labelProps, containerProps, cssExtra } = props;

	const { darkMode, setDarkMode } = useDarkMode();

	let inputId = useId();
	if (inputProps?.id) inputId = inputProps.id;

	return (
		<div
			css={[
				css`
					width: 1em;
					height: 1em;
					transition: color var(--ease-time) var(--ease-fn);

					&:hover {
						color: inherit;
					}
				`,
				cssExtra,
			]}
			{...containerProps}
		>
			<input
				ref={ref}
				css={css`
					position: absolute;
					width: 100%;
					height: 100%;
					appearance: none;
					cursor: pointer;

					&:checked + label > svg [opacity='0'] {
						opacity: 1;
					}
				`}
				title={darkMode ? 'Enable light theme' : 'Enable dark theme'}
				type={'checkbox'}
				onClick={() => setDarkMode(!darkMode)}
				{...inputProps}
				id={inputId}
			/>
			<label
				css={css`
					width: 100%;
					height: 100%;
					cursor: pointer;
				`}
				{...labelProps}
				htmlFor={inputId}
			>
				{/*	TODO: Add graphic */}
			</label>
		</div>
	);
});

export default DarkModeButton;
